import axios, { AxiosInstance } from "axios";
import useAuthStore from "../utils/AuthStore";
import Cookies from 'js-cookie';

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

                const refreshToken = Cookies.get('refresh_token');
                if (!refreshToken) {
                    console.log('Refresh token non disponible.');
                    useAuthStore.getState().clearAccessToken();
                    window.location.href = '/sign-in';
                    return Promise.reject(error);
                }

                try {
                    const response = await api.get("auth/refreshToken", { withCredentials: true });

                    const newAccessToken = response.data.accessToken;
                    useAuthStore.getState().setAccessToken(newAccessToken);

                    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                    return api(originalRequest);
                } catch (refreshError) {
                    console.error('Échec du rafraîchissement du token:', refreshError);
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
