import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import ThunderstormOutlinedIcon from "@mui/icons-material/ThunderstormOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";

export const getWeatherIcon = (
  description: string,
  size = 72,
): React.ReactNode => {
  const normalized = description.toLowerCase();

  if (normalized.includes("clear")) {
    return <WbSunnyRoundedIcon sx={{ fontSize: size, color: "#f7c948" }} />;
  }

  if (normalized.includes("thunder")) {
    return (
      <ThunderstormOutlinedIcon sx={{ fontSize: size, color: "#818cf8" }} />
    );
  }

  if (
    normalized.includes("rain") ||
    normalized.includes("drizzle") ||
    normalized.includes("shower")
  ) {
    return <OpacityOutlinedIcon sx={{ fontSize: size, color: "#60a5fa" }} />;
  }

  if (normalized.includes("snow")) {
    return <AcUnitOutlinedIcon sx={{ fontSize: size, color: "#93c5fd" }} />;
  }

  if (normalized.includes("fog") || normalized.includes("mist")) {
    return <GradingOutlinedIcon sx={{ fontSize: size, color: "#a5b4fc" }} />;
  }

  return <CloudOutlinedIcon sx={{ fontSize: size, color: "#94a3b8" }} />;
};
