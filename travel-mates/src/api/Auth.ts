import {useApi} from "../hooks/UseApi";
import { Auth } from "../interfaces/Auth";
import useAuthStore from "../utils/AuthStore";

const api = useApi();

export default async function HandleSignIn(body: Auth): Promise<void> {
    try {
        const {data} = await api.post('auth/login', body);
        
        const accessToken = data.access_token;
        useAuthStore.getState().setUserId(data.user.id)
        useAuthStore.getState().setAccessToken(accessToken);

        return data;
    } catch (error) {
        throw error;
    }
}

export async function logoutApi(): Promise<void> {
    try {
      const response = await api.post('auth/logout');

      return response.data;
    } catch (error) {
      throw error;
    }
  }
