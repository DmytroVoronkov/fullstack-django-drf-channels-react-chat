import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { Message as MessageI } from "../../@types/message";
import useCrud from "../../hooks/useCrud";
import { Server as ServerI } from "../../@types/server";

// const socketUrl = "ws://127.0.0.1:8000/ws/test";

interface SocketDataI {
  new_message: MessageI;
  type: string;
}

const MessageInterface = () => {
  const [newMessages, setNewMessages] = useState<MessageI[]>([]);
  const [message, setMessage] = useState("");
  const { serverId, channelId } = useParams();

  const { dataCRUD, fetchData } = useCrud<MessageI>([], `/messages/?channel_id=${channelId}`);

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

      // sendJsonMessage()
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
      <button onClick={() => sendJsonMessage({ type: "message", message })}>Send message</button>
    </div>
  );
};

export default MessageInterface;
