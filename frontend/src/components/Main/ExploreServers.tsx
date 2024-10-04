import {
  List,
  ListItem,
  // ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Container,
  Grid2,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import useCrud from "../../hooks/useCrud";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { MEDIA_URL } from "../../config";
import { Link } from "react-router-dom";

interface Server {
  id: number;
  name: string;
  description: string;
  banner: string;
  icon: string;
  category: string;
}

const ExploreServers = () => {
  const { categoryName } = useParams();
  const url = categoryName ? `/server/select/?category=${categoryName}` : "/server/select";
  const { dataCRUD, fetchData } = useCrud<Server>([], url);

  useEffect(() => {
    fetchData();
  }, [categoryName]);

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ pt: 6 }}>
          <Typography
            variant="h3"
            noWrap
            component="h1"
            sx={{
              display: { sm: "block", fontWeight: 700, letterSpacing: "-2px" },
              textAlign: { xs: "center", sm: "left" },
              textTransform: "capitalize"
            }}
          >
            {categoryName ? categoryName : "Popular channels"}
          </Typography>
        </Box>
        <Box maxWidth="lg">
          <Typography
            variant="h6"
            noWrap
            component="h2"
            color="textSecondary"
            sx={{
              display: { sm: "block", fontWeight: 700, letterSpacing: "-1px" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {categoryName
              ? `Channels talking about ${categoryName}`
              : "Check out some of our popular channels"}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ pt: 6, pb: 1, fontWeight: 700, letterSpacing: "-1px" }}>
          Recommended Channels
        </Typography>

        <Grid2 container spacing={{ xs: 0, sm: 2 }}>
          {dataCRUD.map((item) => {
            return (
              <Grid2 key={item.id} size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "none",
                    backgroundImage: "none",
                    borderRadius: 0
                  }}
                >
                  <Link
                    to={`/server/${item.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        item.banner ? `${MEDIA_URL}${item.banner}` : "https://picsum.photos/500/300"
                      }
                      alt="random"
                      sx={{ display: { xs: "none", sm: "block" } }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 0, ":last-child": { padding: "bottom" } }}>
                      <List>
                        <ListItem disablePadding>
                          <ListItemIcon sx={{ minWidth: 0 }}>
                            <ListItemAvatar sx={{ minWidth: "50px" }}>
                              <Avatar alt="Server icon" src={`${MEDIA_URL}${item.icon}`} />
                            </ListItemAvatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                textAlign="start"
                                sx={{
                                  fontWeight: 700,
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.name}
                              </Typography>
                            }
                            secondary={<Typography variant="body2">{item.category}</Typography>}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Link>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
      </Container>
    </>
  );
};

export default ExploreServers;
