import { useCallback, useState } from "react";
import { fetchWeatherApi } from "openmeteo";
import type { WeatherApiResponse } from "@openmeteo/sdk/weather-api-response.d.ts";

/**
 * Weather models available for forecasting.
 * @see https://open-meteo.com/en/docs#api-documentation
 */
type OpenMeteoWeatherModel =
  | "auto"
  | "ECMWF_IFS"
  | "GFS"
  | "GEM"
  | "ICON"
  | "METEO_FRANCE"
  | "FMI_HIRLAM"
  | "JMA_SEAM"
  | "METNO_NORDIC";

/**
 * Configuration parameters for the Open-Meteo /v1/forecast API endpoint.
 *
 * **Required Parameters:** At least one of `hourly`, `daily`, or `current_weather` must be provided.
 * @see https://open-meteo.com/en/docs
 */
interface OpenMeteoForecastConfig {
  /**
   * Latitude (Geographical WGS84 coordinate).
   * @range -90.0 to 90.0
   */
  latitude: number;

  /**
   * Longitude (Geographical WGS84 coordinate).
   * @range -180.0 to 180.0
   */
  longitude: number;

  /**
   * Comma-separated list of hourly weather variables.
   * @example "temperature_2m,relativehumidity_2m"
   * @see https://open-meteo.com/en/docs#api-documentation for available variables.
   */
  hourly?: string;

  /**
   * Comma-separated list of daily weather variables.
   * @example "weathercode,temperature_2m_max"
   * @see https://open-meteo.com/en/docs#api-documentation for available variables.
   */
  daily?: string;

  /**
   * Include current weather conditions in the JSON output.
   * @default false
   */
  current_weather?: boolean;

  /**
   * Temperature unit for all temperature variables.
   * @default "celsius"
   */
  temperature_unit?: "celsius" | "fahrenheit";

  /**
   * Wind speed unit for all wind speed variables.
   * @default "kmh"
   */
  windspeed_unit?: "kmh" | "mph" | "ms" | "kn";

  /**
   * Precipitation unit for all precipitation variables.
   * @default "mm"
   */
  precipitation_unit?: "mm" | "inch";

  /**
   * Timezone for time formatting.
   * @format IANA timezone (e.g., "Europe/Berlin")
   * @default "auto" (coordinates based)
   */
  timezone?: string;

  /**
   * Time format for all timestamps.
   * @default "iso8601"
   */
  timeformat?: "iso8601" | "unixtime";

  /**
   * Number of past days to include (0-2 days).
   * @default 0
   * @range 0-2
   */
  past_days?: number;

  /**
   * Number of forecast days (1-16 days).
   * @default 7
   * @range 1-16
   */
  forecast_days?: number;

  /**
   * Number of hours to forecast (1-48 hours) - Nowcast only.
   * @range 1-48
   */
  forecast_hours?: number;

  /**
   * Number of minutes to forecast (1-60 minutes) - Minutely forecast only.
   * @range 1-60
   */
  forecast_minutes?: number;

  /**
   * Start date for historical data (YYYY-MM-DD).
   * @format ISO date
   */
  start_date?: string;

  /**
   * End date for historical data (YYYY-MM-DD).
   * @format ISO date
   */
  end_date?: string;

  /**
   * Start hour for hourly data (HH:MM).
   * @format 24-hour time
   */
  start_hour?: string;

  /**
   * End hour for hourly data (HH:MM).
   * @format 24-hour time
   */
  end_hour?: string;

  /**
   * Comma-separated list of weather models to use.
   * @example "ECMWF_IFS,FMI_HIRLAM"
   * @default "auto"
   */
  models?: OpenMeteoWeatherModel;

  /**
   * Grid cell selection method.
   * @default "nearest"
   */
  cell_selection?: "nearest" | "land";
}

/**
 * Custom React hook to fetch and cache weather data from the Open-Meteo API.
 *
 * This hook utilizes the `fetchWeatherApi` function from the `openmeteo` package
 * to retrieve weather data based on the provided configuration. To prevent redundant
 * API calls, it caches the forecast data in local storage using the `react-hook-storage` package.
 *
 * @param {OpenMeteoForecastConfig} config - Configuration object for the Open-Meteo API request.
 * @returns {{ response: WeatherApiResponse[] | undefined }} - An object containing the weather API response.
 *
 * @example
 * ```jsx
 * import useWeather from 'react-hook-weather';
 *
 * const WeatherComponent = () => {
 *   const { response } = useWeather({
 *     latitude: 52.52,
 *     longitude: 13.405,
 *     hourly: 'temperature_2m,relativehumidity_2m',
 *     daily: 'weathercode,temperature_2m_max',
 *     current_weather: true,
 *     timezone: 'Europe/Berlin',
 *   });
 *
 *   if (!response) return <div>Loading...</div>;
 *
 *   return (
 *     <div>
 *       <h1>Current Weather</h1>
 *       <p>Temperature: {response.current_weather.temperature}°C</p>
 *       <p>Humidity: {response.current_weather.relativehumidity}%</p>
 *     </div>
 *   );
 * };
 * ```
 *
 * @see https://open-meteo.com/en/docs for more information on the API and available parameters.
 */
const useWeather = (config: OpenMeteoForecastConfig) => {
  const [response, setResponse] = useState<WeatherApiResponse[]>();
  const url = "https://api.open-meteo.com/v1/forecast";
  useCallback(async () => {
    const result = await fetchWeatherApi(url, config);
    setResponse(result);
  }, [url, config]);

  return { response };
};

export default useWeather;
