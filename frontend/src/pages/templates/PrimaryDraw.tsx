import { useTheme } from "@mui/material/styles";
import { Box, Drawer, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import DrawerToggle from "../../components/PrimaryDraw/DrawToggle";

const PrimaryDraw = () => {
  const theme = useTheme();
  const isDisplayWidthBelow600 = useMediaQuery("(max-width:599px)");
  const [isOpen, setIsOpen] = useState(!isDisplayWidthBelow600);

  useEffect(() => {
    setIsOpen(!isDisplayWidthBelow600);
  }, [isDisplayWidthBelow600]);

  const handleDrawedOpen = () => {
    setIsOpen(true);
  };

  const handleDrawedClosed = () => {
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
          <DrawerToggle />
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
