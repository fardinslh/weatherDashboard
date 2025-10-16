import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import Sun from "src/components/icons/Sun";
import Storm from "src/components/icons/Storm";
import RainCloud from "src/components/icons/RainCloud";
import SunCloud from "src/components/icons/SunCloud";

const rainCodes = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82]);
const snowCodes = new Set([71, 73, 75, 77, 85, 86]);
const thunderCodes = new Set([95, 96, 99]);
const fogCodes = new Set([45, 48]);
const clearCodes = new Set([0, 1, 2]);
const cloudCodes = new Set([3]);

export const getWeatherIcon = (
  description: string,
  size = 72,
  code?: number | null,
): React.ReactNode => {
  const normalized = description.toLowerCase();
  const dimension = { width: `${size}`, height: `${size}` };

  const categoryFromCode = () => {
    if (code === null || code === undefined) {
      return null;
    }
    if (clearCodes.has(code)) {
      return "clear";
    }
    if (cloudCodes.has(code)) {
      return "cloud";
    }
    if (fogCodes.has(code)) {
      return "fog";
    }
    if (rainCodes.has(code)) {
      return "rain";
    }
    if (snowCodes.has(code)) {
      return "snow";
    }
    if (thunderCodes.has(code)) {
      return "thunder";
    }
    return null;
  };

  const category =
    categoryFromCode() ??
    (normalized.includes("thunder")
      ? "thunder"
      : normalized.includes("snow")
        ? "snow"
        : normalized.includes("rain") ||
            normalized.includes("drizzle") ||
            normalized.includes("shower")
          ? "rain"
          : normalized.includes("fog") || normalized.includes("mist")
            ? "fog"
            : normalized.includes("clear")
              ? "clear"
              : normalized.includes("cloud")
                ? "cloud"
                : null);

  switch (category) {
    case "clear":
      return <Sun {...dimension} />;
    case "thunder":
      return <Storm {...dimension} />;
    case "rain":
      return <RainCloud {...dimension} />;
    case "snow":
      return <AcUnitOutlinedIcon sx={{ fontSize: size, color: "#93c5fd" }} />;
    case "fog":
      return <SunCloud {...dimension} />;
    case "cloud":
    default:
      return <SunCloud {...dimension} />;
  }
};
