export type MonthlyPoint = {
  label: string;
  temperature: number;
  timestamp: number;
};

export type DailyForecast = {
  time: string;
  mean: number | null;
  min: number | null;
  max: number | null;
  description: string;
  code?: number | null;
};
