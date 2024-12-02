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