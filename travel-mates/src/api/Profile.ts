import {useApi} from "../hooks/UseApi";
import { ProfileData } from "../interfaces/ProfileInterface";

const api = useApi();

export async function GetProfile(userId: number): Promise<ProfileData> {
  try {
    const response = await api.get(`profile/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
