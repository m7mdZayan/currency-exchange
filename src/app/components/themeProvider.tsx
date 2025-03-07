"use client";

import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  IconButton,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { PaletteMode } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

interface ICustomThemeProvider {
  children: ReactNode;
}

const CustomThemeProvider: React.FC<ICustomThemeProvider> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="container relative mx-auto max-w-[750px]">
        <IconButton
          onClick={toggleTheme}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "inherit",
          }}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </div>
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
