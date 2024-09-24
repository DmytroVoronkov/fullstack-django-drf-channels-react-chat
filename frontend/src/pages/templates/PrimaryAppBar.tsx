import { AppBar, Link, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const PrimaryAppBar = () => {
  const theme = useTheme();
  return (
    <AppBar
      sx={{
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
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
