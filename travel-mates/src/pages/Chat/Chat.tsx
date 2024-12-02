import { useState } from "react"
import { DetailedTripChat } from "../../interfaces/Chat"
import { Avatar, Typography } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

export default function Chat() {

    const data: DetailedTripChat[] = [
        {
            user: {
                profile: {
                    id: 1,
                    firstname: "Jean",
                    lastname: "Patrick",
                    profilePicture: {
                        url: "https://docs.material-tailwind.com/img/face-1.jpg"
                    }
                }
            },
            text: "Salut ça va?",
            sentAt: new Date("2024-12-01T14:30:00Z")
        },
        {
            user: {
                profile: {
                    id: 2,
                    firstname: "Phillipe",
                    lastname: "Patrick",
                    profilePicture: {
                        url: "https://docs.material-tailwind.com/img/face-2.jpg"
                    }
                }
            },
            text: "Bien et toi??",
            sentAt: new Date("2024-12-01T14:32:00Z")
        },
        {
            user: {
                profile: {
                    id: 1,
                    firstname: "Jean",
                    lastname: "Patrick",
                    profilePicture: {
                        url: "https://docs.material-tailwind.com/img/face-1.jpg"
                    }
                }
            },
            text: "Ouais...",
            sentAt: new Date("2024-12-01T14:33:00Z")
        },
        {
            user: {
                profile: {
                    id: 3,
                    firstname: "Blouge",
                    lastname: "Violet",
                    profilePicture: {
                        url: "https://docs.material-tailwind.com/img/face-3.jpg"
                    }
                }
            },
            text: "ok cool",
            sentAt: new Date("2024-12-01T14:35:00Z")
        },
    ]

    const [messages, setMessages] = useState<DetailedTripChat[]>(data);
    const location = useLocation();
    const { title } = location.state;

    return (
        <>
            <div className="md:mt-32 m-4">
                <Typography variant="h2" className="font-title font-bold text-2xl text-center">{title}</Typography>
                {
                    messages.map((message) => (
                        <div>
                            <Avatar
                                src={message.user.profile.profilePicture.url}
                                alt={message.user.profile.firstname + message.user.profile.lastname}
                                className="ms-4 mr-4"
                            />
                            <p>{message.text}</p>
                            <p>{message.sentAt.toLocaleDateString()}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}