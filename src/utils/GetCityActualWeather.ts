import WeatherFullAPIData from "../types/WeatherFullAPIData";
import WeatherShortData from "../types/WeatherShortData";
import { API_KEY_WEATHER } from "../apikeys";

abstract class GetCityActualWeather {
  static async get(cityName: string): Promise<WeatherShortData> {
    try {
      const apiResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY_WEATHER}`
      );

      const fullAPIData: WeatherFullAPIData = await apiResponse.json();

      const result: WeatherShortData = {
        name: fullAPIData.name,
        weather: fullAPIData.weather[0].main,
        description: fullAPIData.weather[0].description,
        temperature: Math.round(fullAPIData.main.temp),
        minTemperature: Math.round(fullAPIData.main.temp_min),
        maxTemperature: Math.round(fullAPIData.main.temp_max),
        humidity: fullAPIData.main.humidity,
        timezone: fullAPIData.timezone,
        imageName: fullAPIData.weather[0].icon,
      };

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default GetCityActualWeather;
