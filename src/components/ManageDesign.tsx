import { useEffect, useState, useReducer } from "react"
import { Typography, Paper, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import DoneAllSharpIcon from "@mui/icons-material/DoneAllSharp";
import CircularProgress from "../utils/CircularProgress";
import CustomStyles from "../styles/CreateDesigns";
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
import { checkDesignCredentials } from "../utils/checkInputs";
import axios from "../axiosConfig";
import { useParams } from "react-router-dom";

const Styles = CustomStyles(Paper, Typography, Grid, Button)

type btnProps = {
  sxDisplay: string
  mdDisplay: string
  imageHandler: any
} 

const UploadBtnFunction = ({sxDisplay, mdDisplay, imageHandler} : btnProps) => (
  <Styles.UploadButton
                fullWidth
                variant="outlined"
                component="label"
                endIcon={<CameraAltOutlined color="inherit" />}
                sx={{ display: { xs: sxDisplay, md: mdDisplay } }}
              >
                <Typography variant="subtitle1">Upload Image</Typography>
                <input
                  name="productImages"
                  onChange={imageHandler}
                  type="file" 
                  accept="image/*"
                  hidden
                />
              </Styles.UploadButton>
)

type props = {
  actionType: string
} 

function CreateDesign({actionType}: props) {
  const { TABS } = window.FilerobotImageEditor;

  const { designId } = useParams();

  const initialInput = {
    email: "",
    title: "",
    image: "",
    designId: ""
  };

  type ACTIONTYPE =  
  | { type: "insertValue"; field: string; fieldValue: string }  
  | { type: "removeValue"; field: string; fieldValue: string }
  | { type: "insertMultipleValues"; multipleValues: typeof initialInput };


  const reducer = (state: typeof initialInput, action: ACTIONTYPE) => {
    switch (action.type) {
      case "insertValue":
        return { ...state, [action.field]: action.fieldValue };
        case "insertMultipleValues":
        return { ...state, ...action.multipleValues };
      case "removeValue":
        return initialInput;
      default:
        return state;
    }
  };


  interface errorValues {
    title?: string
    image?: string
    error?: string
  }

  const initialError: errorValues = {};

const [image, setImage] = useState<any>("/no-image.png") 
const [buttonLoading, setButtonLoading] = useState(false);
  const [input, setInput] = useReducer(reducer, initialInput);
  const [errors, setErrors] = useState<typeof initialError>(initialError);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()

const {currentUser} = useAuth()
const userEmail = currentUser && currentUser.email;

const handleSuccess = () => {
  setButtonLoading(false);
  setSuccess(true);
  setTimeout(() => {
    setSuccess(false);
    navigate("/designs");
  }, 1200);
};

const formHandler = (event: any): void => {
  setErrors({ ...errors, [event.currentTarget.name]: undefined });
  setInput({
    type: "insertValue",
    field: event.currentTarget.name,
    fieldValue: event.currentTarget.value,
  });
};

const designActionType = actionType === "create" ? "create" : designId
const designBtnType = actionType === "create" ? "create" : "Update"

useEffect(() => {
  let cancel = false
  if(actionType !== "create"){
    if(cancel) return;
    axios.get(`/getSingleDesign/${userEmail}/${designId}`) 
    .then(res => {
      if (cancel) return;
      let {designs, email, title, designId} = res.data
      setImage(`${designs[designs.length-1]}`)
      let designDetails = {
        ...input,
        email,
        title,
        designId
      }
      setInput({
        type: "insertMultipleValues",
        multipleValues: designDetails
      })
    })
    .catch((err: any) => {
      return setErrors({ ...errors, error: err.response.data.error });
    })
    
  }
  
  return () => {cancel = true;}
// eslint-disable-next-line
}, [actionType, designId, userEmail])

const submitHandler = async (e: React.SyntheticEvent) => {
  e.preventDefault();
  setButtonLoading(true);
  try{
  setErrors({});
  const { valid, checkErrors } = checkDesignCredentials(input);
  if (!valid) {
    setButtonLoading(false);
    return setErrors({ ...checkErrors });
  }
  await axios.post(`/manageDesigns/${designActionType}`, input) 
  return handleSuccess()
} catch(error: any){
  setButtonLoading(false);
  setErrors({ ...errors, error: error.response.data });
}
setButtonLoading(false);
};

useEffect(() => {
  setInput({
    type: "insertValue",
    field: "email",
    fieldValue: userEmail,
  });

}, [userEmail])


//using the imageEditor's Js library
useEffect(() => {
  let cancel = false;
  const config = {
    source: image,
    onSave: function(imageData: any, imageDesignState: any) {
      if (cancel) return;
      setErrors({...errors, image: '' });
      return setInput({
        type: "insertValue",
        field: "image",
        fieldValue: imageData.imageBase64,
      });
    },
    
    annotationsCommon: {
      fill: '#ff0000',
    },
    Text: { text: 'Inbranded Design...' },
    tabsIds: [TABS],
    closeAfterSave: true,
    defaultSavedImageName: new Date().getTime()
  };

  const filerobotImageEditor = new window.FilerobotImageEditor(
    document.querySelector('#editor_container'),
    config
  );

  filerobotImageEditor.render({
    onClose: (closingReason: any) => {
      filerobotImageEditor.terminate();
    }
  });

  return () => {cancel = true;}
// eslint-disable-next-line
}, [image])

const imageHandler = (e: any) => {
    setInput({
        type: "insertValue",
        field: "image",
        fieldValue: "",
      });
  let reader  = new FileReader();
  let image : string | ArrayBuffer | null = null
  reader.addEventListener('load', (event:any) => {
    image = event.target.result;
    setImage(image)
  });
  reader.readAsDataURL(e.target.files[0]);
}

  return (
    <Styles.Container>
      <Styles.PaperContainer elevation={5}>
        <Styles.TitleText>
          Start creating your design
        </Styles.TitleText>
        <Styles.ContainerGrid 
        container 
        spacing={4} 
        alignItems="center"
        >
      <Styles.ImageEditorGrid 
      item 
      xs={12} 
      md={6}
      > 
      <form
            autoComplete="off"
            method="POST"
            noValidate
            encType="multipart/form-data"
          >
        {
        actionType === "create" &&
        <UploadBtnFunction 
        imageHandler={imageHandler} 
        sxDisplay="flex" mdDisplay="none" 
        />
        }
        </form>
        <div style={{padding: "0px 10px"}}>
        <Typography variant="caption" color="error">
                {errors.image && errors.image}
        </Typography>
        </div>

        {
        input.image !== "" &&
        <Styles.ImageContainer>
            <Styles.Image src={input.image} alt={input.title} />
        </Styles.ImageContainer>
        }

      <div id="editor_container"></div>
      </Styles.ImageEditorGrid>
      <Grid 
      item 
      xs={12} 
      md={6}
      >
      <form
            autoComplete="off"
            method="POST"
            noValidate
            encType="multipart/form-data"
          >
            {
            actionType === "create" &&
            <UploadBtnFunction 
            imageHandler={imageHandler} 
            sxDisplay="none" mdDisplay="flex" 
            />
            }

      <TextField
            error={errors.title ? true : false}
            helperText={errors.title && errors.title}
            label="Design Title"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title"
            value={input.title}
            onChange={formHandler}
          />

            {/* <Typography variant="caption" color="error">
                {errors.error && errors.error}
            </Typography> */}

          <Button
            onClick={submitHandler}
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            type="submit"
            sx={{ marginTop: 3 }}
            startIcon={success ? <DoneAllSharpIcon color="success" /> : ""}
            disabled={buttonLoading || success}
          >
            {buttonLoading && <CircularProgress />}
            <Typography
              variant="subtitle1"
              sx={{ color: !success ? "white" : "green" }}
            >
              {!success ? `${designBtnType}` : `${designBtnType}d`}
            </Typography>
          </Button>
      </form>
      </Grid>
      </Styles.ContainerGrid>
      </Styles.PaperContainer>
    </Styles.Container>
  )
}

export default CreateDesign