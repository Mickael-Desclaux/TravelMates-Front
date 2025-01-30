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
    const [title, setTitle] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [messages, setMessages] = useState<MessageWithUserInfos[]>([]);
    const { access_token } = useAuthStore();
    const userId = useAuthStore(state => state.user_id);
    const { id } = useParams();

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
                        isSentByCurrentUser: message.user.id === userId,
                        ...message.user,
                        profile: {
                            ...message.user.profile,
                            media: { url: message.user.profile.media.url },
                        },
                    },
                }));
                setTitle(response.data.title);
                setImage(response.data.media.url);
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

        setSocket(newSocket);

        newSocket.on('chat', (newMessage: MessageWithUserInfos) => {
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
        <div className="flex flex-col mx-auto">
            <div className="flex items-center justify-center md:mt-32 mt-8 md:mb-16 mb-12">
                <Avatar src={image} alt={title} className="me-4" size="lg" />
                <Typography
                    variant="h2"
                    className="font-title font-bold text-2xl text-center"
                >
                    {title}
                </Typography>
            </div>

            <div className="flex flex-col h-[70vh] md:min-h-[70vh] md:max-w-[40vw] mx-auto">
                <div className="flex-1 overflow-y-auto px-4 space-y-2">
                    {messages
                        .slice()
                        .sort((a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime())
                        .map((message, index) => (
                            <div
                                key={index}
                                className={`flex items-start space-x-2 ${message.user.id === userId
                                        ? 'flex-row-reverse self-end'
                                        : 'flex-row self-start'
                                    }`}
                            >
                                {message.user.id !== userId && (
                                    <Avatar
                                        src={import.meta.env.VITE_API_BASE_URL + message.user.profile.media.url}
                                        alt={`${message.user.profile.firstname} ${message.user.profile.lastname}`}
                                        className="self-end"
                                        size="sm"
                                    />
                                )}
                                <div className={`flex flex-col ${message.user.id === userId
                                        ? 'items-end'
                                        : 'items-start'
                                    }`}>
                                    <div className={`
                                    px-3 py-2 rounded-xl
                                    ${message.user.id === userId
                                            ? 'bg-green text-white'
                                            : 'bg-gray-200 text-black'
                                        }
                                `}>
                                        <p>{message.text}</p>
                                    </div>
                                    <Typography
                                        variant="small"
                                        className={`text-xs mt-1 text-gray-500 ${message.user.id === userId
                                                ? 'self-end'
                                                : 'self-start'
                                            }`}
                                    >
                                        {formatApiDate(message.sent_at)}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    <div ref={bottomRef}></div>
                </div>
                <div className="md:mt-4 m-2 bg-light-white min-w-[90vw] md:min-w-[35vw]">
                    <ChatSendMessage sendMessage={sendMessage} />
                </div>
            </div>
        </div>
    );
}