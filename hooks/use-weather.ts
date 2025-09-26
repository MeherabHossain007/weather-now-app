"use client";

import { useState, useCallback, useEffect } from "react";
import type { WeatherData, ForecastData, Units } from "@/types/weather";
import { fetchWeatherData, fetchForecastData } from "@/lib/weather-api";

export function useWeather() {
  // Core data state
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  // UI state management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noResults, setNoResults] = useState(false);

  // User preferences and search tracking
  const [units, setUnits] = useState<Units>("metric");
  const [lastSearchedCity, setLastSearchedCity] = useState<string | null>(null);

  const searchWeather = useCallback(
    async (city: string) => {
      // Early return if no city provided
      if (!city.trim()) return;

      // Reset all states before new search
      setLoading(true);
      setError(null);
      setNoResults(false);
      setLastSearchedCity(city);

      try {
        // Fetch weather and forecast data concurrently for better performance
        const [weather, forecast] = await Promise.all([
          fetchWeatherData(city, units),
          fetchForecastData(city, units),
        ]);

        // Update state with successful results
        setWeatherData(weather);
        setForecastData(forecast);
      } catch (err: any) {
        console.error("API failed:", err);

        // Handle different error types
        if (
          err.message?.includes("404") ||
          err.message?.includes("not found")
        ) {
          setNoResults(true);
          setWeatherData(null);
          setForecastData(null);
        } else {
          setError("Failed to fetch weather data. Please try again.");
          setWeatherData(null);
          setForecastData(null);
        }
      } finally {
        setLoading(false);
      }
    },
    [units]
  );

  useEffect(() => {
    if (lastSearchedCity && weatherData) {
      searchWeather(lastSearchedCity);
    }
  }, [units]);

  const clearError = useCallback(() => {
    setError(null);
    setNoResults(false);
  }, []);

  const retrySearch = useCallback(() => {
    setError(null);
    setNoResults(false);
  }, []);

  // Return all state and actions for consuming components
  return {
    // Data state
    weatherData,
    forecastData,

    // UI state
    loading,
    error,
    noResults,

    // Settings
    units,
    setUnits,

    // Actions
    searchWeather,
    clearError,
    retrySearch,
  };
}
