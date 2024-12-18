import { useApi } from "../hooks/UseApi";
import { Conversation, DetailedTripChatWithTripInfos } from "../interfaces/Chat";

const api = useApi();

export async function getConversations(): Promise<Conversation[]> {
    try {
        const response = await api.get('chat');
        return response.data;
    } catch (error) {
        console.error('Error fetching conversations:', error);
        throw error;
    }
}

export async function getTripMessages(tripId: number): Promise<DetailedTripChatWithTripInfos> {
    try {
        return await api.get(`chat/${tripId}`);
    } catch (error) {
        console.error('Error while getting messages: ', error);
        throw error;
    }
}