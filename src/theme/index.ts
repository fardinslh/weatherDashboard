import { createTheme } from "@mui/material/styles";
import type { PaletteOptions } from "@mui/material";
import { lightPalette, darkPalette } from "./palette";

function getTheme(mode: "light" | "dark") {
  return createTheme({
    palette: (mode === "light" ? lightPalette : darkPalette) as PaletteOptions,
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
    shape: {
      borderRadius: 8,
    },
  });
}

export default getTheme;
