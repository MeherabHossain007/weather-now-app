interface WeatherIconProps {
  icon: string;
  size?: "sm" | "md" | "lg" | "xl";
  alt?: string;
}

export function WeatherIcon({
  icon,
  size = "md",
  alt = "Weather icon",
}: WeatherIconProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <img
      src={iconUrl || "/placeholder.svg"}
      alt={alt}
      className={sizeClasses[size]}
      loading="lazy"
    />
  );
}
