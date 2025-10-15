import type { ReactNode } from "react";
import { Box, Card, Typography, useTheme } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { getWeatherIcon } from "./weatherIcons";

type TodayOverview = {
  dayName: string;
  date: string;
  time: string;
  temperature: string;
  description: string;
  feelsLike: string;
};

type TodayOverviewCardProps = {
  locationLabel: string;
  overview: TodayOverview | null;
  highLow?: { high: string; low: string } | null;
};

function TodayOverviewCard({
  locationLabel,
  overview,
  highLow,
}: TodayOverviewCardProps): React.ReactNode {
  let icon: ReactNode = null;
  if (overview) {
    icon = getWeatherIcon(overview.description);
  }

  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: "28px",
        px: { xs: 3, md: 4.5 },
        py: { xs: 3, md: 4 },
        bgcolor: theme.palette.neutral[200],
        boxShadow: "0px 20px 45px rgba(79, 114, 150, 0.18)",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "center" },
        gap: { xs: 3, md: 7 },
        minHeight: 220,
      }}
    >
      {overview ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2.25, md: 2.75 },
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 0.6,
                borderRadius: "999px",
                backgroundColor: "#D0DCE8",
                boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.65)",
              }}
            >
              <PlaceOutlinedIcon sx={{ fontSize: 16, color: "#2B4862" }} />
              <Typography
                variant="body2"
                fontWeight={400}
                sx={{ color: theme.palette.primary[900], letterSpacing: 0.1 }}
              >
                {locationLabel}
              </Typography>
            </Box>

            <Box>
              <Typography
                fontWeight={600}
                sx={{
                  color: theme.palette.primary[900],
                  fontSize: { xs: "1.75rem", md: "2.05rem" },
                  lineHeight: 1.1,
                }}
              >
                {overview.dayName}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2.5,
                  color: "#3F5F7F",
                  mt: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, letterSpacing: 0.1 }}
                >
                  {overview.date}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, letterSpacing: 0.1 }}
                >
                  {overview.time}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography
                variant="h2"
                fontWeight={700}
                sx={{
                  color: theme.palette.primary[900],
                  fontSize: { xs: "2.6rem", md: "3.2rem" },
                  lineHeight: 1.1,
                }}
              >
                {overview.temperature}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 0.75,
                  color: "#3F5F7F",
                  fontWeight: 500,
                  letterSpacing: 0.1,
                }}
              >
                High: {highLow?.high ?? "N/A"} Low: {highLow?.low ?? "N/A"}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              gap: 1.5,
              width: { xs: "100%", md: 180 },
              "& svg": {
                width: { xs: 130, md: 160 },
                height: "auto",
              },
            }}
          >
            {icon}
            <Typography
              variant="h4"
              fontWeight={600}
              sx={{
                color: theme.palette.primary[900],
                textAlign: "center",
                fontSize: { xs: "1.5rem", md: "1.75rem" },
                lineHeight: 1.2,
              }}
            >
              {overview.description}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#3F5F7F",
                fontWeight: 500,
                textAlign: "center",
                letterSpacing: 0.1,
              }}
            >
              Feels Like {overview.feelsLike}
            </Typography>
          </Box>
        </>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Search for a city to see the current conditions.
        </Typography>
      )}
    </Card>
  );
}

export default TodayOverviewCard;
