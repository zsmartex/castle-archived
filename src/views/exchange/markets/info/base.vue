<template>
  <a-layout-content class="page-exchange-markets info">
    <a-tabs v-if="!loading" defaultActiveKey="1">
      <a-tab-pane tab="Orderbook" key="1">
        <orderbook :market="market" />
      </a-tab-pane>
      <a-tab-pane tab="Configuration" key="2">
        <configuration :market="market" />
      </a-tab-pane>
    </a-tabs>
  </a-layout-content>
</template>

<script lang="ts">
import store from "@/store";
import { StoreTypes } from "types";
import { GET_MARKET } from "@/store/types";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    orderbook: () => import("./orderbook.vue"),
    configuration: () => import("./configuration.vue")
  }
})
export default class App extends Vue {
  loading = false;
  market: StoreTypes.Market | null = null;

  get market_id() {
    return this.$route.params.market;
  }

  beforeMount() {
    this.get_market();
  }

  async get_market() {
    const { market_id } = this;
    this.loading = true;

    try {
      const { data } = await store.dispatch(GET_MARKET, market_id);
      this.market = data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      return error;
    }
  }
}
</script>

<style lang="less">
@import "~@styles/views/exchange/markets/info";
</style>
