import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { ReactNode, useState, useCallback, useEffect, useMemo } from "react";
import createMuiTheme from "../theme/theme";
import { ColorModeContext } from "../context/DarkModeContext";
import Cookie from "js-cookie";

type ToggleColorModeProps = {
  children: ReactNode;
};

export type ColorMode = "light" | "dark";

const ToggleColorMode: React.FC<ToggleColorModeProps> = ({ children }) => {
  const storedMode = Cookie.get("colorMode") as ColorMode
  const preferredDarkMode = useMediaQuery("([prefers-color-scheme: dark])")
  const defaultMode = storedMode || (preferredDarkMode ? "dark" : "light")

  const [mode, setMode] = useState<ColorMode>(defaultMode);

  const toggleColorMode = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    Cookie.set("colorMode", mode);
  }, [mode]);

  const colorMode = useMemo(() => ({ toggleColorMode }), [toggleColorMode]);

  const theme = useMemo(() => createMuiTheme(mode || "light"), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
