import axios, { AxiosInstance } from "axios";
import useAuthStore from "../utils/AuthStore";

export function useApi() {
    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true,
    });
    
    api.interceptors.request.use((config) => {
        const token = useAuthStore.getState().access_token;
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        } else {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    });

    api.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const response = await api.get("auth/refreshToken", { withCredentials: true });
                    if (error.response.status === 401) return Promise.reject(error);
                    const newAccessToken = response.data.token;
                    useAuthStore.getState().setAccessToken(newAccessToken);

                    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                    return api(originalRequest);
                } catch (refreshError) {
                    useAuthStore.getState().clearAccessToken();
                    window.location.href = '/sign-in';
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    return api;
}
