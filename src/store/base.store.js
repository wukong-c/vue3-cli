import { defineStore } from "pinia";

export default defineStore("base", {
  state() {
    return {
      name: "Hello World",
    };
  },
  actions: {},
  getters: {},
});
