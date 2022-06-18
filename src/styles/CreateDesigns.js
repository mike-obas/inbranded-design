import { styled } from "@mui/material/styles";

const CustomStyles = (Paper, Typography, Grid, Button) => ({

     Container: styled("div")({
        maxWidth: 1200,
        margin: "auto",
        padding: "0px 5px",
      }),
      
       PaperContainer: styled(Paper)({
        margin: "40px auto",
        padding: "25px 10px"
      }),
      
       TitleText: styled(Typography)(({ theme }) => ({
        ...theme.typography.h5,
        color: '#595959',
        fontWeight: 700,
        textAlign: 'center'
      })),
      
       ContainerGrid: styled(Grid)(({ theme }) => ({
        marginTop: -10,
        [theme.breakpoints.up("md")]: {
          marginTop: 40,
        }
      })),

      ImageContainer: styled("div")({
        position: "relative",
        paddingTop: "100%",
      }),

      Image: styled("img")({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: 'contain'
      }),
      
       ImageEditorGrid: styled(Grid)(({ theme }) => ({
        [theme.breakpoints.up("md")]: {
          paddingRight: 10,
          borderRight: '1px solid lightgrey', 
        }
      })),
      
       UploadButton: styled(Button)({
        margin: "7px 0px 22px",
        borderColor: '#bfbfbf',
        color: '#999999',
        textTransform: "capitalize"
      })
      

})

export default CustomStyles