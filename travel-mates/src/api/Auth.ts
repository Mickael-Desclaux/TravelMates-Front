import {useApi} from "../hooks/UseApi";
import { Auth } from "../interfaces/Auth";

const api = useApi();

export default async function HandleSignIn(body: Auth) {
    try {
        const {data} = await api.post('auth/login', body);
        console.log("🚀 ~ HandleSignIn ~ body:", body);
        console.log("🚀 ~ HandleSignIn ~ data:", data);
        return data;
    } catch (error) {
        console.log("🚀 ~ HandleSignIn ~ error:", error);
        throw error;
    }
}