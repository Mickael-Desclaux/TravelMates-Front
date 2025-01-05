export interface ProfileData {
    id: number
    profilePicture: string
    firstname: string
    lastname: string
    age: number
    gender: string
    language: string[]
    address: string
    activities: number[]
    bio: string
    media: {
        url: string
    }
}