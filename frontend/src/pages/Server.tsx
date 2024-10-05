import React from "react";
import { useState } from "react";
import useWebSocket from "react-use-websocket";

const socketUrl = "ws://127.0.0.1:8000/ws/test";

const Server = () => {
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
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
      setMessage(msg.data);
    },
  });

  const sendHello = React.useCallback(() => {
    const message = { text: inputValue };
    sendJsonMessage(message);
  }, [sendJsonMessage, inputValue]);
  return (
    <div>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={sendHello}>Click me!</button>
      <div>Received: {message}</div>
    </div>
  );
};

export default Server;
