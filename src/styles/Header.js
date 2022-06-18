import { styled } from "@mui/material/styles";

const CustomStyles = (IconButton, Paper, Typography) => ({

     BackButton: styled(IconButton)({
        marginRight: 20,
      }),
      
       Header: styled(Paper)(({ theme }) => ({
        display: "flex",
        backgroundColor: theme.palette.primary.main,
        alignItems: "center",
        height: 70,
        borderRadius: 0,
        padding: "0px 20px",
      })),
      
       HeaderText: styled(Typography)(({ theme }) => ({
        ...theme.typography.h5,
        color: theme.palette.primary.contrastText,
        fontWeight: 600,
        textTransform: "capitalize",
      }))

})

export default CustomStyles