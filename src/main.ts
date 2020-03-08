import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/plugins";
import "@/assets/css";
import Viser from "viser-vue";

Vue.config.productionTip = false;
Vue.use(Viser);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("body");
