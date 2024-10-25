export interface AddPin {
    title: string;
    description: string;
    longitude: number | null;
    latitude: number | null;
    medias: File[];
    activities: string[];
    selectedSuggestion: boolean;
}