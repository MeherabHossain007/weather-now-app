import type { WeatherData, Units } from "@/types/weather"

interface WeatherStatsProps {
  weather: WeatherData
  units: Units
}

export function WeatherStats({ weather, units }: WeatherStatsProps) {
  const getWindUnit = () => (units === "metric" ? "km/h" : "mph");
  const getPrecipitationUnit = () => (units === "metric" ? "mm" : "in");
  const getPrecipitation = () => `0 ${getPrecipitationUnit()}`;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-neutral-800 border border-neutral-600 rounded-12 p-4">
        <p className="text-gray-400 text-sm mb-1">Feels Like</p>
        <p className="text-2xl font-semibold">{weather.feelsLike}°</p>
      </div>

      <div className="bg-neutral-800 border border-neutral-600 rounded-12 p-4">
        <p className="text-gray-400 text-sm mb-1">Humidity</p>
        <p className="text-2xl font-semibold">{weather.humidity}%</p>
      </div>

      <div className="bg-neutral-800 border border-neutral-600 rounded-12 p-4">
        <p className="text-gray-400 text-sm mb-1">Wind</p>
        <p className="text-2xl font-semibold">
          {weather.windSpeed} {getWindUnit()}
        </p>
      </div>

      <div className="bg-neutral-800 border border-neutral-600 rounded-12 p-4">
        <p className="text-gray-400 text-sm mb-1">Precipitation</p>
        <p className="text-2xl font-semibold">{getPrecipitation()}</p>
      </div>
    </div>
  )
}
