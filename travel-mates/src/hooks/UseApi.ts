import axios, { AxiosInstance } from "axios";

export function useApi() {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": ""
    };

    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers,
        withCredentials: true,
    });
    
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("access_token");
        config.headers["Authorization"] = "Bearer" + token;
        return config;
    });

    return api;
}