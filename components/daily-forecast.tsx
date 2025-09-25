import type { ForecastData, Units } from "@/types/weather";
import { WeatherIcon } from "./weather-icon";

interface DailyForecastProps {
  forecast: ForecastData;
  units: Units;
}

export function DailyForecast({ forecast }: DailyForecastProps) {
  const formatDay = (dateStr: string) => {
    if (dateStr.length === 3) return dateStr;

    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Daily forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {forecast.daily.map((day, index) => (
          <div
            key={index}
            className="bg-neutral-800 border border-neutral-600 rounded-12 text-center px-2.5 py-4"
          >
            <p className="text-white text-lg mb-3">{formatDay(day.date)}</p>
            <div className="flex justify-center mb-3">
              <WeatherIcon condition={day.condition} size='xl' />
            </div>
            <div className=" flex justify-between items-center px-4 pb-4">
              <p className="font-semibold text-base">{day.high}°</p>
              <p className="font-semibold text-base">{day.low}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
