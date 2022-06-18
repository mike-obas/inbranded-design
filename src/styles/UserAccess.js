import { styled } from "@mui/material/styles";

const CustomStyles = (Paper, Typography) => ({

     Container: styled("div")({
        maxWidth: 1200,
        margin: "auto",
        padding: "0px 20px",
      }),
      
       TitleText: styled(Typography)(({ theme }) => ({
        ...theme.typography.h6,
        color: '#595959',
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: '15px'
      })),
      
       PaperContainer: styled(Paper)({
        maxWidth: 600,
        margin: "40px auto",
        padding: "35px 20px",
      })
      

})

export default CustomStyles