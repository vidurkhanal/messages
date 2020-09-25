import React, { useState } from "react";
import styles from "./login.module.css";
import ChatIcon from "@material-ui/icons/Chat";
import ErrorIcon from "@material-ui/icons/Error";
import CancelIcon from "@material-ui/icons/Cancel";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const closeError = () => {
    setError(null);
  };
  const signin = (e) => {
    auth
      .signInWithPopup(provider)
      .then((authUser) =>
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      )
      .catch((error) => setError(error.message));
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <ChatIcon className={styles.logo} />
        <br />
        <Button type="submit" onClick={signin}>
          Sign In With Google
        </Button>
      </div>
      {error && (
        <div className={styles.error}>
          <div>
            <ErrorIcon className={styles.errorIcon} />
            <p>{error}</p>
            <CancelIcon className={styles.crossIcon} onClick={closeError} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
