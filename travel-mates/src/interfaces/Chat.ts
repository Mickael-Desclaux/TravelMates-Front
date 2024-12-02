export interface Chat {
    tripId: number
    media: {
        url: string
    }
    title: string
    lastMessage: string
    lastMessageDate: Date
}