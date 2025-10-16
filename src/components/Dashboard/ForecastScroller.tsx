import { useMemo, useRef, useState } from "react";
import { Box, Card, Typography, useTheme } from "@mui/material";
import { getWeatherIcon } from "./weatherIcons";
import type { DailyForecast } from "src/types/DashboardPage";

type ForecastScrollerProps = {
  days: DailyForecast[];
};

const DEGREE = String.fromCharCode(176);

const formatWeekday = (value: string, index: number) => {
  if (index === 0) {
    return "Today";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(new Date(value));
};

const formatTemperature = (value: number | null) => {
  if (value === null || Number.isNaN(value)) {
    return "N/A";
  }

  return `${Math.round(value)}${DEGREE}C`;
};

const ForecastScroller = ({ days }: ForecastScrollerProps) => {
  const theme = useTheme();

  const items = useMemo(() => days.slice(0, 14), [days]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragSnapshotRef = useRef({ startX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollerRef.current) {
      return;
    }

    setIsDragging(true);
    dragSnapshotRef.current = {
      startX: event.clientX,
      scrollLeft: scrollerRef.current.scrollLeft,
    };
    scrollerRef.current.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollerRef.current) {
      return;
    }

    const deltaX = event.clientX - dragSnapshotRef.current.startX;
    scrollerRef.current.scrollLeft =
      dragSnapshotRef.current.scrollLeft - deltaX;
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollerRef.current) {
      return;
    }

    scrollerRef.current.releasePointerCapture(event.pointerId);
    setIsDragging(false);
  };

  return (
    <Card
      sx={{
        borderRadius: "32px",
        px: { xs: 3, md: 4 },
        py: { xs: 3, md: 3.5 },
        backgroundColor: theme.palette.neutral[200],
        boxShadow: "0px 4px 10px 4px rgba(0, 0, 0, 0.15)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          color: theme.palette.primary[900],
          letterSpacing: 0,
          fontSize: "24px",
        }}
      >
        2 weeks Forecast
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          paddingY: 1,
          pr: 1,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: isDragging ? "none" : "auto",
        }}
        ref={scrollerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerLeave={stopDragging}
        onPointerCancel={stopDragging}
      >
        {days.length > 0 ? (
          items.map((day, index) => (
            <Box
              key={day.time}
              sx={{
                minWidth: 104,
                maxWidth: 104,
                borderRadius: "24px",
                backgroundColor: theme.palette.extra.accent2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                py: "45.5px",
                px: 2,
                gap: 1.5,
                height: 266,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary[900],
                    textTransform: "capitalize",
                    position: "relative",
                  }}
                >
                  {formatWeekday(day.time, index)}
                </Typography>

                <Box
                  sx={{
                    width: "100%",
                    height: 3,
                    borderRadius: 999,
                    backgroundImage:
                      "linear-gradient(90deg, rgba(54, 54, 54, 0) 0%, rgba(126, 126, 126, 1) 50%, rgba(54, 54, 54, 0) 100%)",
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.palette.text.primary,
                }}
              >
                {getWeatherIcon(day.description, 44)}
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.palette.primary[900],
                  letterSpacing: 0,
                  fontSize: "18px",
                }}
              >
                {formatTemperature(day.mean ?? day.max ?? day.min ?? null)}
              </Typography>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              color: theme.palette.text.secondary,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Waiting for 2 weeks data...
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default ForecastScroller;
