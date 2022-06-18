import { styled } from "@mui/material/styles";

const CustomStyles = (Paper, Typography, IconButton, Grid, Button) => ({
     PageContent: styled("div")({
        maxWidth: 1200,
        padding: "0px 10px",
        margin: "auto",
      }),
      
      AddFirstDesign: styled(Paper)({
        maxWidth: 600,
        margin: "10px auto",
        padding: "20px",
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }),
      
      AddFirstDesignButton: styled(IconButton)(({ theme }) => ({
        marginBottom: 5,
        backgroundColor: theme.palette.primary.main,
        color: "#ffffff",
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      })),
      
      AddFirstDesignText: styled(Typography)(({ theme }) => ({
        ...theme.typography.subtitle1,
        color: theme.palette.text.primary,
        fontWeight: 600,
      })),
    
       Designs: styled(Grid)({
        padding: "20px 0px 60px",
        maxWidth: "600px",
        margin: "auto",
      }),
      
       Item: styled(Paper)(({ theme }) => ({
        padding: "15px 20px",
        [theme.breakpoints.down("sm")]: {
          padding: 10,
        },
      })),
      
      DesignContent: styled(Grid)({
        display: "flex"
      }),
      
     ImageContainer: styled("div")({
        position: "relative",
        paddingTop: "100%"
      }),
      
       Image: styled("img")({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: 'contain'
      }),
      
       EditButton: styled(Button)({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        padding: "1px 10px",
        textTransform: 'none'
      }),
      
       TextContainer: styled('div')({
        width: '100%'
      }),
      
       DesignText: styled(Typography)(({ theme }) => ({
        textAlign: "left",
        ...theme.typography.subtitle1,
        color: theme.palette.text.primary,
        fontWeight: 600,
        marginBottom: "-2px",
      })),
      
       DesignDate: styled(Typography)(({ theme }) => ({
        textAlign: "left",
        ...theme.typography.subtitle2,
        color: theme.palette.text.secondary,
        fontWeight: 600,
      })),
      
       FloatingIconButton: styled(IconButton)(({ theme }) => ({
        zIndex: 100,
        position: "fixed",
        bottom: 30,
        right: 200,
        [theme.breakpoints.down(1200)]: {
          right: 150,
        },
        [theme.breakpoints.down("md")]: {
          bottom: 20,
          right: 25,
        },
        backgroundColor: theme.palette.primary.main,
        color: "#ffffff",
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      })),
      
      FloatingLogoutButton: styled(IconButton)(({ theme }) => ({
        zIndex: 100,
        position: "fixed",
        bottom: 30,
        left: 200,
        [theme.breakpoints.down(1200)]: {
          left: 150,
        },
        [theme.breakpoints.down("md")]: {
          bottom: 20,
          left: 25
        },
        backgroundColor: theme.palette.primary.main,
        color: "#ffffff",
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      }))

})

export default CustomStyles