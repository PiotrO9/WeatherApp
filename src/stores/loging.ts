import { defineStore } from "pinia";

export const useLogin = defineStore("Logged", {
  state: () => ({
    rememberedState: false,
    loggedState: false,
  }),
  getters: {
    isRembered(): boolean {
      this.rememberedState = localStorage.getItem("isRemembered")
        ? true
        : false;
      return this.rememberedState;
    },
    isLogged(): boolean {
      return this.loggedState;
    },
  },
  actions: {
    rememberUser() {
      localStorage.setItem("isRemembered", String(true));
      this.rememberedState = true;
    },
    LoginUser() {
      this.loggedState = true;
    },
    logoutUser() {
      localStorage.removeItem("isRemembered");
      this.loggedState = false;
      this.rememberedState = false;
    },
  },
});
