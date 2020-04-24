<template>
  <a-layout-content v-if="!loading" class="page-settings-fee-schedules">
    <z-table
      :loading="loading"
      :columns="COLUMN"
      :data="trading_fees"
      :hover="true"
      :scroll="false"
      :pagination="true"
      :total="total"
      :page="page"
      :page-size="limit"
      @change-pagination="get_trading_fees"
      @click="on_table_click"
    ></z-table>
  </a-layout-content>
</template>

<script lang="ts">
import store from "@/store";
import { GET_TRADING_FEES } from "@/store/types";
import { StoreTypes } from "types";
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  loading = false;
  data: StoreTypes.TradingFee[] = [];
  page = 1;
  total = 0;
  limit = 50;
  readonly COLUMN = [
    { title: "Id", key: "id", algin: "left" },
    { title: "Group", key: "group", algin: "left" },
    { title: "Market", key: "market_id", algin: "left" },
    { title: "Maker fee", key: "maker", algin: "left" },
    { title: "Taker fee", key: "taker", algin: "left" }
  ];

  get trading_fees() {
    return this.data.map(trading_fee => {
      trading_fee.market_id = trading_fee.market_id.toUpperCase();
      trading_fee.maker = trading_fee.maker + "%";
      trading_fee.taker = trading_fee.taker + "%";

      return trading_fee;
    });
  }

  mounted() {
    this.get_trading_fees({
      page: this.page,
      limit: this.limit
    });
  }

  async get_trading_fees(payload) {
    try {
      const { data, headers } = await store.dispatch(GET_TRADING_FEES, payload);
      this.total = Number(headers.total);
      this.page = Number(headers.page);
      this.limit = Number(headers["per-page"]);
      this.data = data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      return error;
    }
  }
}
</script>
