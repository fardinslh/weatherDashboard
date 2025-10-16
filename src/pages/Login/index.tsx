import { useState } from "react";
import { Box, Button, CircularProgress, MenuItem, TextField, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moonCloudFast from "src/assets/moonCloudFast.png";
import moonCloudMid from "src/assets/moonCloudMid.png";
import sunCloudAngled from "src/assets/sunCloudAngled.png";

type LoginFormValues = {
  name: string;
};

const defaultValues: LoginFormValues = { name: "" };

function Login(): React.ReactNode {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ defaultValues });

  const onSubmit = async (values: LoginFormValues) => {
    if (!values.name.trim()) {
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    navigate("/dashboard");
  };

  const languageValue = i18n.language.startsWith("fa") ? "fa" : "en";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        backgroundColor: theme.palette.background.default,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", md: 960 },
          height: { xs: "auto", md: 560 },
          flexDirection: { xs: "column", md: "row" },
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          overflow: "hidden",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: { xs: "100%", md: "50%" },
            p: { xs: 4, md: "60px" },
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Box
            sx={{
              fontWeight: 700,
              fontSize: "26px",
              textAlign: "center",
              color: theme.palette.text.primary,
              mt: { xs: 2, md: "42px" },
            }}
          >
            {t("auth.title")}
          </Box>

          <Controller
            name="name"
            control={control}
            rules={{
              required: t("auth.nameRequired"),
              minLength: { value: 2, message: t("auth.nameMinLength") },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t("auth.enterName")}
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
                }}
              />
            )}
          />

          <Button
            type="submit"
            disabled={loading || isSubmitting}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.info.main,
              color: "#FFFFFF",
              textTransform: "uppercase",
              fontSize: "16px",
              fontWeight: 500,
              py: 1.5,
              "&:hover": { backgroundColor: theme.palette.info.dark },
              "&:disabled": {
                backgroundColor: theme.palette.grey[300],
              },
            }}
          >
            {loading || isSubmitting ? (
              <CircularProgress size={20} sx={{ color: "#FFFFFF" }} />
            ) : (
              t("auth.submit")
            )}
          </Button>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            backgroundColor: theme.palette.extra.accent1,
            position: "relative",
            minHeight: { xs: 260, md: "100%" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: 24, md: 45 },
              right: { xs: 24, md: 56 },
              filter: "drop-shadow(-13px 51px 25px rgba(18, 6, 67, 0.45))",
            }}
          >
            <img src={moonCloudMid} alt="cloud" style={{ width: 198 }} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              left: { xs: 20, md: 25 },
              top: { xs: 120, md: 162 },
              filter: "drop-shadow(-13px 51px 25px rgba(18, 6, 67, 0.45))",
            }}
          >
            <img src={sunCloudAngled} alt="cloud" style={{ width: 198 }} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: 24, md: 60 },
              right: { xs: 24, md: 45 },
              filter: "drop-shadow(-13px 51px 25px rgba(18, 6, 67, 0.45))",
            }}
          >
            <img src={moonCloudFast} alt="cloud" style={{ width: 198 }} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: 220 }}>
        <TextField
          select
          fullWidth
          variant="standard"
          label={t("auth.language")}
          value={languageValue}
          onChange={(event) => {
            const value = event.target.value;
            void i18n.changeLanguage(value);
          }}
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
          <MenuItem value="en">{t("auth.languageOptions.en")}</MenuItem>
          <MenuItem value="fa">{t("auth.languageOptions.fa")}</MenuItem>
        </TextField>
      </Box>
    </Box>
  );
}

export default Login;




