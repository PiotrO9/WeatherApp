import { defineStore } from "pinia";

export const useAside = defineStore("Aside", {
  state: () => ({
    asideOpenState: false,
  }),
  getters: {
    getAsideOpenState(): boolean {
      return this.asideOpenState;
    },
  },
  actions: {
    toggleAsideOpenState() {
      this.asideOpenState = !this.asideOpenState;
    },
  },
});
