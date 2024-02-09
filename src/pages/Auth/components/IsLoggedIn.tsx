import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../../store/Auth/AuthSlice"
import { Navigate, Outlet } from "react-router-dom"
import routes from "../../../utils/routes"

const IsLoggedIn = () => {
	const isLoggedIn = useSelector(selectIsLoggedIn)
  return isLoggedIn ? <Navigate to={routes.Home}/> : <Outlet/>
}

export default IsLoggedIn