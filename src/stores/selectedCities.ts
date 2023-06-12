import { defineStore } from "pinia";
import CityDatas from "../types/CityDatas";
import { transliterate } from "transliteration";

interface SelectedCitiesState {
  SelectedCities: CityDatas[];
}

export const useSelectedCities = defineStore("SelectedCities", {
  state: (): SelectedCitiesState => ({
    SelectedCities: [] as CityDatas[],
  }),
  getters: {
    getSelectedCities(): CityDatas[] {
      return this.SelectedCities;
    },
  },
  actions: {
    setSelectedCities(selectedCities: CityDatas[]) {
      this.SelectedCities = [...selectedCities];
    },
    removeCity(cityName: string) {
      const transliteratedCityName = transliterate(cityName);

      this.setSelectedCities(
        this.SelectedCities.filter(
          (city) => city.name !== transliteratedCityName
        )
      );
    },
  },
});
