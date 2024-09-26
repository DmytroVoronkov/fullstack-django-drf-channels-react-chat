import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const SecondaryDraw = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minWidth: `${theme.secondaryDraw.width}px`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        mt: `${theme.primaryAppBar.height}px`,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: { xs: "none", sm: "block" },
        overflow: "auto",
      }}
    >
      {[...Array(50)].map((_, index) => (
        <Typography key={index} component="p">
          {index + 1}
        </Typography>
      ))}
    </Box>
  );
};

export default SecondaryDraw;
