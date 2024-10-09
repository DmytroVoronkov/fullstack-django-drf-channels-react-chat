import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { MEDIA_URL } from "../../config";
import { Link } from "react-router-dom";
import { Server as ServerI } from "../../@types/server";

type ServerChannelProps = {
  data: ServerI[]
}

type Props = {
  isOpen: boolean;
};

const UserServers: React.FC<Props & ServerChannelProps> = ({ isOpen, data }) => {

  return (
    <>
      <Box
        sx={{
          height: 50,
          p: 2,
          display: "flex",
          alignItems: "center",
          flex: "1 1 100%",
        }}
      >
        <Typography sx={{ display: isOpen ? "block" : "none" }}>Servers</Typography>
      </Box>
      <List>
        {data.map((item) => {
          return (
            <ListItem key={item.id} disablePadding sx={{ display: "block" }} dense={true}>
              <Link to={`/server/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <ListItemButton
                  sx={{
                    minHeight: 0,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                    <ListItemAvatar sx={{ minWidth: "50px" }}>
                      <Avatar alt={`Server ${item.id}`} src={`${MEDIA_URL}${item.icon}`} />
                    </ListItemAvatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          lineHeight: 1.2,
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, lineHeight: 1.2, color: "textSecondary" }}
                      >
                        {item.category}
                      </Typography>
                    }
                    sx={{ opacity: isOpen ? 1 : 0 }}
                    primaryTypographyProps={{
                      sx: { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" },
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default UserServers;