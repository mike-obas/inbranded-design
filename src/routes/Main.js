import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Designs from "../pages/Designs";
import CreateDesign from "../pages/CreateDesign";
import EditDesign from "../pages/EditDesign";
import NavBar from "../components/Header";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Protected, { AutoLogin } from "../components/ProtectedRoute";

function Main() {
  const { currentUser } = useAuth()
  const location = useLocation()
  const getUrl = location.pathname;
  const newUrl = getUrl.split("/")
  const url = `/${newUrl[1]}`;

  const isHomeUrl = url === "/";
  const isDesignTitle = url === "/designs" ? "My Designs" : "Inbranded Design";


  return (
    <>
    <NavBar backIcon={!isHomeUrl} title={isDesignTitle} extraStyle={!isHomeUrl} />
    <Routes>
      <Route exact path="/"
      element={
        <AutoLogin currentUser={currentUser}>
        <Login />
        </AutoLogin>
      }
      />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/create-design"
      element={
        <Protected currentUser={currentUser}>
        <CreateDesign />
        </Protected>
      }
      />
      <Route exact path="/edit-design/:designId" 
      element={
        <Protected currentUser={currentUser}>
        <EditDesign />
        </Protected>
      }
      />
      <Route exact path="/designs"
      element={
        <Protected currentUser={currentUser}>
        <Designs />
        </Protected>
      }
      />
    </Routes>
    </>
  );
}

export default Main;
