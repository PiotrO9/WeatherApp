import HistoricalTemperatures from "../types/HistoricalTemperature";
import { API_KEY_WEATHER } from "../apikeys";

abstract class GetCityHistorialTemperature {
  static async get(cityName: string): Promise<HistoricalTemperatures> {
    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY_WEATHER}`
    );

    const fullAPIData = await apiResponse.json();

    let temperatureResults: number[] = [];
    let datasResult: string[] = [];

    for (const item of fullAPIData.list) {
      temperatureResults.push(Math.round(item.main.temp));
      datasResult.push(item.dt_txt.slice(0, -3));
    }
    return {
      temperatures: temperatureResults,
      datas: datasResult,
    };
  }
}

export default GetCityHistorialTemperature;
