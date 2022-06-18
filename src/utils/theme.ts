import { responsiveFontSizes, createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      light: "#ba68c8",
      main: "#9c27b0",
      contrastText: "#ffcc00",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
