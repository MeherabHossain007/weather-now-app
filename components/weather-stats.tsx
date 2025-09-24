import type { WeatherData, Units } from "@/types/weather"

interface WeatherStatsProps {
  weather: WeatherData
  units: Units
}

export function WeatherStats({ weather, units }: WeatherStatsProps) {
  const getWindUnit = () => (units === "metric" ? "km/h" : "mph")
  const getPrecipitation = () => "0 mm" // OpenWeather doesn't provide this in current weather

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-slate-800/50 rounded-xl p-4">
        <p className="text-gray-400 text-sm mb-1">Feels Like</p>
        <p className="text-2xl font-semibold">{weather.feelsLike}°</p>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-4">
        <p className="text-gray-400 text-sm mb-1">Humidity</p>
        <p className="text-2xl font-semibold">{weather.humidity}%</p>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-4">
        <p className="text-gray-400 text-sm mb-1">Wind</p>
        <p className="text-2xl font-semibold">
          {weather.windSpeed} {getWindUnit()}
        </p>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-4">
        <p className="text-gray-400 text-sm mb-1">Precipitation</p>
        <p className="text-2xl font-semibold">{getPrecipitation()}</p>
      </div>
    </div>
  )
}
