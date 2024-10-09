import React, { useEffect } from "react";
import { Server as IServer } from "../../@types/server";
import {
  AppBar,
  Toolbar,
  Box,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { MEDIA_URL } from "../../config";
import ServerChannels from "../SecondaryDraw/ServerChannels";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "react-router-dom";

type Props = {
  data: IServer[];
};

const MessageChannels: React.FC<Props> = ({ data }) => {
  const [sideMenu, setSideMenu] = useState<boolean>(false);
  const theme = useTheme();
  const { channelId, serverId } = useParams();
  const channelName =
    data
      ?.find((server) => server.id === Number(serverId))
      ?.channel_server?.find((channel) => channel.id === Number(channelId))?.name || "Home";

  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isSmallScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [sideMenu, isSmallScreen]);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      (event as React.KeyboardEvent).key === "Tab" &&
      (event as React.KeyboardEvent).key === "Shift"
    ) {
      return;
    }
    setSideMenu(open);
  };

  const list = () => (
    <Box
      sx={{ pt: `${theme.primaryAppBar.height}px`, minWidth: 200, role: "presentation" }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ServerChannels data={data} />
    </Box>
  );

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: "default",
          position: "sticky",
          elevation: 0,
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            minHeight: theme.primaryAppBar.height,
            height: theme.primaryAppBar.height,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <ListItemAvatar sx={{ minWidth: "40px" }}>
              <Avatar
                alt="Server Icon"
                src={`${MEDIA_URL}${data?.[0]?.icon}`}
                sx={{ width: 30, height: 30 }}
              />
            </ListItemAvatar>
          </Box>
          <Typography noWrap component="div">
            {channelName}
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Drawer anchor="left" onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MessageChannels;
