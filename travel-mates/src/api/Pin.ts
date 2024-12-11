import {useApi} from "../hooks/UseApi";
import { AddPin, MapPin, Pin } from "../interfaces/Pin";

const api = useApi();

export async function GetPins(): Promise<MapPin[]> {
    try {
        const response = await api.get('pin');
        return response.data;
    } catch (error) {
        throw new Error;
    }
}

export async function GetPinById(id: number): Promise<Pin> {
    try {
        const response = await api.get(`pin/${id}`);
        return response.data;
    } catch (error) {
        throw new Error;
    }
}

export async function CreatePin(body: AddPin): Promise<Pin> {
    try {
        const formData = new FormData();
        formData.append("title", body.title);
        formData.append("description", body.description);
        formData.append("country", body.country);
        formData.append("latitude", body.latitude?.toString() ?? "");
        formData.append("longitude", body.longitude?.toString() ?? "");
        if (body.activities && body.activities.length > 0) {
            body.activities.forEach((activity: string) => {
                formData.append("activities", activity);
            });
        }
        if (body.medias && body.medias.length > 0) {
            body.medias.forEach((file: File) => {
                formData.append("files", file);
            });
        }
        const response = await api.post("pin", formData);

        return response.data;
    } catch (error) {
        throw new Error;
    }
}
