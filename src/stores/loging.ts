import { defineStore } from "pinia";

interface LoginState {
  rememberedState: boolean;
  loggedState: boolean;
}

export const useLogin = defineStore("Logged", {
  state: (): LoginState => ({
    rememberedState: false,
    loggedState: false,
  }),
  getters: {
    isRemembered(): boolean {
      this.rememberedState = !!localStorage.getItem("isRemembered");
      return this.rememberedState;
    },
    isLogged(): boolean {
      return this.loggedState;
    },
  },
  actions: {
    setRememberUser() {
      localStorage.setItem("isRemembered", String(true));
      this.rememberedState = true;
    },
    loginUser() {
      this.loggedState = true;
    },
    logoutUser() {
      localStorage.removeItem("isRemembered");
      this.loggedState = false;
      this.rememberedState = false;
    },
  },
});
