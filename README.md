# Weather Now

A responsive weather application built with Next.js that provides real-time weather data and forecasts using the OpenWeatherMap API.

![Weather Now](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm
- OpenWeatherMap API key

### Installation

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd weather-now-app
   npm install
   ```

2. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=9d729cfd40c256defac28e6a8266b774
   ```
   
   > **Get your API key**: Sign up at [OpenWeatherMap](https://openweathermap.org/api) and get your free API key from the dashboard.

3. **Run the app**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## ✨ Features

- 🔍 **City Search** - Real-time weather search by city name
- 🌡️ **Current Weather** - Temperature, conditions, and weather icons
- 📊 **Weather Stats** - Feels like, humidity, wind speed, precipitation
- 📅 **7-Day Forecast** - Daily highs/lows with weather icons
- ⏰ **Hourly Forecast** - Next 8 hours of weather data
- 📱 **Responsive Design** - Mobile, tablet, and desktop optimized
- 🔄 **Units Toggle** - Switch between Celsius and Fahrenheit
- ⚡ **Smart Error Handling** - Fallback data when API is unavailable

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **API**: OpenWeatherMap

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── weather-search.tsx   # Search functionality
│   ├── weather-display.tsx  # Current weather
│   ├── weather-stats.tsx    # Weather statistics
│   ├── daily-forecast.tsx   # 7-day forecast
│   └── hourly-forecast.tsx  # Hourly forecast
├── hooks/
│   └── use-weather.ts       # Weather data hook
├── lib/
│   ├── weather-api.ts       # API integration
│   ├── demo-data.ts         # Fallback data
│   └── utils.ts             # Utilities
└── types/
    └── weather.ts           # Type definitions
```

## 🌐 API Configuration

The app uses OpenWeatherMap API endpoints:
- Current weather: `/weather?q={city}&appid={API_KEY}&units=metric`
- 5-day forecast: `/forecast?q={city}&appid={API_KEY}&units=metric`

Update `lib/weather-api.ts` to use your API key from environment variables.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npx vercel
```
Add your `NEXT_PUBLIC_WEATHER_API_KEY` in Vercel's environment variables.

### Build for Production
```bash
npm run build
npm start
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WEATHER_API_KEY` | Your OpenWeatherMap API key | Yes |

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is built for educational and demonstration purposes.

---

**Need help?** Check the [OpenWeatherMap API docs](https://openweathermap.org/api) or open an issue.
