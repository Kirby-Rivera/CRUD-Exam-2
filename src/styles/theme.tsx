import { createTheme } from "@mui/material";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  weight: ["200", "300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  typography: {
    fontFamily: outfit.style.fontFamily,
  },

  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },

    primary: {
      main: "#4C5760",
    },

    secondary: {
      main: "#93A8AC",
    },

    error: {
      main: "#b52847",
    },
  },
});
