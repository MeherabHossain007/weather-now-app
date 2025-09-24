import type { WeatherData, Units } from "@/types/weather"
import { WeatherIcon } from "./weather-icon"

interface WeatherDisplayProps {
  weather: WeatherData
  units: Units
}

export function WeatherDisplay({ weather, units }: WeatherDisplayProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 md:p-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-4 right-8 w-2 h-2 bg-orange-400 rounded-full opacity-80"></div>
      <div className="absolute top-12 right-16 w-1 h-1 bg-yellow-300 rounded-full opacity-60"></div>
      <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70"></div>
      <div className="absolute bottom-16 left-16 w-1 h-1 bg-purple-300 rounded-full opacity-50"></div>

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            {weather.name}, {weather.country}
          </h3>
          <p className="text-blue-100 text-lg">{formatDate(weather.timestamp)}</p>
        </div>

        <div className="flex items-center gap-4">
          <WeatherIcon condition={weather.condition} size="lg" />
          <div className="text-right">
            <div className="text-5xl md:text-6xl font-bold">{weather.temperature}°</div>
          </div>
        </div>
      </div>
    </div>
  )
}
