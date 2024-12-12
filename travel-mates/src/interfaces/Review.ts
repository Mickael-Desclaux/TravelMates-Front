export interface Review {
    rating: number;
    comment: string;
    medias: File[]
}

export interface AddReview {
    rating: number;
    comment: string;
    media: File | null;
}

export interface ReviewWithId extends AddReview {
    pin_id: number;
}