import { useEffect, useState } from "react"
import Edit from "@mui/icons-material/Edit";
import Add from "@mui/icons-material/Add";
// styling is done using MATERIAL UI, v5
import { Typography, Paper, Grid, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "../axiosConfig"
import { useAuth } from "../context/AuthContext";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import CircularProgress from "../utils/CircularProgress";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Logout  from "@mui/icons-material/Logout";

import CustomStyles from "../styles/Designs";

const Styles = CustomStyles(Paper, Typography, IconButton, Grid, Button)

const Design = () => {
  interface designTypes {
    title: string,
    designId: string,
    designedAt: [],
    designs: []
  }
  dayjs.extend(relativeTime)
  const initailError = {error: "", noMoreDesign: ""}
  const [designs, setDesigns] = useState<designTypes[] | []>([])
  const [errors, setErrors] = useState(initailError)
  const [lastId, setLastId] = useState("")
  const [buttonLoading, setButtonLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const { currentUser, logout } = useAuth()
const userEmail = currentUser && currentUser.email;

  useEffect(() => {
    let cancel = false;
    axios.get(`/firstBatchDesigns/${userEmail}`) 
    .then((res: any) => {
      if (cancel) return;
      setLastId(res.data[0])
      let newDesigns = res.data
      newDesigns.shift()
      setDesigns(newDesigns)
      return setInitializing(false)
    })
    .catch((err: any) => {
      setInitializing(false)
      return setErrors({...errors, ...err.response.data})
    })
    return () => {
      cancel = true;
    };
    // eslint-disable-next-line
  }, [userEmail]);

  const handleGetMore = () => {
    setButtonLoading(true);
    axios.get(`/moreDesigns/${userEmail}/${lastId}`)
    .then(res => {
        setLastId(res.data[0])
        let newDesigns = res.data
        newDesigns.shift()
        setDesigns([...designs, ...newDesigns])
      setButtonLoading(false)
    })
    .catch(err => {
       setErrors({...errors, ...err.response.data})
        setButtonLoading(false)
    });
  }

  const refineDate = (date: []) => {
    let lastUpdated = date[date.length-1]
    const newDate = dayjs(lastUpdated).fromNow()
    return newDate; 
  }

  const refineImage = (image: []) => {
    let latestDesign = image[image.length-1]
    return latestDesign; 
  }

  const handleLogOut = () => {
    return logout()
  }

  return (
    <>
    {designs.length !== 0 && (
    <Link to="/create-design" className="routerLink">
      <Styles.FloatingIconButton
        size="large"
        aria-label="add design"
      >
        <Add />
      </Styles.FloatingIconButton>
      </Link>
    )
}     

      <Styles.FloatingLogoutButton
        size="large"
        aria-label="logout"
        onClick={handleLogOut}
        //variant="contained"
        color="primary"
        //startIcon={}
        >
        <Logout style={{color: '#fff'}} />
      </Styles.FloatingLogoutButton>

      <Styles.PageContent>
        {/* Design list */}
          <Styles.Designs container>
            {/* iterate over designs and display them */}
            {designs.map((item) => (
              <Grid key={item.designId} item xs={12} sx={{ marginBottom: 1 }}>
                <Styles.Item elevation={8}>
                  <Styles.DesignContent container flexWrap="nowrap">
                    
                    <Grid item xs={3}>
                    <Styles.ImageContainer>
                      <Link 
                    to={`/edit-design/${item.designId}`}
                    className="routerLink"
                    >
                      <Styles.Image src={refineImage(item.designs)} alt={item.title} />
                      </Link>
                    </Styles.ImageContainer>
                    </Grid>
                    
                    <Grid
                      item
                      xs={9}
                      style={{paddingLeft: 15}}
                    >
                      <Link
                    to={`/edit-design/${item.designId}`}
                    className="routerLink"
                    >
                      <Styles.TextContainer>
                      <Styles.DesignText noWrap>{item.title}</Styles.DesignText>
                      </Styles.TextContainer>
                      <Styles.TextContainer>
                      <Styles.DesignDate noWrap>{refineDate(item.designedAt)}</Styles.DesignDate>
                      </Styles.TextContainer>

                <Styles.EditButton
                variant="contained"
                color="primary"
                size="small"
                startIcon={<Edit style={{color: '#fff'}} fontSize="small" />}
              >
                <Typography sx={{marginTop: 0.2}} variant="caption">Edit</Typography>
              </Styles.EditButton>
              </Link>
            </Grid>
                    
                  </Styles.DesignContent>
                </Styles.Item>
              </Grid>
            ))}
            <Typography>
              {errors && errors.error}
            </Typography>

            {
              errors.noMoreDesign &&
              <Grid container justifyContent="center">
              <Grid item xs={12} style={{
                  color: 'green',
                  textAlign: 'center',
                  paddingTop: 10
                }}>
                <Typography variant="body2">
                    {errors.noMoreDesign && errors.noMoreDesign}
                </Typography>
                </Grid>
                </Grid>
              }
            {!errors.noMoreDesign && designs.length > 0 &&
            <Grid container justifyContent="center">
            <Grid item style={{paddingTop: 10}}>
            <Button
            variant="outlined"
            color="primary"
            endIcon={<ExpandMoreOutlinedIcon />}
            disabled={buttonLoading}
            onClick={handleGetMore}
            >
      {buttonLoading && <CircularProgress />}
      <Typography 
      style={{
        textTransform: "capitalize"
      }} 
      variant="body2" 
      noWrap
      >
        More designs
        </Typography>
    </Button>
    </Grid>
    </Grid>
    }


          </Styles.Designs>
          {initializing && <CircularProgress />}
        {designs.length === 0 && !initializing ? (
          <Link
          to="/create-design"
          className="routerLink"
          >
          <Styles.AddFirstDesign
            elevation={5}
          >
            {/* Design list */}
            <Styles.AddFirstDesignButton aria-label="add first design">
              <Add />
            </Styles.AddFirstDesignButton>
            <Styles.AddFirstDesignText>Tap here to create your first design</Styles.AddFirstDesignText>
          </Styles.AddFirstDesign>
          </Link>
        ) : (
          ""
        )}
      </Styles.PageContent>
    </>
  );
};

export default Design;
