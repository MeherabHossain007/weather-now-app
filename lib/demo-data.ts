import type { WeatherData, ForecastData, Units } from "@/types/weather"

export function getDemoWeatherData(city: string, units: Units): WeatherData {
  const temp = units === "metric" ? 20 : 68
  const feelsLike = units === "metric" ? 18 : 64
  const windSpeed = units === "metric" ? 14 : 8.7

  return {
    id: 2950159,
    name: city || "Berlin",
    country: "DE",
    temperature: temp,
    feelsLike: feelsLike,
    humidity: 46,
    windSpeed: windSpeed,
    pressure: 1013,
    condition: "clear",
    description: "clear sky",
    icon: "01d",
    timestamp: Date.now(),
  }
}

export function getDemoForecastData(units: Units): ForecastData {
  const baseTemp = units === "metric" ? 20 : 68

  const daily = [
    { date: "Tue", high: baseTemp, low: baseTemp - 6, condition: "clouds", icon: "03d" },
    { date: "Wed", high: baseTemp + 1, low: baseTemp - 5, condition: "rain", icon: "10d" },
    { date: "Thu", high: baseTemp + 4, low: baseTemp - 6, condition: "clear", icon: "01d" },
    { date: "Fri", high: baseTemp + 5, low: baseTemp - 7, condition: "clouds", icon: "04d" },
    { date: "Sat", high: baseTemp + 1, low: baseTemp - 6, condition: "thunderstorm", icon: "11d" },
    { date: "Sun", high: baseTemp + 5, low: baseTemp - 4, condition: "rain", icon: "10d" },
    { date: "Mon", high: baseTemp + 4, low: baseTemp - 5, condition: "mist", icon: "50d" },
  ]

  const hourly = [
    { time: new Date(Date.now() + 3 * 60 * 60 * 1000), temperature: baseTemp, condition: "clouds", icon: "03d" },
    { time: new Date(Date.now() + 4 * 60 * 60 * 1000), temperature: baseTemp, condition: "clouds", icon: "03d" },
    { time: new Date(Date.now() + 5 * 60 * 60 * 1000), temperature: baseTemp, condition: "clear", icon: "01d" },
    { time: new Date(Date.now() + 6 * 60 * 60 * 1000), temperature: baseTemp - 1, condition: "clouds", icon: "03d" },
    { time: new Date(Date.now() + 7 * 60 * 60 * 1000), temperature: baseTemp - 2, condition: "clouds", icon: "03d" },
    { time: new Date(Date.now() + 8 * 60 * 60 * 1000), temperature: baseTemp - 2, condition: "mist", icon: "50d" },
    { time: new Date(Date.now() + 9 * 60 * 60 * 1000), temperature: baseTemp - 3, condition: "clouds", icon: "03d" },
    { time: new Date(Date.now() + 10 * 60 * 60 * 1000), temperature: baseTemp - 3, condition: "clouds", icon: "03d" },
  ]

  return { daily, hourly }
}
