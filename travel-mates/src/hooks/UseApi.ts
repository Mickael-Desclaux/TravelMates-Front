import axios, { AxiosInstance } from "axios";
import useAuthStore from "../utils/AuthStore";

export function useApi() {
    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true, // Permet d'envoyer des cookies si nécessaire
    });
    
    api.interceptors.request.use((config) => {
        const token = useAuthStore.getState().access_token; // Récupère le token du store Zustand
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        // Vérifier si le body est un FormData et ajuster les headers
        if (config.data instanceof FormData) {
            // Si FormData, Axios gère automatiquement le Content-Type
            delete config.headers["Content-Type"];
        } else {
            // Si ce n'est pas un FormData, le Content-Type est JSON
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    });

    api.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true; // Marque la requête comme réessayée pour éviter une boucle infinie.
                try {
                    const response = await api.get("auth/refreshToken", { withCredentials: true });

                    // Stocker le nouveau access_token dans le store Zustand
                    const newAccessToken = response.data.accessToken;
                    useAuthStore.getState().setAccessToken(newAccessToken);

                    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                    return api(originalRequest); // Réessayer la requête originale avec le nouveau token.
                } catch (refreshError) {
                    console.error('Échec du rafraîchissement du token:', refreshError);
                    useAuthStore.getState().clearAccessToken();
                    window.location.href = '/login'; // Rediriger vers la page de connexion si le refresh échoue
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    return api;
}
