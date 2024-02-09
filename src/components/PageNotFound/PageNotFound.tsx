import styles from "./styles.module.css";
const PageNotFound = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.notfound}>
        <div className={styles.notfound404}>
          <h1>404</h1>
        </div>
        <h2>We are sorry, Page not found!</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <a href="/">Back To Homepage</a>
      </div>
    </div>
  );
};
export default PageNotFound;
