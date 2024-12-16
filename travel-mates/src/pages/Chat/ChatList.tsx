import { Avatar, Typography } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
import ChatSearch from "../../components/ChatSearch/ChatSearch"
import { useEffect, useState } from "react";
import { Conversation } from "../../interfaces/Chat";
import { formatDate } from "../../utils/DateService";
import { getConversations } from "../../api/Chat";

export default function ChatList() {

    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [data, setData] = useState<Conversation[]>([]);
    const [filteredChats, setFilteredChats] = useState<Conversation[]>(data);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConversations();
                setData(response);
                setFilteredChats(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
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

    function handleFilter(searchTerm: string) {
        if (searchTerm.trim() === "") {
            setFilteredChats(data);
        } else {
            const filtered = data.filter((chat) =>
                chat.trip?.title?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredChats(filtered);
        }
    }

    const navigate = useNavigate()

    return (
        <>
            <div className="md:mt-32 m-4 md:max-w-[60vw] mx-auto">
                <div className="m-4 md:max-w-[30vw] md:mx-auto mb-8">
                    <ChatSearch onFilter={handleFilter} />
                </div>
                {filteredChats
                    .slice()
                    .sort((a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime())
                    .map((conversation, id) => (
                        <div
                            key={id}
                            className="flex flex-row items-start m-4 cursor-pointer md:mt-4"
                            onClick={() => navigate(`/message/${conversation.reference_id}`)}
                        >
                            <Avatar src={conversation.trip.imageUrl} alt={conversation.trip.title} className="ms-4 mr-4" />
                            <div className="flex flex-col justify-center">
                                <Typography variant="h2" className="text-lg font-title">
                                    {conversation.trip.title}
                                </Typography>
                                <Typography variant="small">
                                    <span className="me-3">
                                        {conversation.text.length > getMaxLength()
                                            ? `${conversation.text.slice(0, getMaxLength())}...`
                                            : conversation.text}
                                    </span>
                                    {` ${formatDate(new Date(conversation.sent_at))}`}
                                </Typography>
                            </div>
                        </div>
                    ))}

            </div>
        </>
    );
}