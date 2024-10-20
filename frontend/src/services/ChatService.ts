import useWebSocket from "react-use-websocket";
import { useState } from 'react'
import { Message as MessageI } from "../@types/message";
import useAuthService from "../services/AuthService";
import useCrud from "../hooks/useCrud";
import { WS_ROOT } from "../config";

interface SocketDataI {
    new_message: MessageI;
    type: string;
}


const useChatService = (channelId: string, serverId: string  
) => {
    const socketUrl = channelId ? `${WS_ROOT}/${serverId}/${channelId}` : null;

    const { fetchData } = useCrud<MessageI>([], `/messages/?channel_id=${channelId}`);
    const { refreshAccessToken, logout } = useAuthService();

    const [newMessages, setNewMessages] = useState<MessageI[]>([]);
    const [message, setMessage] = useState("");

    const [reconnectionAttempts, setReconnectionAttempts] = useState(0);
    const maxReconnectionAttempts = 4;


    const { sendJsonMessage } = useWebSocket(socketUrl, {
        onOpen: async () => {
            try {
                const data = await fetchData();
                setNewMessages([]);
                setNewMessages(Array.isArray(data) ? data : []);
                console.log("Connected");
            } catch (e) {
                console.log(e);
            }
        },
        onClose: (e: CloseEvent) => {
            if (e.code == 4001) {
                console.log("Auth error!");
                refreshAccessToken().catch((error) => {
                    if (error.response && error.response.status == 4001) {
                        logout();
                    }
                });
            }

            console.log("Closed!");
            setReconnectionAttempts((prev) => prev++);
        },
        onError: (e) => {
            console.log(e);
        },
        onMessage: (msg) => {
            const data = JSON.parse(msg.data) as SocketDataI;
            setNewMessages((prev) => [...prev, data.new_message]);
            setMessage("");
        },
        shouldReconnect: (event: CloseEvent) => {
            if (event.code === 4001 && reconnectionAttempts >= maxReconnectionAttempts) {
                setReconnectionAttempts(0);
                return false;
            }
            return true;
        },
        reconnectInterval: 1000,
    });

    return { sendJsonMessage, message, newMessages, setMessage }
}

export default useChatService
