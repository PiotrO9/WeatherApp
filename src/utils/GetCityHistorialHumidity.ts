import HistoricalHumidities from "../types/HistoricalHumidity";
import { API_KEY_WEATHER } from "../apikeys";

abstract class GetCityHistorialHumidity {
  static async get(cityName: string): Promise<HistoricalHumidities> {
    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY_WEATHER}`
    );

    const fullAPIData = await apiResponse.json();

    let humidityResults: number[] = [];
    let datasResult: string[] = [];

    for (const item of fullAPIData.list) {
      humidityResults.push(item.main.humidity);
      datasResult.push(item.dt_txt.slice(0, -3));
    }

    return {
      humidities: humidityResults,
      datas: datasResult,
    };
  }
}

export default GetCityHistorialHumidity;
