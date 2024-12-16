export interface Chat {
    tripId: number
    media: {
        url: string
    }
    title: string
    lastMessage: string
    lastMessageDate: Date
}

export interface DetailedTripChat {
    user: {
        profile: {
            id: number;
            firstname: string;
            lastname: string;
            profilePicture: {
                url: string;
            };
        };
    };
    text: string;
    sentAt: Date;
}

export interface DetailedTripChatWithTripInfos {
    id: number
    title: string
    media: {
        url: string
    }
    messages: DetailedTripChat[]
}

export interface Conversation {
    id: number;
    user_sender_id: number;
    media_id: number | null;
    reference_id: number;
    reference_type: string;
    text: string;
    sent_at: string;
    updated_at: string;
    user: {
        profile: {
            firstname: string;
            lastname: string;
            media: {
                url: string;
            }
        }
    }
    trip: {
        id?: number;
        title?: string;
        imageUrl?: string;
    }
}