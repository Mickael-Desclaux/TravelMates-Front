import {create} from "zustand";
import { persist, StorageValue } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set: any) => ({
            access_token: null, // État initial
            setAccessToken: (token: string) => set({ access_token: token }),
            clearAccessToken: () => set({ access_token: null }),
        }),
        {
            name: "auth-store", // Nom pour le stockage dans localStorage
            storage: {
                getItem: (key: string) => JSON.parse(localStorage.getItem(key) ?? 'null'),
                setItem: (key: string, value: StorageValue<string>) => localStorage.setItem(key, JSON.stringify(value)),
                removeItem: (key: string) => localStorage.removeItem(key),
            },
        }
    )
);

export default useAuthStore;
