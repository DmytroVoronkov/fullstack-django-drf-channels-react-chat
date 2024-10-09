import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { Message as MessageI } from "../../@types/message";
import useCrud from "../../hooks/useCrud";
import { Server as ServerI } from "../../@types/server";
import { Box, Typography } from "@mui/material";

// const socketUrl = "ws://127.0.0.1:8000/ws/test";

interface SocketDataI {
  new_message: MessageI;
  type: string;
}

interface ServerChannelProps {
  data: ServerI[]
}

const MessageInterface: React.FC<ServerChannelProps> = ({data}) => {
  const [newMessages, setNewMessages] = useState<MessageI[]>([]);
  const [message, setMessage] = useState("");
  const { serverId, channelId } = useParams();
  const { dataCRUD, fetchData } = useCrud<MessageI>([], `/messages/?channel_id=${channelId}`);

  const server_name = data?.[0].name ?? "Server"
  const server_description = data?.[0].description ?? "This is out Home"

  const socketUrl = channelId ? `ws://127.0.0.1:8000/${serverId}/${channelId}` : null;

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: async () => {
      try {
        const data = await fetchData();
        setNewMessages([]);
        setNewMessages(Array.isArray(data) ? data : []);
        console.log("Connected");
      } catch (e) {
        console.log(e.message);
      }
    },
    onClose: () => {
      console.log("Closed!");
    },
    onError: (e) => {
      console.log(e);
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data) as SocketDataI;
      setNewMessages((prev) => [...prev, data.new_message]);
    },
  });
  return (
    <>
      {channelId === undefined ? (
        <Box
          sx={{
            overflow: "hidden",
            p: { xs: 0 },
            height: "calc(80vh)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, letterSpacing: "-0.5px", px: 5, maxWidth: "600px" }}
            >
              Welcome to {server_name}
            </Typography>
            <Typography>{server_description}</Typography>
          </Box>
        </Box>
      ) : (
        <div>
          {newMessages.map((message, index) => {
            return (
              <div key={index}>
                <p>{message.sender}</p>
                <p>{message.content}</p>
              </div>
            );
          })}
          <form>
            <label>
              Enter message
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            </label>
          </form>
          <button onClick={() => sendJsonMessage({ type: "message", message })}>
            Send message
          </button>
        </div>
      )}
    </>
  );
};

export default MessageInterface;