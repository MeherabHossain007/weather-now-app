"use client";

import { useState } from "react";
import type { ForecastData, Units } from "@/types/weather";
import { WeatherIcon } from "./weather-icon";

interface HourlyForecastProps {
  forecast: ForecastData;
  units: Units;
}

export function HourlyForecast({ forecast }: HourlyForecastProps) {
  const [selectedDay, setSelectedDay] = useState(
    forecast.hourlyByDay[0]?.day || "Today"
  );

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  const selectedDayData = forecast.hourlyByDay.find(
    (day) => day.day === selectedDay
  );
  const hourlyData = selectedDayData?.hours || forecast.hourly;

  return (
    <div className="w-full mx-auto">
      <div className="bg-neutral-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-lg font-medium">Hourly forecast</h3>
          <div className="relative">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="bg-neutral-700/80 text-white rounded-xl px-4 py-2 text-sm font-medium appearance-none cursor-pointer border-0 outline-none min-w-[120px]"
            >
              {forecast.hourlyByDay.map((day) => (
                <option key={day.dayKey} value={day.day}>
                  {day.day}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Hourly items */}
        <div className="space-y-1">
          {hourlyData.map((hour, index) => (
            <div
              key={index}
              className="bg-neutral-700/50 rounded-2xl p-4 flex items-center justify-between hover:bg-neutral-700/70 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8">
                  <WeatherIcon condition={hour.condition} size="sm" />
                </div>
                <span className="text-white font-medium text-base">
                  {formatTime(hour.time)}
                </span>
              </div>
              <span className="text-white font-semibold text-lg">
                {hour.temperature}°
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
