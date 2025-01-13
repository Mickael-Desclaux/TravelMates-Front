import {create} from "zustand";
import { persist, StorageValue } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set: any) => ({
            access_token: null,
            user_id: null,
            setAccessToken: (token: string) => set({ access_token: token }),
            setUserId: (id: number) => set({ user_id: id }),
            clearAccessToken: () => set({ access_token: null, user_id: null }),
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
