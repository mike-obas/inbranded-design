import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

const Styles = {
  Progress: styled(CircularProgress)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    color: theme.palette.primary.main,
  })) as typeof CircularProgress,
}

function MyProgress() {
  return (
    <>
      <Styles.Progress size={24} />
    </>
  );
}

export default MyProgress;
