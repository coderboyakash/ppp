import { Route, Routes } from "react-router-dom";
import routes from "./utils/routes.ts";
import Home from "./pages/Home.tsx";
import Signin from "./pages/Auth/Signin.tsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.tsx";
import PersistLogin from "./pages/Auth/components/PersistLogin.tsx";
import RequireAuth from "./pages/Auth/components/RequireAuth.tsx";
import Verify from "./pages/Auth/Verify.tsx";
import IsLoggedIn from "./pages/Auth/components/IsLoggedIn.tsx";

const App = () => {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<IsLoggedIn />}>
          <Route path={routes.Signin} element={<Signin />} />
          <Route path={routes.Verify} element={<Verify />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path={routes.Home} element={<Home />} />
        </Route>
      </Route>
      <Route path={routes.PageNotFound} element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
