export interface AddPin {
    title: string;
    description: string;
    country: string;
    longitude: number | null;
    latitude: number | null;
    medias: File[];
    activities: string[];
    selectedSuggestion: boolean;
}

export interface MapPin {
    id: number;
    title: string;
    pinActivities: { activity: string }[];
    latitude: number;
    longitude: number;
    rating: number
}

export interface Pin {
    id: number;
    title: string;
    description: string;
    pinActivities: {activity: string}[];
    user: {
        profile: {
            id: number;
            firstname: string;
            lastname: string;
            media: {
                url: string
            }
        }
    };
    pinMedias: {
        media: {
            id: number;
            url: string;
        }
    }[];
    review: {
        user: {
            profile: {
                firstname: string;
                lastname: string;
                media: {
                    id: number;
                    url: string
                }
            }
        };
        rating: number;
        comment: string;
        media: {
            url: string;
        };
    }[];
}