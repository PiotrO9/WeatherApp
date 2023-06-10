import { defineStore } from "pinia";
import CityDatas from "../types/CityDatas";
import { transliterate } from "transliteration";

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
      this.SelectedCities = [...selectedCities];
    },
    removeCity(cityName: string) {
      const transliteredCityName = transliterate(cityName);

      console.log(this.$state.SelectedCities);
      const index = this.$state.SelectedCities.findIndex(
        (city) => city.name == transliteredCityName
      );
      if (index !== -1) {
        this.getSelectedCities.splice(index, 1);
        this.setSelectedCities(this.getSelectedCities);
      }
      console.log(transliteredCityName);
    },
  },
});
