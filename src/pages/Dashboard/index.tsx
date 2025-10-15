import { useMemo, useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Card,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

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
};

type DailyForecast = {
  time: string;
  mean: number | null;
  min: number | null;
  max: number | null;
  description: string;
};

type MonthlyPoint = {
  label: string;
  temperature: number;
  timestamp: number;
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
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const formatTemperature = (temperature: number | null | undefined) => {
  if (
    temperature === null ||
    temperature === undefined ||
    Number.isNaN(temperature)
  ) {
    return "N/A";
  }

  return `${Math.round(temperature)} deg C`;
};

const describeWeatherCode = (code: number | null | undefined) => {
  if (code === null || code === undefined) {
    return "N/A";
  }

  const mapping: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return mapping[code] ?? "Unknown conditions";
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

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a location.");
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
          language: "en",
          format: "json",
        },
      });

      const [geoMatch] = geocodeResponse.data.results ?? [];

      if (!geoMatch) {
        setError(
          "Location not found. Try a city and country code, e.g. London,GB.",
        );
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

      const weatherResponse = await axios.get<{
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
          forecast_days: 16,
          past_days: 90,
        },
      });

      const current = weatherResponse.data.current;
      const daily = weatherResponse.data.daily;

      if (current) {
        setCurrentWeather({
          timestamp: Date.parse(current.time),
          temperature: current.temperature_2m,
          feelsLike: current.apparent_temperature,
          description: describeWeatherCode(current.weather_code),
        });
      } else {
        setCurrentWeather(null);
      }

      if (daily) {
        const dailyData: DailyForecast[] = daily.time.map((time, index) => ({
          time,
          mean: daily.temperature_2m_mean?.[index] ?? null,
          min: daily.temperature_2m_min?.[index] ?? null,
          max: daily.temperature_2m_max?.[index] ?? null,
          description: describeWeatherCode(daily.weather_code?.[index]),
        }));

        setForecastDays(dailyData.slice(-FORECAST_DAYS));

        const buckets = new Map<
          string,
          { sum: number; count: number; label: string; sample: string }
        >();

        dailyData.forEach((entry) => {
          const date = new Date(entry.time);
          const key = `${date.getFullYear()}-${date.getMonth()}`;
          const label = formatDate(date, { month: "short", year: "numeric" });

          if (!buckets.has(key)) {
            buckets.set(key, { sum: 0, count: 0, label, sample: entry.time });
          }

          const bucket = buckets.get(key);
          if (!bucket || entry.mean === null || Number.isNaN(entry.mean)) {
            return;
          }

          bucket.sum += entry.mean;
          bucket.count += 1;
        });

        const monthlyPoints = Array.from(buckets.values())
          .filter((bucket) => bucket.count > 0)
          .map((bucket) => ({
            label: bucket.label,
            temperature: bucket.sum / bucket.count,
            timestamp: Date.parse(bucket.sample),
          }))
          .sort((a, b) => a.timestamp - b.timestamp)
          .slice(-6);

        setMonthlySeries(monthlyPoints);
      } else {
        setForecastDays([]);
        setMonthlySeries([]);
      }
    } catch {
      setError("Unable to load weather data right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const locationLabel = useMemo(() => {
    if (!location) {
      return "Weather Dashboard";
    }

    const parts = [location.name];
    if (location.state) {
      parts.push(location.state);
    }
    parts.push(location.country);

    return parts.filter(Boolean).join(", ");
  }, [location]);

  const todaysDetails = useMemo(() => {
    if (!currentWeather) {
      return null;
    }

    return {
      date: formatDate(currentWeather.timestamp, {
        weekday: "long",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
      description: currentWeather.description,
      temperature: formatTemperature(currentWeather.temperature),
      feelsLike: formatTemperature(currentWeather.feelsLike),
    };
  }, [currentWeather]);

  return <div>dashboard</div>;
}
