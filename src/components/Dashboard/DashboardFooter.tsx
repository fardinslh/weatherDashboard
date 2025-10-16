import { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import nadinLogo from "src/assets/nadinLogo.png";

const DashboardFooter = () => {
  const theme = useTheme();

  const now = useMemo(() => {
    const date = new Date();
    const time = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

    const dateLabel = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

    return {
      time,
      dateLabel,
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(90deg, #292F45 0%, #3F4861 62%, #151D32 100%)"
            : "linear-gradient(90deg, #f3faf3 0%, #ccdddd 62%, #f3faf3 100%)",
        px: "24px",
        py: "28px",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box>
          <img src={nadinLogo} width={50} height={50} />
        </Box>
        <Typography
          fontSize={14}
          fontWeight={400}
          lineHeight={"24px"}
          sx={{
            color: theme.palette.primary[900],
          }}
        >
          All rights of this site are reserved for Nadin Sadr Aria Engineering
          Company.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1.5, md: 3 },
          fontSize: 14,
          color: theme.palette.primary[900],
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <MailOutlineOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography
            sx={{ fontSize: 14 }}
            fontSize={14}
            fontWeight={400}
            lineHeight={"24px"}
          >
            contact us : info@nadin.ir
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography
            sx={{ fontSize: 14 }}
            fontSize={14}
            fontWeight={400}
            lineHeight={"24px"}
          >
            {now.time} . {now.dateLabel}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardFooter;
