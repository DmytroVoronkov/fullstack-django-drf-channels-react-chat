import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import ExploreCategories from "../../components/SecondaryDraw/ExploreCategories";
import AccountButton from "../../components/PrimaryAppBar/AccountButton";

const PrimaryAppBar = () => {
  const [sideMenu, setSideMenu] = useState<boolean>(false);
  const theme = useTheme();

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

  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const list = () => (
    <Box
      sx={{ pt: `${theme.primaryAppBar.height}px`, minWidth: 200, role: "presentation" }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ExploreCategories />
    </Box>
  );

  useEffect(() => {
    if (isSmallScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [sideMenu, isSmallScreen]);

  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height,
        }}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
        <Link href="/" underline="none" color="inherit">
          <Typography
            variant="h6"
            noWrap
            component={"span"}
            sx={{
              display: {
                fontWeight: 700,
                letterSpacing: "-0.5px",
              },
            }}
          >
            WEBCHAT
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }}></Box>
        <AccountButton />
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
