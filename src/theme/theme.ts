import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const globalStylesConfig = {
  ":root": {
    colorScheme: "dark",
  },
  "*": {
    boxSizing: "border-box",
  },
  "html": {
    scrollBehavior: "smooth",
  },
  "body": {
    margin: 0,
    minWidth: 320,
    overflowX: "hidden",
    background: "#0b0b0f",
  },
  "a": {
    color: "inherit",
    textDecoration: "none",
  },
  ".swiper-pagination-bullet": {
    background: "rgba(255, 255, 255, 0.55) !important",
  },
  ".swiper-pagination-bullet-active": {
    background: "#ffffff !important",
  },
};

export const createAppTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    background: {
      default: mode === "dark" ? "#0B0B0F" : "#F2F6FB",
      paper: mode === "dark" ? "#17181D" : "#FFFFFF"
    },
    primary: {
      main: "#1677FF",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#25C06D"
    },
    text: {
      primary: mode === "dark" ? "#FFFFFF" : "#101115",
      secondary: mode === "dark" ? "#B4B7C2" : "#5D6370"
    },
    divider: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(12,18,28,0.1)"
  },
  shape: {
    borderRadius: 20
  },
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
    h1: {
      fontWeight: 900,
      fontStyle: "italic",
      lineHeight: 0.98,
      letterSpacing: 0
    },
    h2: {
      fontWeight: 900,
      fontStyle: "italic",
      letterSpacing: 0
    },
    h3: {
      fontWeight: 850,
      letterSpacing: 0
    },
    button: {
      fontWeight: 800,
      textTransform: "none"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          minHeight: 52,
          boxShadow: "none"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none"
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: "none"
        }
      }
    }
  }
});

export const theme = createAppTheme("dark");
