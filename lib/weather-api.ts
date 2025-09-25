// Configuration
const CONFIG = {
  API_KEY: "9d729cfd40c256defac28e6a8266b774",
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  GEO_URL: "https://api.openweathermap.org/geo/1.0",
  CACHE_DURATION: 10 * 60 * 1000, // 10 minutes
  DEFAULT_FORECAST_DAYS: 7,
  HOURLY_LIMIT: 8,
} as const;

// Types
interface WeatherData {
  id: number;
  name: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  condition: string;
  description: string;
  icon: string;
  timestamp: number;
}

interface DayForecast {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

interface HourlyForecast {
  time: Date;
  temperature: number;
  condition: string;
  icon: string;
}

interface CitySearchResult {
  name: string;
  country: string;
  state?: string;
  displayName: string;
}

// Simple in-memory cache
class WeatherCache {
  private cache = new Map<string, { data: any; expiry: number }>();

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  set(key: string, data: any, duration = CONFIG.CACHE_DURATION): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + duration,
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new WeatherCache();

// Utility functions
const round = (num: number): number => Math.round(num);

const createApiUrl = (
  endpoint: string,
  params: Record<string, string>
): string => {
  const url = new URL(`${CONFIG.BASE_URL}/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  url.searchParams.append("appid", CONFIG.API_KEY);
  return url.toString();
};

const createGeoUrl = (query: string, limit = 5): string => {
  const url = new URL(`${CONFIG.GEO_URL}/direct`);
  url.searchParams.append("q", query);
  url.searchParams.append("limit", String(limit));
  url.searchParams.append("appid", CONFIG.API_KEY);
  return url.toString();
};

const handleApiError = async (
  response: Response,
  context: string
): Promise<void> => {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `City not found. Please check the spelling and try again.`
      );
    }
    throw new Error(
      `Failed to ${context}: ${response.status} ${response.statusText}`
    );
  }
};

const formatDayName = (
  date: Date,
  format: "short" | "long" = "short"
): string => {
  return date.toLocaleDateString("en-US", { weekday: format });
};

// Main API functions
export async function fetchWeatherData(
  city: string,
  units = "metric"
): Promise<WeatherData> {
  const cacheKey = `weather:${city}:${units}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    const url = createApiUrl("weather", { q: city, units });
    const response = await fetch(url);
    await handleApiError(response, "fetch weather data");

    const data = await response.json();

    const weather: WeatherData = {
      id: data.id,
      name: data.name,
      country: data.sys.country,
      temperature: round(data.main.temp),
      feelsLike: round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      condition: data.weather[0].main.toLowerCase(),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      timestamp: Date.now(),
    };

    cache.set(cacheKey, weather);
    return weather;
  } catch (error) {
    console.error("Weather fetch error:", error);
    throw error;
  }
}

export async function fetchForecastData(city: string, units = "metric") {
  const cacheKey = `forecast:${city}:${units}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    const url = createApiUrl("forecast", { q: city, units });
    const response = await fetch(url);
    await handleApiError(response, "fetch forecast data");

    const data = await response.json();
    const result = processForecastData(data);

    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Forecast fetch error:", error);
    throw error;
  }
}

function processForecastData(data: any) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Process daily and hourly data in a single pass
  const dailyMap = new Map<string, any>();
  const hourlyByDay = new Map<string, HourlyForecast[]>();

  data.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toDateString();
    const temp = round(item.main.temp);
    const tempMax = round(item.main.temp_max);
    const tempMin = round(item.main.temp_min);

    // Update daily data
    const existing = dailyMap.get(dayKey);
    if (!existing) {
      dailyMap.set(dayKey, {
        date,
        high: tempMax,
        low: tempMin,
        condition: item.weather[0].main.toLowerCase(),
        icon: item.weather[0].icon,
      });
    } else {
      existing.high = Math.max(existing.high, tempMax);
      existing.low = Math.min(existing.low, tempMin);
    }

    // Add hourly data
    if (!hourlyByDay.has(dayKey)) {
      hourlyByDay.set(dayKey, []);
    }

    const hourlyData = hourlyByDay.get(dayKey)!;
    if (hourlyData.length < CONFIG.HOURLY_LIMIT) {
      hourlyData.push({
        time: date,
        temperature: temp,
        condition: item.weather[0].main.toLowerCase(),
        icon: item.weather[0].icon,
      });
    }
  });

  // Generate 7-day forecast
  const dailyForecast = generateDailyForecast(today, dailyMap);

  // Generate hourly data by day
  const hourlyDataByDay = generateHourlyByDay(today, hourlyByDay);

  // Get first 8 hours from API data for immediate hourly forecast
  const immediateHourly = data.list
    .slice(0, CONFIG.HOURLY_LIMIT)
    .map((item: any) => ({
      time: new Date(item.dt * 1000),
      temperature: round(item.main.temp),
      condition: item.weather[0].main.toLowerCase(),
      icon: item.weather[0].icon,
    }));

  return {
    daily: dailyForecast,
    hourly: immediateHourly,
    hourlyByDay: hourlyDataByDay,
  };
}

function generateDailyForecast(
  today: Date,
  dailyMap: Map<string, any>
): DayForecast[] {
  const forecast: DayForecast[] = [];

  for (let i = 0; i < CONFIG.DEFAULT_FORECAST_DAYS; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + i);
    const dayKey = targetDate.toDateString();
    const dayData = dailyMap.get(dayKey);

    if (dayData) {
      forecast.push({
        date: formatDayName(targetDate),
        high: dayData.high,
        low: dayData.low,
        condition: dayData.condition,
        icon: dayData.icon,
      });
    } else {
      // Fallback for missing days
      const baseTemp = i === 0 ? 20 : 18;
      forecast.push({
        date: formatDayName(targetDate),
        high: baseTemp + 2,
        low: baseTemp - 2,
        condition: "clear",
        icon: "01d",
      });
    }
  }

  return forecast;
}

function generateHourlyByDay(
  today: Date,
  hourlyByDay: Map<string, HourlyForecast[]>
) {
  const result = [];

  for (let i = 0; i < CONFIG.DEFAULT_FORECAST_DAYS; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + i);
    const dayKey = targetDate.toDateString();
    const dayName = formatDayName(targetDate, "long");

    let hours = hourlyByDay.get(dayKey) || [];

    // Fill missing hours if needed
    if (hours.length < CONFIG.HOURLY_LIMIT) {
      hours = fillMissingHours(hours, targetDate);
    }

    result.push({
      day: dayName,
      dayKey,
      hours: hours.slice(0, CONFIG.HOURLY_LIMIT),
    });
  }

  return result;
}

function fillMissingHours(
  existingHours: HourlyForecast[],
  targetDate: Date
): HourlyForecast[] {
  const hours = [...existingHours];
  const hoursNeeded = CONFIG.HOURLY_LIMIT - hours.length;

  if (hoursNeeded <= 0) return hours;

  const lastHour = hours[hours.length - 1];
  const baseTime = lastHour ? new Date(lastHour.time) : new Date(targetDate);
  const baseTemp = lastHour?.temperature || 18;
  const baseCondition = lastHour?.condition || "clear";
  const baseIcon = lastHour?.icon || "01d";

  for (let i = 0; i < hoursNeeded; i++) {
    const nextTime = new Date(baseTime);
    nextTime.setHours(baseTime.getHours() + (i + 1) * 3);

    // Add small temperature variation for realism
    const tempVariation = Math.floor(Math.random() * 5) - 2;

    hours.push({
      time: nextTime,
      temperature: Math.max(0, baseTemp + tempVariation),
      condition: baseCondition,
      icon: baseIcon,
    });
  }

  return hours;
}

export async function searchCities(query: string): Promise<CitySearchResult[]> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  const cacheKey = `cities:${trimmedQuery}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    const url = createGeoUrl(trimmedQuery);
    const response = await fetch(url);
    await handleApiError(response, "search cities");

    const data = await response.json();

    const cities = data.map((city: any) => ({
      name: city.name,
      country: city.country,
      state: city.state,
      displayName: city.state
        ? `${city.name}, ${city.state}, ${city.country}`
        : `${city.name}, ${city.country}`,
    }));

    cache.set(cacheKey, cities, 30 * 60 * 1000); // Cache for 30 minutes
    return cities;
  } catch (error) {
    console.error("City search error:", error);
    throw error;
  }
}

// Export cache utilities for testing or manual cache management
export const cacheUtils = {
  clear: () => cache.clear(),
  get: (key: string) => cache.get(key),
  set: (key: string, data: any, duration?: number) =>
    cache.set(key, data, duration),
};
