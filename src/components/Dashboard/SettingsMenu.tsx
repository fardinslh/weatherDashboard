import { useState, type MouseEvent } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { setTheme } from "src/store/themeSlice";
import type { AppDispatch, RootState } from "src/store";
import { loginRoute } from "src/constants/routes";

const DashboardSettingsMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "fa">(
    i18n.language?.startsWith("fa") ? "fa" : "en",
  );

  const isOpen = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = (
    _event: MouseEvent<HTMLElement>,
    value: "light" | "dark" | null,
  ) => {
    if (!value || value === mode) {
      return;
    }
    dispatch(setTheme(value));
  };

  const handleLanguageChange = (
    _event: MouseEvent<HTMLElement>,
    value: "en" | "fa" | null,
  ) => {
    if (!value || value === activeLanguage) {
      return;
    }
    void i18n.changeLanguage(value);
    setActiveLanguage(value);
  };

  const handleExit = () => {
    setAnchorEl(null);
    navigate(loginRoute);
  };

  return (
    <>
      <IconButton
        aria-label="open settings"
        onClick={handleOpen}
        sx={{
          border: `1px solid ${isOpen ? "#6FB3FF" : "#d3e2f5"}`,
          backgroundColor: isOpen ? "#E8F3FF" : "white",
          borderRadius: "12px",
          width: 46,
          height: 46,
          boxShadow: isOpen
            ? "0 0 0 4px rgba(111, 179, 255, 0.28)"
            : "0 6px 14px rgba(97, 127, 167, 0.12)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "#E8F3FF",
            borderColor: "#6FB3FF",
          },
        }}
      >
        <SettingsIcon
          sx={{
            color: isOpen ? "#1C6DD0" : "#7d92ab",
            transition: "color 0.2s ease-in-out",
          }}
        />
      </IconButton>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          elevation: 6,
          sx: {
            borderRadius: "22px",
            boxShadow: "0px 28px 60px rgba(62, 92, 132, 0.18)",
            mt: 1.5,
            minWidth: 220,
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, color: "#2B3F57", letterSpacing: 0.2 }}
            >
              Mode
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={mode}
              onChange={handleModeChange}
              sx={{
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid #C8D7E6",
                "& .MuiToggleButtonGroup-grouped": { border: 0 },
              }}
              fullWidth
            >
              <ToggleButton
                value="light"
                sx={{
                  flex: 1,
                  gap: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#5C708C",
                  px: 1.5,
                  "&.Mui-selected": {
                    backgroundColor: "#E6F3FF",
                    color: "#1260B6",
                  },
                  "&:hover": { backgroundColor: "#EFF7FF" },
                }}
              >
                <LightModeOutlinedIcon sx={{ fontSize: 18 }} />
                Light
              </ToggleButton>
              <ToggleButton
                value="dark"
                sx={{
                  flex: 1,
                  gap: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#5C708C",
                  px: 1.5,
                  "&.Mui-selected": {
                    backgroundColor: "#E6F3FF",
                    color: "#1260B6",
                  },
                  "&:hover": { backgroundColor: "#EFF7FF" },
                }}
              >
                <DarkModeOutlinedIcon sx={{ fontSize: 18 }} />
                Dark
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Divider sx={{ borderColor: "#E0E8F2" }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, color: "#2B3F57", letterSpacing: 0.2 }}
            >
              Language
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={activeLanguage}
              onChange={handleLanguageChange}
              sx={{
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid #C8D7E6",
                "& .MuiToggleButtonGroup-grouped": { border: 0 },
              }}
              fullWidth
            >
              <ToggleButton
                value="en"
                sx={{
                  flex: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#5C708C",
                  "&.Mui-selected": {
                    backgroundColor: "#E6F3FF",
                    color: "#1260B6",
                  },
                  "&:hover": { backgroundColor: "#EFF7FF" },
                }}
              >
                En
              </ToggleButton>
              <ToggleButton
                value="fa"
                sx={{
                  flex: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#5C708C",
                  "&.Mui-selected": {
                    backgroundColor: "#E6F3FF",
                    color: "#1260B6",
                  },
                  "&:hover": { backgroundColor: "#EFF7FF" },
                }}
              >
                Fa
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Divider sx={{ borderColor: "#E0E8F2" }} />

          <Button
            onClick={handleExit}
            startIcon={<LogoutOutlinedIcon sx={{ fontSize: 20 }} />}
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              fontWeight: 600,
              color: "#1D5DAA",
              "&:hover": { backgroundColor: "rgba(29, 93, 170, 0.08)" },
            }}
          >
            Exit
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default DashboardSettingsMenu;
