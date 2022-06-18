import React, { useState, useReducer } from "react";
import { Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import DoneAllSharpIcon from "@mui/icons-material/DoneAllSharp";
import TextField from "@mui/material/TextField";
import CircularProgress from "../utils/CircularProgress";
import { checkUserCredentials } from "../utils/checkInputs";
import CustomStyles from "../styles/UserAccess"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

const Styles = CustomStyles(Paper, Typography)

type props = {
    actionType: string
    titleText: string
    otherText: string
    otherLink: {link: string, linkText: string}
} 

function UserAccess({ titleText, actionType, otherText, otherLink }: props) {

  const initialInput = {
    email: "",
    password: "",
  };

  type ACTIONTYPE =  
  | { type: "insertValue"; field: string; fieldValue: string }  
  | { type: "removeValue"; field: string; fieldValue: string };


  const reducer = (state: typeof initialInput, action: ACTIONTYPE) => {
    switch (action.type) {
      case "insertValue":
        return { ...state, [action.field]: action.fieldValue };
      case "removeValue":
        return initialInput;
      default:
        return state;
    }
  };

  interface errorValues {
    email?: string;
    password?: string
    general?: string
  }

  const initialError: errorValues = {};
  const navigate = useNavigate();
  const { login, signup } = useAuth()
  const [buttonLoading, setButtonLoading] = useState(false);
  const [input, setInput] = useReducer(reducer, initialInput);
  const [errors, setErrors] = useState<typeof initialError>(initialError);
  const [success, setSuccess] = useState(false);

  const authActionType = actionType === "login" ? login : signup

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

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setButtonLoading(true);
    try{
    setErrors({});
    const { valid, checkErrors } = checkUserCredentials(input);
    if (!valid) {
      setButtonLoading(false);
      return setErrors({ ...errors, ...checkErrors });
    }
    await authActionType(input.email, input.password)
    return handleSuccess()
  } catch(error: any){
    let errStrgArr = await error.message.split("/")
    let newString = await errStrgArr[errStrgArr.length-1].replace(/[^a-zA-Z]/g, " ")
    setErrors({ ...errors, general: newString });
  }
  setButtonLoading(false);
  };


  return (
    <>
      <Styles.Container>
        {/* Form */}
        <Styles.PaperContainer elevation={5}>
        <Styles.TitleText>
        {titleText}
        </Styles.TitleText>
        <form
            autoComplete="off"
            method="POST"
            name="uploadForm"
            noValidate
            encType="multipart/form-data"
          >
          <TextField
            error={errors.email ? true : false}
            helperText={errors.email && errors.email}
            label="email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={input.email}
            type="email"
            onChange={formHandler}
          />

          <TextField
            error={errors.password ? true : false}
            helperText={errors.password && errors.password}
            label="password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            name="password"
            value={input.password}
            onChange={formHandler}
          />

            <Typography variant="caption" color="error">
                {errors.general && errors.general}
            </Typography>

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
              {!success ? `${actionType}` : `successful`}
            </Typography>

          </Button>
          <Typography variant="caption">
        {otherText} <Link to={otherLink.link}>{otherLink.linkText}</Link>
        </Typography>
          </form>
        </Styles.PaperContainer>
      </Styles.Container>
    </>
  );
}

export default UserAccess;