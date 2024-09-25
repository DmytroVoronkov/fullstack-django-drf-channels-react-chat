import ChevronLeft  from "@mui/icons-material/ChevronLeft";
import { Box, IconButton } from "@mui/material";

const DrawerToggle = () => {
  return (
    <Box sx={{ height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <IconButton>
        <ChevronLeft />
      </IconButton>
    </Box>
  );
};

export default DrawerToggle;
