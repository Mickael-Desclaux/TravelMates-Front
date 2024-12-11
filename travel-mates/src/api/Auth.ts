import {useApi} from "../hooks/UseApi";
import { Auth } from "../interfaces/Auth";
import useAuthStore from "../utils/AuthStore";

const api = useApi();

export default async function HandleSignIn(body: Auth): Promise<void> {
    try {
        const {data} = await api.post('auth/login', body);
        
        const accessToken = data.access_token;
        useAuthStore.getState().setAccessToken(accessToken);

        return data;
    } catch (error) {
        throw error;
    }
}