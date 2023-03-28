import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/sass/index.sass";

Vue.config.productionTip = false;

// Subscribe to store updates
store.subscribe((mutation, { CURRENCY_LIST }) => {
  localStorage.setItem("CURRENCY_LIST", JSON.stringify(CURRENCY_LIST.captions));
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
