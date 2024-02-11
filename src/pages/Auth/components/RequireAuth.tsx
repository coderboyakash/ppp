import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsLoggedIn } from "../../../store/Auth/AuthSlice";
import routes from "../../../utils/routes";

const RequireAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to={routes.Signin} />;
};

export default RequireAuth;
