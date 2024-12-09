import {useApi} from "../hooks/UseApi";
import { MapPin } from "../interfaces/Pin";

const api = useApi();

export async function GetPins(): Promise<MapPin[]> {
    try {
        const response = await api.get('pin');
        return response.data;
    } catch (error) {
        throw new Error(error as string);
    }
}
