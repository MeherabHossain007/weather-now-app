import type { ForecastData, Units } from "@/types/weather"
import { WeatherIcon } from "./weather-icon"

interface DailyForecastProps {
  forecast: ForecastData
  units: Units
}

export function DailyForecast({ forecast }: DailyForecastProps) {
  const formatDay = (dateStr: string) => {
    if (dateStr.length === 3) return dateStr // Already formatted (demo data)

    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Daily forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {forecast.daily.map((day, index) => (
          <div key={index} className="bg-slate-800/50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm mb-3">{formatDay(day.date)}</p>
            <div className="flex justify-center mb-3">
              <WeatherIcon condition={day.condition} size="md" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold">{day.high}°</p>
              <p className="text-gray-400 text-sm">{day.low}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
