import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  ListItemIcon,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { MEDIA_URL } from "../../config";
import { Server as ServerI } from "../../@types/server";

type ServerCategoryProps = {
  data: ServerI[]
}

const ServerChannels: React.FC<ServerCategoryProps> = ({data}) => {
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark"


  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          px: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          top: 0,
          background: theme.palette.background.default,
        }}
      >
        Channels
      </Box>
      <List sx={{ py: 0 }}>
        {data.map((item) => {
          return (
            <ListItem disablePadding key={item.id} sx={{ display: "block" }} dense={true}>
              <Link
                to={`/explore/${item.name}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton sx={{ minHeigh: 48 }}>
                  <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                    <ListItemAvatar
                      sx={{
                        minWidth: 0,
                      }}
                    >
                      <img
                        src={`${MEDIA_URL}${item.icon}`}
                        alt={`Server icon ${item.name}`}
                        style={{ width: "25px", height: "25px", display: "block", margin: "auto", filter: isDarkMode ? "invert(100%)" : 'none' }}
                      />
                    </ListItemAvatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        textAlign={"start"}
                        paddingLeft={1}
                        textTransform={"capitalize"}
                      >
                        {item.name}
                      </Typography>
                    }
                  ></ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default ServerChannels;
