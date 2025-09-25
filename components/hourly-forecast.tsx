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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      <div className="bg-neutral-800 border border-neutral-600 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-lg font-medium">Hourly forecast</h3>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-neutral-700 text-white rounded-lg px-4 py-2 text-sm font-medium cursor-pointer flex items-center justify-between w-[140px]"
            >
              <span>{selectedDay}</span>
              <svg
                className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
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
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 w-[140px] bg-neutral-800 border border-neutral-600 rounded-lg p-2 shadow-xl z-10">
                <ul className="text-white">
                  {forecast.hourlyByDay.map((day) => (
                    <li
                      key={day.dayKey}
                      onClick={() => {
                        setSelectedDay(day.day);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-2 py-2.5 cursor-pointer hover:bg-neutral-700 rounded-8`}
                    >
                      {day.day}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Hourly items */}
        <div className="space-y-4">
          {hourlyData.map((hour, index) => (
            <div
              key={index}
              className="bg-neutral-700 border border-neutral-600 rounded-2xl p-4 flex items-center justify-between hover:bg-neutral-600 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center">
                  <WeatherIcon condition={hour.condition} size="md" />
                </div>
                <span className="text-white font-medium text-xl">
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
