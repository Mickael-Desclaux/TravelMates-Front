import { Avatar, Typography } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
import ChatSearch from "../../components/ChatSearch/ChatSearch"
import { useEffect, useState } from "react";
import { Chat as ChatInterface } from "../../interfaces/Chat";
import { formatDate } from "../../utils/DateService";

export default function ChatList() {

    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getMaxLength = () => {
        if (screenSize >= 1024) {
            return 80;
        } else if (screenSize >= 768) {
            return 40;
        } else {
            return 30;
        }
    };

    const data = [
        {
            tripId: 1,
            media: {
                url: "https://docs.material-tailwind.com/img/face-2.jpg"
            },
            title: "Voyage à Dubai",
            lastMessage: "On se donne rdv à 16h pour le golf sur le rooftop avant le meeting avec les japonais",
            lastMessageDate: new Date()
        },
        {
            tripId: 31,
            media: {
                url: "https://docs.material-tailwind.com/img/face-1.jpg"
            },
            title: "Voyage à Paris",
            lastMessage: "Tu sais combien ça coûte une baguette? Je crois c'est dans les genre 1000€",
            lastMessageDate: new Date()
        },
        {
            tripId: 32,
            media: {
                url: "https://docs.material-tailwind.com/img/face-3.jpg"
            },
            title: "Road trip en Islande",
            lastMessage: "Prenez un manteau",
            lastMessageDate: new Date("2024-12-02T16:30:00Z")
        }
    ]

    const [chats] = useState<ChatInterface[]>(data);
    const [filteredChats, setFilteredChats] = useState<ChatInterface[]>(data);

    function handleFilter(searchTerm: string) {
        if (searchTerm.trim() === "") {
            setFilteredChats(chats);
        } else {
            const filtered = chats.filter((chat) =>
                chat.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredChats(filtered);
        }
    }

    const navigate = useNavigate()

    return (
        <>
            <div className="md:mt-32 m-4 md:max-w-[60vw] mx-auto">
                <div className="m-4 md:max-w-[20vw] md:mx-auto mb-8">
                    <ChatSearch onFilter={handleFilter} />
                </div>
                {filteredChats
                    .slice()
                    .sort((a, b) => new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime())
                    .map((conversation, id) => (
                        <div
                            key={id}
                            className="flex flex-row items-start m-4 cursor-pointer md:mt-4"
                            onClick={() => navigate(`/message/${conversation.tripId}`)}
                        >
                            <Avatar src={conversation.media.url} alt={conversation.title} className="ms-4 mr-4" />
                            <div className="flex flex-col justify-center">
                                <Typography variant="h2" className="text-lg font-title">
                                    {conversation.title}
                                </Typography>
                                <Typography variant="small">
                                    <span className="me-3">
                                        {conversation.lastMessage.length > getMaxLength()
                                            ? `${conversation.lastMessage.slice(0, getMaxLength())}...`
                                            : conversation.lastMessage}
                                    </span>
                                    {` ${formatDate(conversation.lastMessageDate)}`}
                                </Typography>
                            </div>
                        </div>
                    ))}

            </div>
        </>
    );
}