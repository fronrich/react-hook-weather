# react-hook-weather

[![npm version](https://img.shields.io/npm/v/react-hook-weather.svg)](https://www.npmjs.com/package/react-hook-weather)
[![Build Status](https://img.shields.io/travis/yourusername/react-hook-weather.svg)](https://travis-ci.com/yourusername/react-hook-weather)
[![License](https://img.shields.io/npm/l/react-hook-weather.svg)](https://github.com/yourusername/react-hook-weather/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/react-hook-weather.svg)](https://www.npmjs.com/package/react-hook-weather)

A simple React hook for fetching and caching weather data from the [Open-Meteo API](https://open-meteo.com/en/docs) using local storage. Perfect for integrating real-time weather information into any React app with ease.

## Installation

Install the package using npm or yarn:

```bash
npm install react-hook-weather
```

or

```bash
yarn add react-hook-weather
```

## Usage

Integrate the hook into your React component as follows:

```jsx
import React from "react";
import useWeather from "react-hook-weather";

const WeatherComponent = () => {
  // Configure the API request using the OpenMeteoForecastConfig parameters
  const { response } = useWeather({
    latitude: 52.52,
    longitude: 13.405,
    hourly: "temperature_2m,relativehumidity_2m",
    daily: "weathercode,temperature_2m_max",
    current_weather: true,
    timezone: "Europe/Berlin",
  });

  if (!response) return <div>Loading...</div>;

  return (
    <div>
      <h1>Current Weather</h1>
      <p>Temperature: {response.current_weather.temperature}°C</p>
      <p>Humidity: {response.current_weather.relativehumidity}%</p>
      {/* Additional weather details can be rendered here */}
    </div>
  );
};

export default WeatherComponent;
```

## Features

- **Easy API Integration:** Quickly fetch weather data using a single hook.
- **Caching:** Prevent redundant API calls by caching forecast data in local storage via the `react-hook-storage` package.
- **Configurable:** Pass in a rich configuration object (see the API reference below) to tailor your API request.
- **Flexible:** Supports hourly, daily, current weather, and more with parameters modeled on the Open-Meteo API.

## API Reference

The hook accepts an object that adheres to the `OpenMeteoForecastConfig` interface. Some key parameters include:

- **latitude**: Geographical coordinate (required)
- **longitude**: Geographical coordinate (required)
- **hourly**: Comma-separated list of hourly weather variables (e.g., `"temperature_2m,relativehumidity_2m"`)
- **daily**: Comma-separated list of daily weather variables (e.g., `"weathercode,temperature_2m_max"`)
- **current_weather**: Boolean flag to include current weather conditions (default: `false`)
- **timezone**: Timezone for time formatting (e.g., `"Europe/Berlin"`)
- _...and more!_

For a complete list of configuration options, please refer to the [Open-Meteo API Documentation](https://open-meteo.com/en/docs).

## Contributing

Contributions are welcome! If you have ideas, bug fixes, or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
