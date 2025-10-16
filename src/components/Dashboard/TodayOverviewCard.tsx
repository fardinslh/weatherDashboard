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
        px: "24px",
        py: "20px",
        bgcolor: theme.palette.neutral[200],
        boxShadow: "0px 20px 45px rgba(79, 114, 150, 0.18)",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "center" },
        gap: { xs: 3, md: 7 },
        minHeight: 220,
        maxWidth: { lg: "40%" },
        flex: 1,
        height: "234px",
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
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 0.6,
                borderRadius: "999px",
                backgroundColor: "#CDD9E0",
                boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.65)",
                justifyContent: "space-between",
                width: "max-content",
              }}
            >
              <PlaceOutlinedIcon
                sx={{
                  fontSize: 16,
                  color: "#2B4862",
                }}
              />
              <Typography
                variant="body2"
                fontWeight={400}
                sx={{ color: "#3D4852", letterSpacing: 0.1 }}
              >
                {locationLabel}
              </Typography>
            </Box>

            <Box>
              <Typography
                fontWeight={500}
                sx={{
                  color: theme.palette.primary[900],
                  fontSize: "32px",
                  lineHeight: "100%",
                }}
              >
                {overview.dayName}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  color: theme.palette.primary[900],
                  mt: "4px",
                }}
              >
                <Typography
                  sx={{ fontWeight: 400, letterSpacing: 0, fontSize: "14px" }}
                >
                  {overview.date}
                </Typography>
                <Typography
                  sx={{ fontWeight: 400, letterSpacing: 0, fontSize: "14px" }}
                >
                  {overview.time}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography
                fontWeight={500}
                sx={{
                  color: theme.palette.primary[900],
                  fontSize: "40px",
                  lineHeight: 1.1,
                }}
              >
                {overview.temperature}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 0.75,
                  color: theme.palette.primary[900],
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
              gap: "8px",
              width: { xs: "100%", md: 180 },
              "& svg": {
                width: { xs: 130, md: 160 },
                height: "auto",
                maxHeight: "115px",
              },
            }}
          >
            {icon}
            <Typography
              fontWeight={400}
              sx={{
                color: theme.palette.primary[900],
                textAlign: "left",
                fontSize: "28px",
                lineHeight: 1.2,
                width: "100%",
              }}
            >
              {overview.description}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.primary[900],
                fontWeight: 400,
                textAlign: "left",
                letterSpacing: 0,
                fontSize: "16px",
                width: "100%",
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
