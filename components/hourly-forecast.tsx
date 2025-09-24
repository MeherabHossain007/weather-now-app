import type { ForecastData, Units } from "@/types/weather"
import { WeatherIcon } from "./weather-icon"

interface HourlyForecastProps {
  forecast: ForecastData
  units: Units
}

export function HourlyForecast({ forecast }: HourlyForecastProps) {
  const formatTime = (time: Date) => {
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    })
  }

  return (
    <div className="bg-slate-800/30 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Hourly forecast</h3>
        <select className="bg-slate-700 text-white rounded-lg px-3 py-1 text-sm">
          <option>Tuesday</option>
        </select>
      </div>

      <div className="space-y-3">
        {forecast.hourly.map((hour, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <WeatherIcon condition={hour.condition} size="sm" />
              <span className="text-gray-300">{formatTime(hour.time)}</span>
            </div>
            <span className="font-semibold">{hour.temperature}°</span>
          </div>
        ))}
      </div>
    </div>
  )
}
