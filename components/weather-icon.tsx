import { Sun, Cloud, CloudRain, CloudSnow, Zap, CloudDrizzle, Eye, Wind } from "lucide-react"

interface WeatherIconProps {
  condition: string
  size?: "sm" | "md" | "lg"
}

export function WeatherIcon({ condition, size = "md" }: WeatherIconProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case "clear":
      case "sunny":
        return <Sun className={`${sizeClasses[size]} text-yellow-400`} />
      case "clouds":
      case "cloudy":
        return <Cloud className={`${sizeClasses[size]} text-gray-300`} />
      case "rain":
      case "shower rain":
        return <CloudRain className={`${sizeClasses[size]} text-blue-400`} />
      case "drizzle":
        return <CloudDrizzle className={`${sizeClasses[size]} text-blue-300`} />
      case "thunderstorm":
        return <Zap className={`${sizeClasses[size]} text-yellow-500`} />
      case "snow":
        return <CloudSnow className={`${sizeClasses[size]} text-white`} />
      case "mist":
      case "fog":
        return <Eye className={`${sizeClasses[size]} text-gray-400`} />
      case "wind":
        return <Wind className={`${sizeClasses[size]} text-gray-400`} />
      default:
        return <Sun className={`${sizeClasses[size]} text-yellow-400`} />
    }
  }

  return getIcon()
}
