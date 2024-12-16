import { useApi } from "../hooks/UseApi";
import { Conversation } from "../interfaces/Chat";

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