import React from "react";
import { useState } from "react";
import useWebSocket from "react-use-websocket";

const socketUrl = "ws://127.0.0.1:8000/ws/test";

interface SocketDataI {
  new_message: string;
  type: string;
}

const Server = () => {
  const [newMessages, setNewMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      console.log("Connected!");
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

  // const sendHello = React.useCallback(() => {
  //   const message = { text: inputValue };
  //   sendJsonMessage(message);
  // }, [sendJsonMessage, inputValue]);
  return (
    <div>
      {newMessages.map((message, index) => {
        return (
          <div key={index}>
            <p>{message}</p>
          </div>
        );
      })}
      <form>
        <label>
          Enter message
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
      </form>
      <button onClick={() => sendJsonMessage({type: "message", message})}>Send message</button>
    </div>
  );
};

export default Server;
