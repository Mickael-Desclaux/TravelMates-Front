import {useApi} from "../hooks/UseApi";
import { ProfileData, UpdateProfileData } from "../interfaces/ProfileInterface";

const api = useApi();

export async function GetProfile(userId: number): Promise<ProfileData> {
  try {
    const response = await api.get(`profile/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function UpdateProfile(userId: number, data: UpdateProfileData): Promise<ProfileData> {
  try {
    const formData = new FormData();

    if (data.address) formData.append('address', data.address);
    if (data.bio) formData.append('bio', data.bio);
    if (data.email) formData.append('email', data.email);

    if (data.activities && data.activities.length > 0) {
      data.activities.forEach((activity: string) => {
        formData.append("activities", activity);
      });
    }

    if (data.languages && data.languages.length > 0) {
      data.languages.forEach((language: string) => {
        formData.append("languages", language);
      });
    }

    if (data.file && data.file instanceof File) formData.append('file', data.file);

    const response = await api.put(`profile/profile-edit/${userId}`, formData)

    return response.data;
  } catch (error) {
    throw error;
  }
}
