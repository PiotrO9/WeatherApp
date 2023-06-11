import HistoricalHumidies from "./HistoricalHumidity";
import HistoricalTemperatures from "./HistoricalTemperature";

export type HistoricialWeatherDatas = {
  historicalHumidityDatas: HistoricalHumidies;
  historicalTemperatureDatas: HistoricalTemperatures;
};

export default HistoricialWeatherDatas;
