import {useApi} from "../hooks/UseApi";
import { MapPin, Pin } from "../interfaces/Pin";

const api = useApi();

export async function GetPins(): Promise<MapPin[]> {
    try {
        const response = await api.get('pin');
        return response.data;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function GetPinById(id: number): Promise<Pin> {
    try {
        const response = await api.get(`pin/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error as string);
    }
}
