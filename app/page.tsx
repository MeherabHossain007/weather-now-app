"use client"

import { useState } from "react"
import { WeatherSearch } from "@/components/weather-search"
import { WeatherDisplay } from "@/components/weather-display"
import { WeatherStats } from "@/components/weather-stats"
import { DailyForecast } from "@/components/daily-forecast"
import { HourlyForecast } from "@/components/hourly-forecast"
import { UnitsToggle } from "@/components/units-toggle"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"
import { EmptyState } from "@/components/empty-state"
import { NoResultsState } from "@/components/no-results-state"
import { WeatherIcon } from "@/components/weather-icon"
import { useWeather } from "@/hooks/use-weather"

export default function WeatherApp() {
  const {
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
  } = useWeather()

  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (city: string) => {
    setHasSearched(true)
    await searchWeather(city)
  }

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-2">
          <WeatherIcon condition="sunny" size="sm" />
          <h1 className="text-xl font-semibold">Weather Now</h1>
        </div>
        <UnitsToggle units={units} onUnitsChange={setUnits} />
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-6 pb-6">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bricolage font-bold mb-6 text-balance">
            How's the sky looking today?
          </h2>
          <WeatherSearch onSearch={handleSearch} loading={loading} />
        </div>

        {/* Content States */}
        {loading && <LoadingState />}

        {error && <ErrorState message={error} onRetry={retrySearch} />}

        {!loading && !error && noResults && <NoResultsState />}

        {!loading && !error && !hasSearched && !noResults && <EmptyState />}

        {!loading && !error && !noResults && weatherData && forecastData && (
          <div className="space-y-6">
            <WeatherDisplay weather={weatherData} units={units} />
            <WeatherStats weather={weatherData} units={units} />
            <div className="lg:grid lg:grid-cols-3 lg:gap-6 lg:items-start">
              <div className="lg:col-span-2 mb-6 lg:mb-0">
                <DailyForecast forecast={forecastData} units={units} />
              </div>
              <div className="lg:col-span-1">
                <HourlyForecast forecast={forecastData} units={units} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
