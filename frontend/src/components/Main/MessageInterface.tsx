import React from "react";
import { useParams } from "react-router-dom";
import { Server as IServer } from "../../@types/server";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import MessageChannels from "./MessageChannels";
import Scroll from "./Scroll";
// import { Message as MessageI } from "../../@types/message";
import useChatService from "../../services/ChatService";
// const socketUrl = "ws://127.0.0.1:8000/ws/test";

interface SendMessageData {
  message: string;
  type: string;
  [key: string]: string;
}

interface ServerChannelProps {
  data: IServer[];
}

const MessageInterface: React.FC<ServerChannelProps> = ({ data }) => {
  const theme = useTheme();

  const { serverId, channelId } = useParams();
  const server_name = data?.[0]?.name ?? "Server";
  const server_description = data?.[0]?.description ?? "This is out Home";

  const { message, newMessages, setMessage, sendJsonMessage } = useChatService(
    channelId || "",
    serverId || ""
  );

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendJsonMessage({
      type: "message",
      message,
    } as SendMessageData);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendJsonMessage({
        type: "message",
        message,
      } as SendMessageData);
    }
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(Date.parse(timestamp));
    return `${date.getHours()}:${date.getMinutes()} ${date.toLocaleDateString()} `;
  };

  return (
    <>
      <MessageChannels data={data} />
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
        <>
          <Box sx={{ overflow: "hidden", p: 0, height: `calc(100vh - 100px)` }}>
            <Scroll>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {newMessages.map((message, index) => {
                  return (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={`${message.sender} avatar`} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <>
                            <Typography
                              component="span"
                              variant="body1"
                              color="text.primary"
                              sx={{
                                display: "inline",
                                fontWeight: 600,
                              }}
                            >
                              {message.sender}
                            </Typography>
                            <Typography
                              component="span"
                              variant="caption"
                              color="textSecondary"
                            >{` at ${formatTimestamp(message.timestamp)}`}</Typography>
                          </>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="body1"
                              sx={{
                                overflow: "visible",
                                whitespace: "normal",
                                textOverflow: "clip",
                                display: "inline",
                                fontWeight: 400,
                                letterSpacing: "-0.2px",
                              }}
                              component="span"
                              color="text.primary"
                            >
                              {message.content}
                            </Typography>
                          </>
                        }
                        primaryTypographyProps={{ fontSize: "12px", variant: "body2" }}
                      ></ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </Scroll>
          </Box>
          <Box sx={{ position: "sticky", bottom: 0, width: "100%" }}>
            <form
              onSubmit={handleSubmit}
              style={{
                bottom: 0,
                right: 0,
                padding: "1rem",
                backgroundColor: theme.palette.background.default,
                zIndex: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={1}
                  maxRows={4}
                  sx={{ flexGrow: 1 }}
                  value={message}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </Box>
            </form>
          </Box>
        </>
      )}
    </>
  );
};

export default MessageInterface;
