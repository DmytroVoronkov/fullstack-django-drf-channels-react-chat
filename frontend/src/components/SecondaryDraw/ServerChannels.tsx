import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Server as IServer } from "../../@types/server";

type ServerCategoryProps = {
  data: IServer[];
};

const ServerChannels: React.FC<ServerCategoryProps> = ({ data }) => {
  const theme = useTheme();

  const { serverId } = useParams();

  const server_name = data?.[0]?.name ?? "Server";

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
          top: 1,
          background: theme.palette.background.default,
        }}
      >
        <Typography
          variant="body1"
          sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
        >
          {server_name}
        </Typography>
      </Box>
      <List sx={{ py: 0 }}>
        {data.flatMap((obj) => {
          return obj.channel_server.map((item) => {
            return (
              <ListItem
                disablePadding
                key={item.id}
                sx={{ display: "block", maxHeight: "40px" }}
                dense={true}
              >
                <Link
                  to={`/server/${serverId}/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemButton sx={{ minHeigh: 48 }}>
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
          });
        })}
      </List>
    </>
  );
};

export default ServerChannels;
