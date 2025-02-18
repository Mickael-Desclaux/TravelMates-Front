
import {useApi} from "../hooks/UseApi";
import { Auth, Register, User } from "../interfaces/Auth";
import useAuthStore from "../utils/AuthStore";

const api = useApi();

export async function HandleSignIn(body: Auth): Promise<void> {
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

export async function HandleRegister(body: Register): Promise<User> {
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

        const response = await api.post('auth/register', formData);
        return response.data;

    } catch (error: any) {
        throw error;
    }
};

export async function HandleForgotPassword(body: {email: string}) {
    try {
        const response = await api.post('auth/reset-password', body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function HandleResetPassword(body: {password: string}, id: number, token: string) {
    try {
        const response = await api.patch(`auth/reset-password/${id}?token=${token}`, body);
        return response.data;
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

