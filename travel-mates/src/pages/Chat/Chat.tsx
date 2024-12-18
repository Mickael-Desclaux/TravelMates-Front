import { useEffect, useRef, useState } from "react"
import { MessageWithUserInfos } from "../../interfaces/Chat"
import { Avatar, Typography } from "@material-tailwind/react";
import { formatApiDate } from "../../utils/DateService";
import ChatSendMessage from "../../components/ChatSendMessage/ChatSendMessage";
import useAuthStore from "../../utils/AuthStore";
import io from 'socket.io-client';
import { useParams } from "react-router-dom";
import { getTripMessages } from "../../api/Chat";

export default function Chat() {

    const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
    const [messages, setMessages] = useState<MessageWithUserInfos[]>([]);
    const {access_token} = useAuthStore();
    const {id} = useParams();

    useEffect(() => {

        if (!id) {
            console.error('Trip ID is undefined');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await getTripMessages(+id);
                const messagesWithUserInfos = response.data.messages.map((message) => ({
                    ...message,
                    user: {
                        ...message.user,
                        profile: {
                            ...message.user.profile,
                            media: { url: message.user.profile.media.url },
                        },
                    },
                }));
                setMessages(messagesWithUserInfos);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();

        const newSocket = io('ws://localhost:3000/chat', {
            transports: ['websocket'],
            query: {
                tripId: id,
                accessToken: access_token
            }
        });
        console.log("🚀 ~ useEffect ~ newSocket:", newSocket);
        
        setSocket(newSocket);

        newSocket.on('chat', (newMessage: MessageWithUserInfos) => {
            console.log('Socket connecté avec succès');
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });

        newSocket.on('connect_error', (error: unknown) => {
            console.error('Erreur de connexion Socket.IO:', error);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [id, access_token]);


    const bottomRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    async function sendMessage(text: string) {
        if (socket) {
            try {
                socket.emit('chat', text);
                scrollToBottom();
            } catch (error) {
                console.error('Erreur lors de l\'envoi du message:', error);
            }
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="md:mt-32 flex flex-col max-h-[90vh] md:min-h-[90vh] md:max-w-[40vw] mx-auto">
            <div className="flex-1 overflow-y-auto px-4">
                {messages
                    .slice()
                    .sort((a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime())
                    .map((message, index) => (
                        <div key={index} className="flex flex-row items-start me-1 mt-4">
                            <Avatar
                                src={import.meta.env.VITE_API_BASE_URL + message.user.profile.media.url}
                                alt={`${message.user.profile.firstname} ${message.user.profile.lastname}`}
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
                                    {formatApiDate(message.sent_at)}
                                </Typography>
                            </div>
                        </div>
                    ))}
                <div ref={bottomRef}></div>
            </div>
            <div className="m-6 bg-white md:mx-auto md:min-w-[35vw]">
                <ChatSendMessage sendMessage={sendMessage} />
            </div>
        </div>
    );
}