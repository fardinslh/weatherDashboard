import { Button, TextField } from "@mui/material";
import styles from "./login.module.scss";
import moonCloudFast from "src/assets/moonCloudFast.png";
import moonCloudMid from "src/assets/moonCloudMid.png";
import sunCloudAngled from "src/assets/sunCloudAngled.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Login(): React.ReactNode {
  const [name, setName] = useState<string>("");
  const { t } = useTranslation();

  function handleLogin(): void {}

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.login}>
          <div className={styles.loginText}>{t("login")}</div>
          <div>
            <TextField
              placeholder={t("enterName")}
              fullWidth
              variant="outlined"
            />
          </div>
          <Button>{t("login")}</Button>
        </div>
        <div className={styles.clouds}>
          <div className={styles.topCloud}>
            <img src={moonCloudMid} className={styles.cloud} />
          </div>
          <div className={styles.midCloud}>
            <img src={sunCloudAngled} className={styles.cloud} />
          </div>
          <div className={styles.bottomCloud}>
            <img src={moonCloudFast} className={styles.cloud} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
