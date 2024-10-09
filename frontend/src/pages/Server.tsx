import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";
import MessageInterface from "../components/Main/MessageInterface";
import ServerChannels from "../components/SecondaryDraw/ServerChannels";
import UserServers from "../components/PrimaryDraw/UserServers";
import { useNavigate, useParams } from "react-router-dom";
import useCrud from "../hooks/useCrud";

import { Server as IServer } from "../@types/server";
import { useCallback, useEffect } from "react";

const Server: React.FC = () => {
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();
  const { dataCRUD, fetchData, error /*, isLoading */ } = useCrud<IServer>(
    [],
    `/server/select/?by_server_id=${serverId}`
  );

  useEffect(() => {
    fetchData();
  }, []);

  const isChannel = useCallback((): boolean => {
    if (!channelId) {
      return true;
    }

    return dataCRUD.some((server) =>
      server.channel_server.some((channel) => channel.id === parseInt(channelId))
    );
  }, [channelId, dataCRUD]);

  useEffect(() => {
    if (!isChannel()) {
      navigate(`/server/${serverId}`);
    }
  }, [isChannel, navigate, serverId]);

  if (error && error.message === "400") {
    navigate("/");
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw>
        <UserServers isOpen={false} data={dataCRUD} />
      </PrimaryDraw>
      <SecondaryDraw>
        <ServerChannels data={dataCRUD} />
      </SecondaryDraw>
      <Main>
        <MessageInterface data={dataCRUD} />
      </Main>
    </Box>
  );
};

export default Server;
