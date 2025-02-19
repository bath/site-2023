import type { WeatherData } from "../types";

export async function fetchWeatherData(
  apiKey: string,
): Promise<WeatherData | null> {
  try {
    if (!apiKey) return null;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Kansas City,US&units=imperial&appid=${apiKey}`,
    );

    if (!response.ok) return null;

    const data = await response.json();

    if (data.main && data.weather) {
      return {
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return null;
  }
}
