import { Typography, Paper, IconButton } from "@mui/material";
import CustomStyles from "../styles/Header"
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Styles = CustomStyles(IconButton, Paper, Typography);

const Icon = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <Styles.BackButton onClick={goBack}>
      <ArrowBack sx={{ color: "#ffffff" }} />
    </Styles.BackButton>
  );
};

type props = {
    backIcon?: boolean;
    title?: string;
    extraStyle: boolean;
}

function NavBar({ backIcon = true, title = "Inbranded Design", extraStyle = false }: props) {

  return (
    <Styles.Header 
    elevation={1} 
    sx={{justifyContent: extraStyle ? "flex-start" : "center"  }}
    >
      {backIcon && <Icon />}
      <Styles.HeaderText noWrap>{title}</Styles.HeaderText>
    </Styles.Header>
  );
}

export default NavBar;
