import { Button, TextField, Box, useTheme, MenuItem } from "@mui/material";
import moonCloudFast from "src/assets/moonCloudFast.png";
import moonCloudMid from "src/assets/moonCloudMid.png";
import sunCloudAngled from "src/assets/sunCloudAngled.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

type LoginFormValues = {
  name: string;
};

const defaultValues: LoginFormValues = { name: "" };

function Login(): React.ReactNode {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ defaultValues });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    if (!values.name.trim()) {
      return;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 1200);
    });

    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "960px",
          height: "560px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "16px",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            width: "50%",
            paddingLeft: "60px",
            paddingRight: "60px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                fontWeight: 700,
                fontSize: "25.63px",
                textAlign: "center",
                marginBottom: "32px",
                marginTop: "102px",
                color: theme.palette.text.primary,
              }}
            >
              {t("login")}
            </Box>
            <Controller
              name="name"
              control={control}
              rules={{
                required: t("nameRequired"),
                minLength: {
                  value: 2,
                  message: t("nameMinLength"),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder={t("enterName")}
                  fullWidth
                  variant="outlined"
                  size="medium"
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: theme.palette.text.primary,
                      "& fieldset": {
                        borderColor:
                          theme.palette.mode === "dark"
                            ? theme.palette.neutral[600]
                            : theme.palette.neutral[300],
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: theme.palette.text.secondary,
                      opacity: 0.7,
                    },
                  }}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "102px",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              loading={loading}
              sx={{
                backgroundColor: theme.palette.info.main,
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: theme.palette.info.dark,
                },
                textTransform: "uppercase",
                fontSize: "16px",
                fontWeight: 500,
                padding: "10px 24px",
                width: "100%",
                "&:disabled": {
                  backgroundColor: theme.palette.grey[300],
                },
              }}
            >
              {t("login")}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            minWidth: "50%",
            maxWidth: "50%",
            backgroundColor: theme.palette.extra.accent1,
            height: "100%",
            overflow: "hidden",
            borderTopRightRadius: "16px",
            borderBottomRightRadius: "16px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "45px",
              right: "56px",
              filter: "drop-shadow(-13px 51px 25px rgba(18, 6, 67, 0.45))",
            }}
          >
            <img
              src={moonCloudMid}
              alt="cloud"
              style={{
                maxWidth: "198px",
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              left: "25px",
              top: "162px",
              filter: "drop-shadow(-13px 51px 25px rgba(18, 6, 67, 0.45))",
            }}
          >
            <img
              src={sunCloudAngled}
              alt="cloud"
              style={{
                maxWidth: "198px",
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "60px",
              right: "45px",
              filter: "drop-shadow(-13px 51px 25px rgba(18, 6, 67, 0.45))",
            }}
          >
            <img
              src={moonCloudFast}
              alt="cloud"
              style={{
                maxWidth: "198px",
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "220px",
        }}
      >
        <TextField
          select
          fullWidth
          variant="standard"
          label={t("language")}
          defaultValue="en"
          slotProps={{
            inputLabel: {
              shrink: true,
              sx: {
                fontSize: "12px",
                color: theme.palette.text.secondary,
              },
            },
          }}
          sx={{
            "& .MuiInputBase-root": {
              fontSize: "18px",
              color: theme.palette.text.primary,
            },
            "& .MuiInputBase-root::before": {
              borderBottomColor:
                theme.palette.mode === "dark"
                  ? theme.palette.neutral[600]
                  : theme.palette.neutral[300],
            },
            "& .MuiInputBase-root:hover:not(.Mui-disabled)::before": {
              borderBottomColor: theme.palette.primary.main,
            },
          }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fa">فارسی</MenuItem>
        </TextField>
      </Box>
    </Box>
  );
}

export default Login;
