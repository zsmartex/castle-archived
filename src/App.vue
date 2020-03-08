<template>
  <body>
    <a-layout>
      <router-view v-if="isReady" />
      <div v-else>LOADING</div>
    </a-layout>
  </body>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store from "@/store";
import * as helpers from "@zsmartex/z-helpers";

@Component
export default class App extends Vue {
  ready: boolean;
  constructor() {
    super();
    this.ready = false;
  }

  get isReady() {
    return this.ready || this.checkData();
  }

  checkData() {
    if (this.ready) return;
    const {
      currencies,
      markets,
      tickers,
      sparklines,
      global_price
    } = store.state.public;
    const isAuth = helpers.isAuth();
    const authStatus = helpers.authStatus();
    const balances = helpers.getBalance();

    if (
      currencies.length &&
      markets.length &&
      Object.keys(tickers).length &&
      Object.keys(sparklines).length &&
      Object.keys(global_price).length &&
      authStatus != "loading" &&
      this.$store.state.user.checkLogged
    ) {
      if (isAuth && authStatus === "active") {
        if (balances.length) {
          store.dispatch("public/PAGE_READY");
          return (this.ready = true);
        }
      } else {
        store.dispatch("public/PAGE_READY");
        return (this.ready = true);
      }
    }
  }
}
</script>
