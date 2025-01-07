import { useApi } from "../hooks/UseApi";
import TripWithParticipants, { Participant, UpdateTrip } from "../interfaces/Trip";
import type { TripConditions } from "../interfaces/TripConditions";

const api = useApi();

export function addTripConditions(body: TripConditions) {
    try {
        console.log(body);
        return body;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function validateParticipant(tripId: number, participantId: number): Promise<Participant[]> {
    try {
        const response = await api.patch(`trip/${tripId}/${participantId}/validated`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function banParticipant(tripId: number, participantId: number): Promise<Participant[]> {
    try {
        const response = await api.patch(`trip/${tripId}/${participantId}/banned`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteTrip(tripId: number): Promise<void> {
    try {
        await api.delete(`trip/${tripId}`)
    } catch (error) {
        throw error;
    }
}

export async function join(tripId: number): Promise<void> {
    try {
        await api.post(`trip/${tripId}/join`);
    } catch (error) {
        throw error;
    }
}

export async function leave(tripId: number): Promise<void> {
    try {
        await api.delete(`trip/${tripId}/leave`);
    } catch (error) {
        throw error;
    }
}

export async function updateTrip(data: UpdateTrip, tripId: number): Promise<TripWithParticipants> {
    try {
        const response = await api.put(`trip/${tripId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}