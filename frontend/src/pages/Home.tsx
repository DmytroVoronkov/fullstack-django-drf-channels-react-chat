import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <PrimaryAppBar />
    </Box>
  );
};

export default Home;
