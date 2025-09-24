# Weather Now - Weather Application

A responsive weather application built with Next.js that provides real-time weather data and forecasts using the OpenWeatherMap API.

## Features

### Core Functionality
- **City Search**: Search for weather data by city name with real-time API integration
- **Current Weather Display**: Large temperature display with weather conditions and icons
- **Weather Statistics**: Feels like temperature, humidity, wind speed, and precipitation
- **7-Day Forecast**: Daily weather forecast with high/low temperatures and weather icons
- **Hourly Forecast**: Next 8 hours of weather data
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens
- **Units Toggle**: Switch between Celsius and Fahrenheit

### UI States
- **Loading State**: Displays during API calls
- **Error State**: Shows appropriate error messages for invalid cities or API failures
- **Empty State**: Initial state before first search
- **Fallback Data**: Automatically uses demo data if API is unavailable

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **API**: OpenWeatherMap API

## API Integration

The application uses the OpenWeatherMap API with the following endpoints:

- **Current Weather**: `/weather?q={city}&appid={API_KEY}&units=metric`
- **5-Day Forecast**: `/forecast?q={city}&appid={API_KEY}&units=metric`
- **Weather Icons**: `https://openweathermap.org/img/wn/{icon_code}@2x.png`

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd weather-now-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Environment Setup**
   The API key is already configured in the application. For production use, you should:
   - Create a `.env.local` file
   - Add your OpenWeatherMap API key: `NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here`
   - Update the API configuration in `lib/weather-api.ts`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deployment

This application is optimized for deployment on Vercel:

1. **Deploy to Vercel**
   \`\`\`bash
   npx vercel
   \`\`\`

2. **Or connect your GitHub repository to Vercel for automatic deployments**

## Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles and Tailwind configuration
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main weather app page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── daily-forecast.tsx   # 7-day forecast component
│   ├── empty-state.tsx      # Empty state component
│   ├── error-state.tsx      # Error state component
│   ├── hourly-forecast.tsx  # Hourly forecast component
│   ├── loading-state.tsx    # Loading state component
│   ├── units-toggle.tsx     # Temperature units toggle
│   ├── weather-display.tsx  # Current weather display
│   ├── weather-icon.tsx     # Weather icon component
│   ├── weather-search.tsx   # Search functionality
│   └── weather-stats.tsx    # Weather statistics display
├── hooks/
│   └── use-weather.ts       # Weather data management hook
├── lib/
│   ├── demo-data.ts         # Fallback demo data
│   ├── utils.ts             # Utility functions
│   └── weather-api.ts       # API integration
├── types/
│   └── weather.ts           # TypeScript type definitions
└── README.md                # Project documentation
\`\`\`

## Features Implementation

### Search Implementation ✅
- City search with input validation
- Clear search input after successful search
- Error handling for invalid cities

### Weather Display ✅
- Large temperature display
- Weather condition with appropriate icons
- City name and country
- Current date display

### Weather Statistics ✅
- Feels like temperature
- Humidity percentage
- Wind speed
- Precipitation data

### Forecast Display ✅
- 7-day forecast with day names
- Daily high/low temperatures
- Weather icons for each day
- Hourly forecast (8 hours)

### UI States ✅
- Loading spinner during API calls
- Error messages for failed requests
- Empty state before first search
- Responsive design for all screen sizes

## Error Handling

The application includes comprehensive error handling:
- Network errors fallback to demo data
- Invalid city searches show user-friendly error messages
- API rate limiting and timeout handling
- Graceful degradation when services are unavailable

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is built for educational and demonstration purposes.
