import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./utils/theme";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./routes/Main";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
        <Main />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
