export default interface TripWithParticipants {
    id: number;
    owner_id: number;
    owner: {
        profile: {
            firstname: string;
            lastname: string;
            media: {
                url: string,
            }
        }
    };
    participants: Participant[],
    title: string;
    destination: string;
    date_from: string;
    date_to: string;
    description: string;
    budget_min: number;
    budget_max: number;
    condition_gender: string;
    condition_age_min: string;
    condition_age_max: string;
    condition_physical: string;
    condition_user_limit: number;
    tripUnsplashImage: {
        url: string,
    }[];
    tripActivities: {activity: string}[];
}

export interface Participant {
    status: string;
    user: {
        id: number;
        profile: {
            firstname: string;
            lastname: string;
            media: {
                url: string;
            };
        };
    }
}