import { defineStore } from "pinia";
import CityDatas from "../types/CityDatas";

export const useSelectedCities = defineStore("SelectedCities", {
  state: () => ({
    SelectedCities: [] as CityDatas[],
  }),
  getters: {
    getSelectedCities(): CityDatas[] {
      return this.SelectedCities;
    },
  },
  actions: {
    setSelectedCities(selectedCities: CityDatas[]) {
      this.SelectedCities = selectedCities;
    },
    removeCity(cityName: string) {
      this.SelectedCities = this.SelectedCities.filter(
        (city: CityDatas) => city.name !== cityName
      );
    },
  },
});
