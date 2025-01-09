import { useApi } from '../hooks/UseApi';
import TripWithParticipants from '../interfaces/Trip';
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

export async function GetTripById(tripId: number): Promise<TripWithParticipants> {
	try {
		const response = await api.get(`trip/${tripId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
}

export async function GetUserTrips(): Promise<TripWithParticipants[]> {
	try {
		const response = await api.get('trip/my-trips');
		return response.data;
	} catch (error) {
		throw error;
	}
}

export async function getTripCount(id: number): Promise<number> {
	try {
		const response = await api.get(`trip/count/${id}`);
		return response.data.count;
	} catch (error) {
		throw new Error;
	}
}
