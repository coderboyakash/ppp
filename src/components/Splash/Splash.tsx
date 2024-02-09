import { Box, Image } from "@chakra-ui/react";
import styles from "./styles.module.css";

const Splash = () => {
  return (
    <Box className={styles.splash}>
      <Image className={styles.logo} src={"./irmra.png"} alt={"logo"} />
      <Box className={styles.loader}></Box>
    </Box>
  );
};

export default Splash;
