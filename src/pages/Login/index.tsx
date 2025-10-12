import { Button, TextField } from "@mui/material";
import styles from "./login.module.scss";
import moonCloudFast from "src/assets/moonCloudFast.png";

function Login(): React.ReactNode {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div>
          <div className={styles.login}>Login</div>
          <div className={styles.clouds}>
            <TextField
              placeholder="Enter Your Name"
              fullWidth
              variant="outlined"
            />
          </div>
          <Button>LOGIN</Button>
        </div>
        <div>
          <div>
            <img src={moonCloudFast} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
