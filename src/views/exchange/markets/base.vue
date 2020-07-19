<template>
  <a-layout-content class="page-exchange-markets">
    <z-table
      :loading="loading"
      :columns="COLUMN"
      :data="markets_data"
      :hover="true"
      :scroll="false"
      :pagination="true"
      :total="total"
      :page="page"
      :page-size="limit"
      @change-pagination="get_markets"
      @click="on_table_click"
    >
      <template slot="info" slot-scope="{ column }">
        <span :class="`info text-${column.algin}`">
          <a-icon type="right" />
        </span>
      </template>
    </z-table>
  </a-layout-content>
</template>

<script lang="ts">
import ZSmartModel from "@zsmartex/z-eventbus";
import store from "@/store";
import { getDate } from "@zsmartex/z-helpers";
import { GET_MARKETS } from "@/store/types";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  loading = false;
  data: Market[] = [];
  page = 1;
  total = 0;
  limit = 50;

  private readonly COLUMN = [
    { title: "Market ID", key: "name", algin: "left" },
    { title: "Price precision", key: "price_precision", algin: "left" },
    { title: "Amount precision", key: "amount_precision", algin: "left" },
    { title: "Total precision", key: "total_precision", algin: "left" },
    { title: "Min Price", key: "min_price", algin: "left" },
    { title: "Max Price", key: "max_price", algin: "left" },
    { title: "Min Amount", key: "min_amount", algin: "left" },
    { title: "Created", key: "created_at", algin: "left" },
    { title: "Status", key: "state", algin: "left" },
    { title: "", key: "info", algin: "center", scopedSlots: true }
  ];

  get markets_data() {
    return this.data.map(market => {
      (market as any).created_at = getDate(market.created_at as Date, true);

      return market;
    });
  }

  mounted() {
    this.get_markets({ limit: this.limit, page: this.page });
    this.set_action_header();
  }

  set_action_header() {
    this.$route.meta["action-header"] = [
      {
        title: "Add Market",
        key: "add_market",
        icon: "plus-circle",
        callback: () => {
          this.$router.push("/exchange/markets/add");
        }
      }
    ];

    this.$nextTick(() => {
      ZSmartModel.emit("set-action-header");
    });
  }

  async get_markets(payload) {
    this.loading = true;
    try {
      const { data, headers } = await store.dispatch(GET_MARKETS, payload);
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

  on_table_click(item) {
    this.$router.push(`/exchange/markets/${item.id.toLowerCase()}/info`);
  }
}
</script>

<style lang="less">
@import "~@styles/views/exchange/markets/base";
</style>
