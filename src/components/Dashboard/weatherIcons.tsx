import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import Sun from "src/components/icons/Sun";
import Storm from "src/components/icons/Storm";
import RainCloud from "src/components/icons/RainCloud";
import SunCloud from "src/components/icons/SunCloud";

export const getWeatherIcon = (
  description: string,
  size = 72,
): React.ReactNode => {
  const normalized = description.toLowerCase();

  if (normalized.includes("clear")) {
    return <Sun />;
  }

  if (normalized.includes("thunder")) {
    return <Storm />;
  }

  if (
    normalized.includes("rain") ||
    normalized.includes("drizzle") ||
    normalized.includes("shower")
  ) {
    return <RainCloud />;
  }

  if (normalized.includes("snow")) {
    return <AcUnitOutlinedIcon sx={{ fontSize: size, color: "#93c5fd" }} />;
  }

  if (normalized.includes("fog") || normalized.includes("mist")) {
    return <SunCloud />;
  }

  return <SunCloud />;
};
