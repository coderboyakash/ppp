import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/Auth/AuthSlice.ts";

const Home = () => {
  const user = useSelector(selectCurrentUser)
  return (
    <Box>
      {JSON.stringify(user)}
    </Box>
  );
};

export default Home;
