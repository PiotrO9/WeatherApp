import { defineStore } from "pinia";
import { transliterate } from "transliteration";

interface AsideState {
  asideOpenState: boolean;
  selectedCityName: string;
}

export const useAsideStore = defineStore("AsideState", {
  state: (): AsideState => ({
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
