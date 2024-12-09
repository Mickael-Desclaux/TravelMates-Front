export interface AddPin {
    title: string;
    description: string;
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