export interface Auth {
    email: string;
    password: string;
}

export interface Register {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    birth_date: string;
    gender: string;
    address: string;
    languages: string[];
    activities: string[];
    profile_picture: File;
}

export interface User {
    user: {
        id: number;
        email: string;
        password: string;
        status: string;
        created_at: string;
        updated_at: string;
    }
}

export interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

