export interface ProfileData {
    id: number
    profilePicture: string
    firstname: string
    lastname: string
    birth_date: string
    gender: string
    profileLanguages: {
      language: string
    }[]
    address: string
    activities: number[]
    bio: string
    media: {
        url: string
    }
}