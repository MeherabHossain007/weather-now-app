"use client";
import type { WeatherData, Units } from "@/types/weather";
import { useMemo } from "react";

interface WeatherStatsProps {
  weather: WeatherData;
  units: Units;
}

interface StatItem {
  label: string;
  value: string;
}

const UNIT_CONFIG = {
  metric: { wind: "km/h", precipitation: "mm" },
  imperial: { wind: "mph", precipitation: "in" },
} as const;

export function WeatherStats({ weather, units }: WeatherStatsProps) {
  const stats = useMemo((): StatItem[] => {
    const unitConfig = UNIT_CONFIG[units];

    return [
      { label: "Feels Like", value: `${weather.feelsLike}°` },
      { label: "Humidity", value: `${weather.humidity}%` },
      { label: "Wind", value: `${weather.windSpeed} ${unitConfig.wind}` },
      { label: "Precipitation", value: `0 ${unitConfig.precipitation}` },
    ];
  }, [weather.feelsLike, weather.humidity, weather.windSpeed, units]);

  const baseClasses =
    "bg-neutral-800 border border-neutral-600 rounded-12 p-5 flex flex-col gap-6";

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(({ label, value }) => (
        <div key={label} className={baseClasses}>
          <p className="text-white text-lg mb-1">{label}</p>
          <p className="text-3xl">{value}</p>
        </div>
      ))}
    </div>
  );
}
