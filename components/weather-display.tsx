import type { WeatherData, Units } from "@/types/weather";
import { WeatherIcon } from "./weather-icon";

interface WeatherDisplayProps {
  weather: WeatherData;
  units: Units;
}

export function WeatherDisplay({ weather, units }: WeatherDisplayProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="relative h-72 rounded-20 p-6 md:p-8 overflow-hidden">
      <div
        className="absolute inset-0 opacity-80 hidden md:block"
        style={{
          backgroundImage: `url("/HeroBG.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="absolute inset-0 opacity-80 block md:hidden"
        style={{
          backgroundImage: `url("/Mobile-HeroBG.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-700/30"></div>
      <div className="relative h-full flex flex-col justify-center">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col justify-center items-center md:justify-start md:items-start gap-3">
            <h3 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">
              {weather.name}, {weather.country}
            </h3>
            <p className="text-white font-dm-sans text-lg drop-shadow-md">
              {formatDate(weather.timestamp)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <WeatherIcon alt={weather.condition} size="xl" icon={weather.icon} />
            <div className="text-right">
              <div className="text-8xl font-bold font-dm-sans-italic text-white drop-shadow-lg">
                {weather.temperature}°
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
