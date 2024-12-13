import axios, { AxiosInstance } from "axios";
import useAuthStore from "../utils/AuthStore";

export function useApi() {
    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true,
    });

    // Create a separate axios instance for refresh token to avoid interceptor loop
    const refreshTokenInstance = axios.create({
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
            
            // Check if it's a 401 error and the request hasn't been retried
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                
                try {
                    // Use the separate axios instance for refresh token
                    const response = await refreshTokenInstance.get("auth/refreshToken");
                    
                    const newAccessToken = response.data.token;
                    
                    // Update the token in the auth store
                    useAuthStore.getState().setAccessToken(newAccessToken);
                    
                    // Update the original request with the new token
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    
                    // Retry the original request
                    return api(originalRequest);
                } catch (refreshError: any) {
                    // If refresh token fails, clear the token and redirect to sign-in
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