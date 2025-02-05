import { useApi } from "../hooks/UseApi";
import { UpdatePasswordRequest } from "../interfaces/Auth";

const api = useApi();

export default function getUserAddressCoordinates(): string {
    return("-0.3833856,44.9150976")
}

  export async function GetPasswordUser(passwordData: UpdatePasswordRequest) {
      try {
        const response = await api.patch('auth/update-password', passwordData);
        return response.data;
      } catch (error) {
        throw error;
      }
  };
