"use client"

import { useState, useCallback } from "react"
import type { WeatherData, ForecastData, Units } from "@/types/weather"
import { fetchWeatherData, fetchForecastData } from "@/lib/weather-api"
import { getDemoWeatherData, getDemoForecastData } from "@/lib/demo-data"

export function useWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [noResults, setNoResults] = useState(false)
  const [units, setUnits] = useState<Units>("metric")

  const searchWeather = useCallback(
    async (city: string) => {
      if (!city.trim()) return

      setLoading(true)
      setError(null)
      setNoResults(false)

      try {
        // Try to fetch real data first
        const [weather, forecast] = await Promise.all([fetchWeatherData(city, units), fetchForecastData(city, units)])

        setWeatherData(weather)
        setForecastData(forecast)
      } catch (err: any) {
        console.error("API failed:", err)

        if (err.message?.includes("404") || err.message?.includes("not found")) {
          setNoResults(true)
          setWeatherData(null)
          setForecastData(null)
        } else {
          // For other errors, use demo data as fallback
          const demoWeather = getDemoWeatherData(city, units)
          const demoForecast = getDemoForecastData(units)

          setWeatherData(demoWeather)
          setForecastData(demoForecast)
          setError("API connection failed, showing demo data")
        }
      } finally {
        setLoading(false)
      }
    },
    [units],
  )

  const clearError = useCallback(() => {
    setError(null)
    setNoResults(false)
  }, [])

  const retrySearch = useCallback(() => {
    setError(null)
    setNoResults(false)
  }, [])

  return {
    weatherData,
    forecastData,
    loading,
    error,
    noResults,
    units,
    setUnits,
    searchWeather,
    clearError,
    retrySearch,
  }
}
