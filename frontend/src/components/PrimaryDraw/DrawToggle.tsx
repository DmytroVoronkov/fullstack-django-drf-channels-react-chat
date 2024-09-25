import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";

type Props = {
  isOpen: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClosed: () => void;
};

const DrawerToggle: React.FC<Props> = ({ isOpen, handleDrawerClosed, handleDrawerOpen }) => {
  return (
    <Box sx={{ height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <IconButton onClick={isOpen ? handleDrawerClosed : handleDrawerOpen}>
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Box>
  );
};

export default DrawerToggle;
