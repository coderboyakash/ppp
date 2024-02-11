import { Box, Button, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, selectCurrentUser } from "../store/Auth/AuthSlice.ts";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser)
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    dispatch(clearAuth())
  }
  return (
    <Box>
      <Text>Hi {user?.name} you are loggedin!</Text>
      <Button onClick={handleLogout} colorScheme="red">Logout</Button>
    </Box>
  );
};

export default Home;
