import { useEffect, useRef, useState } from "react"
import { DetailedTripChat, DetailedTripChatWithTripInfos } from "../../interfaces/Chat"
import { Avatar, Typography } from "@material-tailwind/react";
import { formatDate } from "../../utils/DateService";
import ChatSendMessage from "../../components/ChatSendMessage/ChatSendMessage";

export default function Chat() {

    const data: DetailedTripChatWithTripInfos = {
        id: 1,
        media: {url: "https://docs.material-tailwind.com/img/face-1.jpg"},
        title: "Voyage à Paris",
        messages: [
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
                sentAt: new Date("2024-12-02T13:30:00Z")
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
                sentAt: new Date("2024-12-02T13:31:00Z")
            },
            {
                user: {
                    profile: {
                        id: 3,
                        firstname: "Jean",
                        lastname: "Patrick",
                        profilePicture: {
                            url: "https://docs.material-tailwind.com/img/face-1.jpg"
                        }
                    }
                },
                text: "Ouais...",
                sentAt: new Date("2024-12-02T13:33:00Z")
            },
            {
                user: {
                    profile: {
                        id: 4,
                        firstname: "Blouge",
                        lastname: "Violet",
                        profilePicture: {
                            url: "https://docs.material-tailwind.com/img/face-3.jpg"
                        }
                    }
                },
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius mauris in tincidunt commodo. In molestie lectus eget sapien dictum sollicitudin. Pellentesque ornare risus vel fringilla posuere. Sed non quam et lectus egestas suscipit. Vestibulum semper nisl eros, id ornare felis ultricies eu. Donec eget arcu gravida, accumsan lorem eu, tincidunt dui. Vestibulum iaculis placerat erat, id cursus nulla aliquam non. Cras aliquam fermentum dui nec elementum. In vel arcu ut lectus blandit maximus. Donec ac libero tincidunt, aliquam nibh ut, facilisis nunc. Nunc et feugiat augue, sit amet blandit sapien. ",
                sentAt: new Date("2024-12-02T13:35:00Z")
            },
        ]
    }

    const bottomRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const [messages, setMessages] = useState<DetailedTripChat[]>(data.messages);

    async function sendMessage(text: string) {
        const newMessage: DetailedTripChat = {
            user: {
                profile: {
                    id: 20,
                    firstname: "",
                    lastname: "",
                    profilePicture: {
                        url: ""
                    }
                }
            },
            text: text,
            sentAt: new Date()
        };

        setMessages([...messages, newMessage]);
        scrollToBottom();
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            <div className="flex flex-col max-h-[90vh] md:max-w-[60vw] mx-auto">
                <div className="flex items-center justify-center md:mt-32 mt-4">
                    <Avatar src={data.media.url} alt={data.title} className="me-4" size="xl"/>
                    <Typography
                        variant="h2"
                        className="font-title font-bold text-2xl text-center mt-8 mb-8"
                    >
                        {data.title}
                    </Typography>
                </div>
                <div className="flex-1 overflow-y-auto px-4">
                    {messages
                        .slice()
                        .sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime())
                        .map((message, id) => (
                            <div key={id} className="flex flex-row items-start me-1 mt-4">
                                <Avatar
                                    src={message.user.profile.profilePicture.url}
                                    alt={
                                        message.user.profile.firstname + " " + message.user.profile.lastname
                                    }
                                    className="mr-4 self-end"
                                    size="sm"
                                />
                                <div className="flex flex-col">
                                    <p>
                                        <span className="bg-gray-200 p-2 rounded-lg block">
                                            {message.text}
                                        </span>
                                    </p>
                                    <Typography
                                        variant="small"
                                        className="text-gray-500 text-xs mt-1"
                                    >
                                        {formatDate(message.sentAt)}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    <div ref={bottomRef}></div>
                </div>
                <div className="m-6 bg-white md:mx-auto md:min-w-[30vw]">
                    <ChatSendMessage sendMessage={sendMessage} />
                </div>
            </div>
        </>

    )
}