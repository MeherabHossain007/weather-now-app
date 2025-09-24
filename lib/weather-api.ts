const API_KEY = "9d729cfd40c256defac28e6a8266b774"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function fetchWeatherData(city: string, units: string) {
  const response = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`)

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Please check the spelling and try again.")
    }
    throw new Error("Failed to fetch weather data")
  }

  const data = await response.json()

  return {
    id: data.id,
    name: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    condition: data.weather[0].main.toLowerCase(),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    timestamp: Date.now(),
  }
}

export async function fetchForecastData(city: string, units: string) {
  const response = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`)

  if (!response.ok) {
    throw new Error("Failed to fetch forecast data")
  }

  const data = await response.json()

  // Process daily forecast (group by day)
  const dailyMap = new Map()
  data.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000)
    const dayKey = date.toDateString()

    if (!dailyMap.has(dayKey)) {
      dailyMap.set(dayKey, {
        date: dayKey,
        high: Math.round(item.main.temp_max),
        low: Math.round(item.main.temp_min),
        condition: item.weather[0].main.toLowerCase(),
        icon: item.weather[0].icon,
      })
    } else {
      const existing = dailyMap.get(dayKey)
      existing.high = Math.max(existing.high, Math.round(item.main.temp_max))
      existing.low = Math.min(existing.low, Math.round(item.main.temp_min))
    }
  })

  // Process hourly forecast (next 24 hours)
  const hourlyForecast = data.list.slice(0, 8).map((item: any) => ({
    time: new Date(item.dt * 1000),
    temperature: Math.round(item.main.temp),
    condition: item.weather[0].main.toLowerCase(),
    icon: item.weather[0].icon,
  }))

  return {
    daily: Array.from(dailyMap.values()).slice(0, 7),
    hourly: hourlyForecast,
  }
}
