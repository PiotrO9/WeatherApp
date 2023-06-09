import WeatherFullAPIData from "../types/WeatherFullAPIData";
import WeatherShortData from "../types/WeatherShortData";

abstract class GetCityActualWeather {
  static async get(cityName: string): Promise<WeatherShortData> {
    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=309e7667904c3b15d43d3bcdf1ce5f9e`
    );

    const fullAPIData: WeatherFullAPIData = await apiResponse.json();

    const result: WeatherShortData = {
      weather: fullAPIData.weather[0].main,
      description: fullAPIData.weather[0].description,
      temperature: Math.round(fullAPIData.main.temp),
      minTemperature: Math.round(fullAPIData.main.temp_min),
      maxTemperature: Math.round(fullAPIData.main.temp_max),
      humidity: fullAPIData.main.humidity,
      timezone: fullAPIData.timezone,
    };

    return result;
  }
}

export default GetCityActualWeather;
