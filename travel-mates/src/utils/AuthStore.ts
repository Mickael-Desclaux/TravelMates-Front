import {create} from 'zustand';

const useAuthStore = create((set: any) => ({
    access_token: null,
    setAccessToken: (token: string) => set({ access_token: token }),
    clearAccessToken: () => set({ access_token: null }),
}));

export default useAuthStore;
