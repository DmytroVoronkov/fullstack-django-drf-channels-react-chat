import { useTheme } from "@mui/material/styles";
import { Box, Drawer, Typography, useMediaQuery, styled } from "@mui/material";
import { useEffect, useState } from "react";
import DrawerToggle from "../../components/PrimaryDraw/DrawToggle";
import MuiDrawer from "@mui/material/Drawer";

const PrimaryDraw = () => {
  const theme = useTheme();
  const isDisplayWidthBelow600 = useMediaQuery("(max-width:599px)");
  const [isOpen, setIsOpen] = useState(!isDisplayWidthBelow600);

  const openedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    width: theme.primaryDraw.closed,
  });

  const Drawer = styled(
    MuiDrawer,
    {}
  )(({ theme, open }) => ({
    width: theme.primaryDraw.width,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && { ...openedMixin(), "& .MuiDrawer-paper": openedMixin() }),
    ...(!open && { ...closedMixin(), "& .MuiDrawer-paper": closedMixin() }),
  }));

  useEffect(() => {
    setIsOpen(!isDisplayWidthBelow600);
  }, [isDisplayWidthBelow600]);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClosed = () => {
    setIsOpen(false);
  };

  return (
    <Drawer
      open={isOpen}
      variant={isDisplayWidthBelow600 ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          width: theme.primaryDraw.width,
        },
      }}
    >
      <Box>
        <Box sx={{ position: "absolute", top: 0, right: 0, p: 0, width: isOpen ? "auto" : "100%" }}>
          <DrawerToggle
            isOpen={isOpen}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClosed={handleDrawerClosed}
          />
          {[...Array(50)].map((_, index) => (
            <Typography key={index} component="p">
              {index + 1}
            </Typography>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default PrimaryDraw;
