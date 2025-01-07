
import {useApi} from "../hooks/UseApi";
import { Auth, Register, User } from "../interfaces/Auth";
import useAuthStore from "../utils/AuthStore";

const api = useApi();

export async function HandleSignIn(body: Auth): Promise<void> {
    try {
        const {data} = await api.post('auth/login', body);
        
        const accessToken = data.access_token;
        await useAuthStore.getState().setAccessToken(accessToken);

        return data;
    } catch (error) {
        throw error;
    }
}
export default async function HandleRegister(body: Register): Promise<User> {
    try {
        const formData = new FormData();
        formData.append("email", body.email);
        formData.append("password", body.password);
        formData.append("firstname", body.firstname);
        formData.append("lastname", body.lastname);
        formData.append("birth_date", body.birth_date);
        formData.append("gender", body.gender);
        formData.append("address", body.address);
        formData.append("file", body.profile_picture);
        if (body.activities && body.activities.length > 0) {
            body.activities.forEach((activity: string) => {
                formData.append("activities", activity);
            });
        }
        if (body.languages && body.languages.length > 0) {
            body.languages.forEach((language: string) => {
                formData.append("languages", language);
            });
        }

        console.log("FormData content:");
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        const response = await api.post('auth/register', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;

    } catch (error: any) {
        console.error("Detailed error:");
        console.error("Status:", error.response?.status);
        console.error("Error data:", error.response?.data);
        console.error("Error message:", error.message);
        throw error;
    }
};

