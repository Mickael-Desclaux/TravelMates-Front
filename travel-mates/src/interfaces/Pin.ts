export interface Pin {
    title: string;
    description: string;
    longitude: number | null;
    latitude: number | null;
    medias: File[];
    activities: string[]
}