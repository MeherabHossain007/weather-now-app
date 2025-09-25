export type Units = "metric" | "imperial";

export interface WeatherData {
  id: number;
  name: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  condition: string;
  description: string;
  icon: string;
  timestamp: number;
}

export interface DailyForecast {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

export interface HourlyForecast {
  time: Date;
  temperature: number;
  condition: string;
  icon: string;
}

export interface HourlyByDay {
  day: string;
  dayKey: string;
  hours: HourlyForecast[];
}

export interface ForecastData {
  daily: DailyForecast[];
  hourly: HourlyForecast[];
  hourlyByDay: HourlyByDay[];
}
