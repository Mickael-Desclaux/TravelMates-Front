import { useApi } from '../hooks/UseApi';
import { Trip } from '../interfaces/TripProps/TripProps';

const api = useApi();

export async function GetTrips(): Promise<Trip[]> {
	try {
		const response = await api.get('trip');
		return response.data;
	} catch (error) {
		throw error;
	}
};

export async function GetUserTrips(): Promise<Trip[]> {
	try {
		const response = await api.get('trip/my-trips');
		return response.data;
	} catch (error) {
		throw error;
	}
};
