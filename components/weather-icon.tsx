import Image from "next/image";
import { useMemo } from "react";

interface WeatherIconProps {
  icon: string;
  size?: "sm" | "md" | "lg" | "xl";
  alt?: string;
}

const SIZE_CONFIG = {
  sm: { className: "w-8 h-8", dimensions: 32 },
  md: { className: "w-10 h-10", dimensions: 40 },
  lg: { className: "w-24 h-24", dimensions: 96 },
  xl: { className: "w-32 h-32", dimensions: 128 },
} as const;

const WEATHER_API_BASE = "https://openweathermap.org/img/wn";
const FALLBACK_ICON = "/placeholder.svg";

export function WeatherIcon({
  icon,
  size = "md",
  alt = "Weather icon",
}: WeatherIconProps) {
  const { iconUrl, dimensions, className } = useMemo(() => {
    const config = SIZE_CONFIG[size];
    return {
      iconUrl: icon ? `${WEATHER_API_BASE}/${icon}@4x.png` : FALLBACK_ICON,
      dimensions: config.dimensions,
      className: config.className,
    };
  }, [icon, size]);

  return (
    <Image
      src={iconUrl}
      alt={alt}
      height={dimensions}
      width={dimensions}
      className={className}
      loading="lazy"
      unoptimized
    />
  );
}
