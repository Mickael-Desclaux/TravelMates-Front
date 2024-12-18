export interface Chat {
    tripId: number
    media: {
        url: string
    }
    title: string
    lastMessage: string
    lastMessageDate: Date
}

export interface DetailedTripChat extends Message {
    user: {
        profile: {
            id: number;
            firstname: string;
            lastname: string;
            media: {
                url: string;
            };
        };
    };
}

export interface DetailedTripChatWithTripInfos {
    data: {
        id: number
        title: string
        media: {
            url: string
        }
        messages: DetailedTripChat[]
    }
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

export interface Message {
    text: string;
    sent_at: Date;
}

export interface MessageWithUserInfos extends Message {
    user: {
        // id: number,
        profile: {
            media: {
                url: string;
        };
        firstname: string;
        lastname: string;
        };
    };
}