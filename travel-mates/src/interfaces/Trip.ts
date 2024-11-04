import { Activity } from "./TripProps/TripProps";

export default interface Trip {
    id: number;
    owner: {
        firstname: string;
        lastname: string;
        profilePicture: string;
    };
    users: {
        firstname: string;
        lastname: string;
        profilePicture: string;
    }[];
    title: string;
    destination: string;
    dateFrom: Date;
    dateTo: Date;
    description: string;
    conditionBudgetMin: number;
    conditionBudgetMax: number;
    conditionGender: string;
    conditionAgeMin: string;
    conditionAgeMax: string;
    conditionPhysical: string;
    conditionUserLimit: number;
    medias: string[];
    activities: Activity[];
}