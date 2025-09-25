"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { WeatherSearch } from "@/components/weather-search";
import { WeatherDisplay } from "@/components/weather-display";
import { WeatherStats } from "@/components/weather-stats";
import { DailyForecast } from "@/components/daily-forecast";
import { HourlyForecast } from "@/components/hourly-forecast";
import { UnitsToggle } from "@/components/ui/units-toggle";
import { LoadingState } from "@/components/utilities/loading-state";
import { ErrorState } from "@/components/errorState/error-state";
import { EmptyState } from "@/components/errorState/empty-state";
import { NoResultsState } from "@/components/errorState/no-results-state";
import { useWeather } from "@/hooks/use-weather";


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
    retrySearch,
  } = useWeather();

  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(
    async (city: string) => {
      setHasSearched(true);
      await searchWeather(city);
    },
    [searchWeather]
  );

  const handleUnitsChange = useCallback(
    (newUnits: typeof units) => {
      setUnits(newUnits);
    },
    [setUnits]
  );

  const showEmptyState = useMemo(
    () => !loading && !error && !hasSearched && !noResults,
    [loading, error, hasSearched, noResults]
  );

  const showWeatherContent = useMemo(
    () => !loading && !error && !noResults && weatherData && forecastData,
    [loading, error, noResults, weatherData, forecastData]
  );

  const showNoResults = useMemo(
    () => !loading && !error && noResults,
    [loading, error, noResults]
  );


  const renderStateContent = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} onRetry={retrySearch} />;
    if (showNoResults) return <NoResultsState />;
    if (showEmptyState) return <EmptyState />;
    if (showWeatherContent) return <WeatherContent />;
    return null;
  };

  const WeatherContent = useCallback(() => {
    if (!weatherData || !forecastData) return null;

    return (
      <div className="space-y-6">
        <div className="lg:grid lg:grid-cols-3 gap-8 lg:items-start">
          <div className="lg:col-span-2 flex flex-col gap-12 mb-6 lg:mb-0">
            <WeatherDisplay weather={weatherData} units={units} />
            <WeatherStats weather={weatherData} units={units} />
            <DailyForecast forecast={forecastData} units={units} />
          </div>
          <div className="lg:col-span-1">
            <HourlyForecast forecast={forecastData} units={units} />
          </div>
        </div>
      </div>
    );
  }, [weatherData, forecastData, units]);

  return (
    <div className="min-h-screen lg:px-24 lg:py-12 text-white">
      <header className="flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Weather App Logo"
            height={200}
            width={200}
            priority
          />
        </div>
        <UnitsToggle units={units} onUnitsChange={handleUnitsChange} />
      </header>
      <main className="px-4 md:px-6 pb-6">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-5xl font-bricolage font-bold my-16 text-balance">
            How's the sky looking today?
          </h1>
          <WeatherSearch onSearch={handleSearch} loading={loading} />
        </div>
        {renderStateContent()}
      </main>
    </div>
  );
}
