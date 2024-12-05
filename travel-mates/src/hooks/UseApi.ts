import axios, { AxiosInstance } from "axios";
import useAuthStore from "../utils/AuthStore";

export function useApi() {
    const headers = {
        "Content-Type": "application/json",
    };

    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers,
        withCredentials: true,
    });
    
    api.interceptors.request.use((config) => {
        const token = useAuthStore.getState().access_token; // Récupère le token du store Zustand
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    });

    api.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
            try {
                // const refreshToken = localStorage.getItem('refresh_token');
                const response = await api.get("auth/refreshToken", {withCredentials: true});
            
            // Store the access_token in Zustand store
            const newAccessToken = response.data.accessToken;
            useAuthStore.getState().setAccessToken(newAccessToken);

            api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

            return api(originalRequest); // Retry the original request with the new access token.
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                useAuthStore.getState().clearAccessToken();
                
                window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
        }
    );

    return api;
}