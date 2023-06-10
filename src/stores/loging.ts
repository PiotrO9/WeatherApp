import { defineStore } from "pinia";

export const useLoging = defineStore("Logged", {
  state: () => ({
    isLogged: Boolean,
  }),
  getters: {
    isLogged() {
      return this.isLogged;
    },
  },
  actions: {
    loginUser() {},
    logoutUser() {},
  },
});
