import { defineStore } from "pinia";
import { transliterate } from "transliteration";

export const useAside = defineStore("AsideState", {
  state: () => ({
    asideOpenState: false,
    selectedCityName: "",
  }),
  getters: {
    getAsideOpenState(): boolean {
      return this.asideOpenState;
    },
    getSelectedCityName(): string {
      return this.selectedCityName;
    },
  },
  actions: {
    toggleAsideOpenState() {
      this.asideOpenState = !this.asideOpenState;
    },
    setSelectedCountry(newCityName: string) {
      this.selectedCityName = transliterate(newCityName);
    },
  },
});
