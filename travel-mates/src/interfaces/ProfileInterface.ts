export interface ProfileData {
  id: number;
  profilePicture: string;
  firstname: string;
  lastname: string;
  birth_date: string;
  gender: string;
  user: {
    email: string;
  }
  profileLanguages: {
    language: string;
  }[];
  address: string;
  profileActivities: {
    activity: string;
  }[];
  bio: string;
  media: {
    url: string;
  };
}

export interface UpdateProfileData {
  address?: string;
  bio?: string;
  activities?: string[];
  languages?: string[];
  email?: string;
  file?: File;
}
