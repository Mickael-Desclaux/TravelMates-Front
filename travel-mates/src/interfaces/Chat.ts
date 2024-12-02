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