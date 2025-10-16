import { useEffect, useMemo, useRef } from "react";
import { Box, Card, Typography, useTheme } from "@mui/material";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import type { CallbackDataParams } from "echarts/types/dist/shared";
import type { MonthlyPoint } from "src/types/DashboardPage";
import ReactEChartsCore from "echarts-for-react";

type MonthlyTemperatureChartProps = {
  series: MonthlyPoint[];
};

type TooltipParam = CallbackDataParams & {
  axisValue?: string | number;
};

const DEGREE = String.fromCharCode(176);

const buildMonthLabel = (label: string) => {
  const [month] = label.split(" ");
  return month;
};

const MonthlyTemperatureChart = ({ series }: MonthlyTemperatureChartProps) => {
  const theme = useTheme();
  const chartRef = useRef<ReactEChartsCore>(null);

  const prepared = useMemo(() => {
    if (!series.length) {
      return {
        data: [] as number[],
        labels: [] as string[],
        min: 10,
        max: 40,
      };
    }

    const values = series.map((item) => Number(item.temperature ?? 0));
    const labels = series.map((item) => buildMonthLabel(item.label));

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const minAnchor = Math.min(10, Math.floor(minValue / 10) * 10);
    const maxAnchor = Math.max(40, Math.ceil(maxValue / 10) * 10);

    return {
      data: values,
      labels,
      min: minAnchor,
      max: maxAnchor,
    };
  }, [series]);

  const chartOptions: EChartsOption = useMemo(() => {
    const colors = ["#27C6F7", "#6F5BFF"];

    return {
      backgroundColor: "transparent",
      grid: {
        top: 10,
        right: 30,
        bottom: 23,
        left: 60,
      },
      xAxis: {
        type: "category",
        data: prepared.labels,
        boundaryGap: false,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color:
            theme.palette.mode === "dark"
              ? theme.palette.text.secondary
              : theme.palette.text.primary,
          fontWeight: 500,
          fontSize: 10,
          lineHeight: 16,
        },
      },
      yAxis: {
        type: "value",
        min: prepared.min,
        max: prepared.max,
        interval: 10,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color:
            theme.palette.mode === "dark"
              ? theme.palette.text.secondary
              : theme.palette.text.primary,
          fontWeight: 600,
          fontSize: 12,
          formatter: (value: number) => `${value}${DEGREE}C`,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#B8C7D8",
            type: "dashed",
          },
        },
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(23, 58, 122, 0.9)",
        borderRadius: 12,
        padding: [8, 12],
        textStyle: {
          color: "#FFFFFF",
          fontWeight: 600,
        },
        formatter: (params) => {
          const items = Array.isArray(params) ? params : [params];
          if (!items.length) {
            return "";
          }

          const first = items[0] as TooltipParam;
          const label =
            (first.axisValue as string | number | undefined) ??
            (typeof first.name === "string" ? first.name : "");
          const numericValue = Number(first.value);
          const formattedValue = Number.isFinite(numericValue)
            ? `${Math.round(numericValue)}${DEGREE}C`
            : "N/A";

          return `${label}<br/>${formattedValue}`;
        },
      },
      series: [
        {
          type: "line",
          data: prepared.data,
          smooth: false,
          lineStyle: {
            width: 4,
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: colors[0] },
                { offset: 1, color: colors[1] },
              ],
            },
          },
          areaStyle: {
            opacity: 0.7,
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(111, 91, 255, 0.28)" },
                { offset: 1, color: "rgba(39, 198, 247, 0.05)" },
              ],
            },
          },
          symbol: "none",
          emphasis: {
            focus: "series",
          },
          animationDuration: 800,
        },
      ],
    };
  }, [prepared]);

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();
    if (chart) {
      chart.dispose();
    }
  }, [theme.palette.mode]);

  return (
    <Card
      sx={{
        borderRadius: "24px",
        px: "16px",
        pt: "16px",
        pb: "25px",
        backgroundColor: theme.palette.neutral[200],
        boxShadow: "0px 22px 48px rgba(62, 92, 132, 0.16)",
        width: { lg: "60%", xs: "100%" },
        minHeight: "234px",
        maxHeight: "234px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          color: theme.palette.primary[900],
          letterSpacing: "0%",
          fontSize: "18px",
        }}
      >
        Average Monthly Temprature
      </Typography>

      <Box sx={{ height: "234px" }}>
        {prepared.data.length ? (
          <ReactECharts
            key={theme.palette.mode}
            option={chartOptions}
            style={{ width: "100%", height: "100%" }}
            opts={{ renderer: "canvas" }}
            notMerge
            ref={chartRef}
          />
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
            Waiting for monthly data...
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default MonthlyTemperatureChart;
