declare module "@mui/material/styles" {
  interface PaletteColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    A100?: string;
    A200?: string;
    A400?: string;
    A700?: string;
  }
  interface SimplePaletteColorOptions {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    A100?: string;
    A200?: string;
    A400?: string;
    A700?: string;
  }
}

export const lightPalette = {
  mode: "light",
  background: { default: "#FFFFFF", paper: "#F5F9FC" },
  text: { primary: "#0C0C0C", secondary: "#3E454C" },

  primary: {
    50: "#EEFAFF",
    100: "#CFEDFA",
    200: "#98D8F1",
    300: "#57C0E9",
    400: "#19ABE4",
    500: "#009CDB",
    600: "#0F6FA6",
    700: "#10598E",
    800: "#074979",
    900: "#003464",
    A100: "#82F8FF",
    A200: "#44DDFF",
    A400: "#29B2FF",
    A700: "#298BFF",
    main: "#009CDB",
    light: "#98D8F1",
    dark: "#10598E",
  },

  error: {
    50: "#FFEBEE",
    100: "#FFCDD2",
    200: "#EF9A9A",
    300: "#E57373",
    400: "#EF5350",
    500: "#F44336",
    600: "#E53935",
    700: "#D32F2F",
    800: "#C62828",
    900: "#B71C1C",
    main: "#F44336",
    light: "#E57373",
    dark: "#D32F2F",
  },

  warning: {
    50: "#FFF3E0",
    100: "#FFECB2",
    200: "#FFCC80",
    300: "#FFB74D",
    400: "#FFA726",
    500: "#FF9800",
    600: "#FB8C00",
    700: "#F57C00",
    800: "#EF6C00",
    900: "#E65100",
    main: "#FF9800",
    light: "#FFB74D",
    dark: "#F57C00",
  },

  success: {
    50: "#E8F5E9",
    100: "#C8E6C9",
    200: "#A5D6A7",
    300: "#81C784",
    400: "#66BB6A",
    500: "#4CAF50",
    600: "#43A047",
    700: "#388E3C",
    800: "#2E7D32",
    900: "#1B5E20",
    main: "#4CAF50",
    light: "#81C784",
    dark: "#388E3C",
  },

  info: {
    50: "#E3F2FD",
    100: "#BBDEFB",
    200: "#90CAF9",
    300: "#64B5F6",
    400: "#42A5F5",
    500: "#2196F3",
    600: "#1E88E5",
    700: "#1976D2",
    800: "#1565C0",
    900: "#0D47A1",
    main: "#2196F3",
    light: "#64B5F6",
    dark: "#1976D2",
  },

  neutral: {
    50: "#FFFFFF",
    100: "#F5F9FC",
    200: "#E1E9EE",
    300: "#C5CED4",
    400: "#AAB4BB",
    500: "#8F9AA2",
    600: "#6F767C",
    700: "#3E454C",
    800: "#25262E",
    900: "#1C1B22",
  },
  extra: { accent1: "#D3E1E7" },
};

export const darkPalette = {
  mode: "dark",
  background: { default: "#151D32", paper: "#292F45" },
  text: { primary: "#FFFFFF", secondary: "#C5CED4" },

  primary: { ...lightPalette.primary },
  error: { ...lightPalette.error },
  warning: { ...lightPalette.warning },
  success: { ...lightPalette.success },
  info: { ...lightPalette.info },
  neutral: { ...lightPalette.neutral },
  extra: { accent1: "#404961" },
};
