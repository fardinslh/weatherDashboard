import { Suspense, lazy, useMemo, useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WeatherIcon from "src/components/icons/Weather";
import { useTranslation } from "react-i18next";
import type { DailyForecast, MonthlyPoint } from "src/types/DashboardPage";
import DashboardSettingsMenu from "src/components/Dashboard/SettingsMenu";
import TodayOverviewCard from "src/components/Dashboard/TodayOverviewCard";

const MonthlyTemperatureChart = lazy(
  () => import("src/components/Dashboard/MonthlyTemperatureChart"),
);
const ForecastScroller = lazy(
  () => import("src/components/Dashboard/ForecastScroller"),
);
import DashboardFooter from "src/components/Dashboard/DashboardFooter";
import i18n from "i18next";

type GeocodeResult = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

type CurrentWeather = {
  timestamp: number;
  temperature: number;
  feelsLike: number;
  description: string;
  code: number | null;
};

const FORECAST_DAYS = 14;

const formatDate = (
  value: string | number | Date,
  options?: Intl.DateTimeFormatOptions,
) => {
  const date =
    value instanceof Date
      ? value
      : new Date(typeof value === "number" ? value : Date.parse(value));
  return new Intl.DateTimeFormat(i18n.language, options).format(date);
};

const formatTemperatureValue = (temperature: number | null | undefined) => {
  if (
    temperature === null ||
    temperature === undefined ||
    Number.isNaN(temperature)
  ) {
    return i18n.t("common.notAvailable");
  }

  return `${Math.round(temperature)}`;
};

const formatTemperatureWithUnit = (temperature: number | null | undefined) => {
  const value = formatTemperatureValue(temperature);
  if (value === i18n.t("common.notAvailable")) {
    return value;
  }

  return i18n.t("common.temperatureWithUnit", { value });
};

const describeWeatherCode = (code: number | null | undefined): string => {
  if (code === null || code === undefined) {
    return i18n.t("common.notAvailable");
  }

  const weatherCodeKeys = {
    0: "weatherCodes.0",
    1: "weatherCodes.1",
    2: "weatherCodes.2",
    3: "weatherCodes.3",
    45: "weatherCodes.45",
    48: "weatherCodes.48",
    51: "weatherCodes.51",
    53: "weatherCodes.53",
    55: "weatherCodes.55",
    56: "weatherCodes.56",
    57: "weatherCodes.57",
    61: "weatherCodes.61",
    63: "weatherCodes.63",
    65: "weatherCodes.65",
    66: "weatherCodes.66",
    67: "weatherCodes.67",
    71: "weatherCodes.71",
    73: "weatherCodes.73",
    75: "weatherCodes.75",
    77: "weatherCodes.77",
    80: "weatherCodes.80",
    81: "weatherCodes.81",
    82: "weatherCodes.82",
    85: "weatherCodes.85",
    86: "weatherCodes.86",
    95: "weatherCodes.95",
    96: "weatherCodes.96",
    99: "weatherCodes.99",
  } as const;

  type WeatherCodeKey = (typeof weatherCodeKeys)[keyof typeof weatherCodeKeys];

  const key =
    weatherCodeKeys[code as keyof typeof weatherCodeKeys] ??
    "weatherCodes.unknown";

  return i18n.t(key as WeatherCodeKey);
};

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState<GeocodeResult | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null,
  );
  const [forecastDays, setForecastDays] = useState<DailyForecast[]>([]);
  const [monthlySeries, setMonthlySeries] = useState<MonthlyPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const { t, i18n: i18nInstance } = useTranslation();

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError(t("dashboard.errors.emptySearch"));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const geocodeResponse = await axios.get<{
        results?: Array<{
          id: number;
          name: string;
          country: string;
          admin1?: string;
          latitude: number;
          longitude: number;
        }>;
      }>("https://geocoding-api.open-meteo.com/v1/search", {
        params: {
          name: searchTerm.trim(),
          count: 1,
          language: i18nInstance.language.startsWith("fa") ? "fa" : "en",
          format: "json",
        },
      });

      const [geoMatch] = geocodeResponse.data.results ?? [];
      if (!geoMatch) {
        setError(t("dashboard.errors.locationNotFound"));
        return;
      }

      const normalizedLocation: GeocodeResult = {
        name: geoMatch.name,
        lat: geoMatch.latitude,
        lon: geoMatch.longitude,
        country: geoMatch.country,
        state: geoMatch.admin1,
      };

      setLocation(normalizedLocation);

      const forecastResponse = await axios.get<{
        current?: {
          time: string;
          temperature_2m: number;
          apparent_temperature: number;
          weather_code: number;
        };
        daily?: {
          time: string[];
          temperature_2m_mean: Array<number | null>;
          temperature_2m_min: Array<number | null>;
          temperature_2m_max: Array<number | null>;
          weather_code: Array<number | null>;
        };
      }>("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude: normalizedLocation.lat,
          longitude: normalizedLocation.lon,
          current: "temperature_2m,apparent_temperature,weather_code",
          daily:
            "temperature_2m_mean,temperature_2m_min,temperature_2m_max,weather_code",
          timezone: "auto",
          forecast_days: FORECAST_DAYS,
        },
      });

      const current = forecastResponse.data.current;
      const dailyForecast = forecastResponse.data.daily;

      if (current) {
        setCurrentWeather({
          timestamp: Date.parse(current.time),
          temperature: current.temperature_2m,
          feelsLike: current.apparent_temperature,
          description: describeWeatherCode(current.weather_code),
          code: current.weather_code ?? null,
        });
      }

      if (dailyForecast) {
        const forecastData: DailyForecast[] = dailyForecast.time.map(
          (time, index) => ({
            time,
            mean: dailyForecast.temperature_2m_mean?.[index] ?? null,
            min: dailyForecast.temperature_2m_min?.[index] ?? null,
            max: dailyForecast.temperature_2m_max?.[index] ?? null,
            description: describeWeatherCode(
              dailyForecast.weather_code?.[index],
            ),
            code: dailyForecast.weather_code?.[index] ?? null,
          }),
        );
        setForecastDays(forecastData);
      }

      const end = new Date();
      const start = new Date();
      start.setFullYear(end.getFullYear() - 1);
      const formatISO = (d: Date) => d.toISOString().split("T")[0];

      const archiveResponse = await axios.get<{
        daily?: {
          time: string[];
          temperature_2m_mean: Array<number | null>;
          weather_code: Array<number | null>;
        };
      }>("https://archive-api.open-meteo.com/v1/archive", {
        params: {
          latitude: normalizedLocation.lat,
          longitude: normalizedLocation.lon,
          daily: "temperature_2m_mean,weather_code",
          timezone: "auto",
          start_date: formatISO(start),
          end_date: formatISO(end),
        },
      });

      const dailyArchive = archiveResponse.data.daily;

      if (dailyArchive) {
        const buckets = new Map<
          string,
          { sum: number; count: number; label: string; sample: string }
        >();

        dailyArchive.time.forEach((time, index) => {
          const temp = dailyArchive.temperature_2m_mean?.[index];
          const date = new Date(time);
          const key = `${date.getFullYear()}-${date.getMonth()}`;
          const label = formatDate(date, { month: "short", year: "numeric" });

          if (!buckets.has(key)) {
            buckets.set(key, { sum: 0, count: 0, label, sample: time });
          }

          const bucket = buckets.get(key);
          if (!bucket || temp === null || Number.isNaN(temp)) return;

          bucket.sum += temp;
          bucket.count += 1;
        });

        const monthlyPoints = Array.from(buckets.values())
          .filter((bucket) => bucket.count > 0)
          .map((bucket) => ({
            label: bucket.label,
            temperature: bucket.sum / bucket.count,
            timestamp: Date.parse(bucket.sample),
          }))
          .sort((a, b) => a.timestamp - b.timestamp);

        setMonthlySeries(monthlyPoints);
      } else {
        setMonthlySeries([]);
      }
    } catch {
      setError(t("dashboard.errors.loadFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const locationLabel = useMemo(() => {
    if (!location) {
      return t("dashboard.title");
    }

    return location.name;
  }, [location, t]);

  const todaysDetails = useMemo(() => {
    if (!currentWeather) {
      return null;
    }

    return {
      dayName: formatDate(currentWeather.timestamp, { weekday: "long" }),
      date: formatDate(currentWeather.timestamp, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: formatDate(currentWeather.timestamp, {
        hour: "numeric",
        minute: "2-digit",
      }),
      description: describeWeatherCode(currentWeather.code),
      temperature: formatTemperatureWithUnit(currentWeather.temperature),
      feelsLike: formatTemperatureValue(currentWeather.feelsLike),
      code: currentWeather.code,
    };
  }, [currentWeather, i18nInstance.language, t]);

  const todayForecast = forecastDays[0];
  const todayHighLow = todayForecast
    ? {
        high: formatTemperatureValue(todayForecast.max),
        low: formatTemperatureValue(todayForecast.min),
      }
    : null;

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: 2,
          px: "24px",
          py: "16px",
          boxShadow: "0px 4px 10px 0px rgba(166, 165, 165, 0.15)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              maxWidth: 56,
              maxHeight: 56,
            }}
          >
            <WeatherIcon />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={400}
              letterSpacing={0.15}
            >
              {t("dashboard.title")}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <TextField
            label={t("dashboard.searchLabel")}
            placeholder={t("dashboard.searchPlaceholder")}
            size="small"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            disabled={isLoading}
            sx={{
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.neutral[600]
                  : theme.palette.neutral[300],
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={t("dashboard.ariaSearchButton")}
                      onClick={handleSearch}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <CircularProgress size={18} />
                      ) : (
                        <SearchIcon color="action" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <DashboardSettingsMenu />
        </Box>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      <Box
        sx={{
          width: "100%",
          mx: "auto",
          pt: "28px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 3, lg: 4 },
            px: "24px",
          }}
        >
          <TodayOverviewCard
            locationLabel={locationLabel}
            overview={todaysDetails}
            highLow={todayHighLow}
          />
          <Suspense fallback={null}>
            <MonthlyTemperatureChart series={monthlySeries} />
          </Suspense>
        </Box>

        <Suspense fallback={null}>
          <Box
            sx={{
              px: "24px",
              mt: "-2px",
            }}
          >
            <ForecastScroller days={forecastDays} />
          </Box>
        </Suspense>

        <Box sx={{ mt: "auto" }}>
          <DashboardFooter />
        </Box>
      </Box>
    </Box>
  );
}
