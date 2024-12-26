import { useApi } from "../hooks/UseApi";
import { Participant } from "../interfaces/Trip";
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