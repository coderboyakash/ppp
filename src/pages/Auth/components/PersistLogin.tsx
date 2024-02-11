import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetLoggedInUserMutation } from "../../../store/Auth/AuthApiSlice.ts";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import routes from "../../../utils/routes.ts";
import { setAuth } from "../../../store/Auth/AuthSlice.ts";
import Splash from "../../../components/Splash/Splash.tsx";

interface JwtDecoded {
  email: string;
}

const PersistLogin = () => {
  const [getLoggedInUser, { isLoading }] = useGetLoggedInUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const checkLoginStatus = async () => {
    const token: string = localStorage.getItem('token') ?? ""
    if(token.trim() !== ""){
      const decoded: JwtDecoded | null = jwtDecode(token)
      const email = decoded?.email
      const response = await getLoggedInUser({ email }).unwrap();
      if (response.status === true) {
        dispatch(setAuth({ isLoggedIn: true, user: response.data[0] }))
        navigate([routes.Signin, routes.Verify].includes(location.pathname) ? routes.Home : location.pathname)
      }
    }
    
  };

  useEffect(() => {
    checkLoginStatus().then();
  }, []);

  if(isLoading){
    return <Splash />
  }

  return <Outlet />;
};

export default PersistLogin;
