import { AppBar, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles"

const PrimaryAppBar = () => {
  const theme = useTheme();
  return (
    <AppBar>
      <Toolbar variant="dense" sx={{
        height: theme.primaryAppBar.height
      }}>Ashen One</Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
