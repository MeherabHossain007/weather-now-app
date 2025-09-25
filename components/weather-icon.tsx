interface WeatherIconProps {
  condition: string;
  icon_code?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function WeatherIcon({
  condition,
  icon_code,
  size = "md",
}: WeatherIconProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  const getIconCode = () => {
    if (icon_code) return icon_code;

    switch (condition.toLowerCase()) {
      case "clear":
      case "sunny":
        return "01d";
      case "few clouds":
        return "02d";
      case "scattered clouds":
        return "03d";
      case "clouds":
      case "cloudy":
      case "broken clouds":
        return "04d";
      case "shower rain":
        return "09d";
      case "rain":
        return "10d";
      case "drizzle":
        return "10d";
      case "thunderstorm":
        return "11d";
      case "snow":
        return "13d";
      case "mist":
      case "fog":
        return "50d";
      default:
        return "01d";
    }
  };

  const iconCode = getIconCode();
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <img
      src={iconUrl}
      alt={condition}
      className={`${sizeClasses[size]} object-contain`}
    />
  );
}
