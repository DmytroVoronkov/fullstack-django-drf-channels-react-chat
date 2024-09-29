import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery, styled } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import DrawerToggle from "../../components/PrimaryDraw/DrawToggle";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";

type Props = {
  children: ReactNode;
};

type ChildProps = {
  isOpen: boolean;
};

type ChildElement = {
  element: React.ReactElement<ChildProps>;
};

const PrimaryDraw: React.FC<Props> = ({ children }) => {
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
          {/* {React.Children.map(children, (child) => {
            return React.isValidElement(child) ? 
            React.cloneElement(child as ChildElement, {isOpen} ) : child;
          })} */}
        </Box>
          {React.Children.map(children, (child) => {
            return React.isValidElement(child) ? 
            React.cloneElement(child as ChildElement, {isOpen} ) : child;
          })}
      </Box>
    </Drawer>
  );
};

export default PrimaryDraw;
