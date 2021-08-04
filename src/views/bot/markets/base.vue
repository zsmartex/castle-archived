<template>
  <a-layout-content class="page-bot-exchanges">
    <z-table
      :loading="loading"
      :columns="COLUMN"
      :data="markets"
      :hover="true"
      :scroll="false"
      :pagination="false"
      @click="
        item =>
          this.$refs['modal-market'].create({
            type: 'edit',
            payload: item,
            exchanges: this.exchanges
          })
      "
    >
      <template slot="symbol" slot-scope="{ item, column }">
        <span :class="['symbol', `text-${column.algin}`]">
          {{ (item.ask + "/" + item.bid).toUpperCase() }}
        </span>
      </template>
      <template slot="exchange" slot-scope="{ item, column }">
        <span :class="['exchange', `text-${column.algin}`]">
          {{ get_exchange_name(item.exchange_id) }}
        </span>
      </template>
    </z-table>

    <modal-market ref="modal-market" @updated="get_markets" />
  </a-layout-content>
</template>

<script lang="ts">
import ZSmartModel from "@zsmartex/z-eventbus";
import { QuantexController } from "@/controllers";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "modal-market": () => import("./modal-market.vue")
  }
})
export default class Base extends Vue {
  loading = false;
  limit = 50;
  page = 1;
  markets = Array<Quantex.Market>();
  exchanges = Array<Quantex.Exchange>();
  COLUMN = [
    { title: "Symbol", key: "symbol", algin: "left", scopedSlots: true },
    { title: "Exchange", key: "exchange", algin: "left", scopedSlots: true },
    { title: "Limit asks", key: "limit_asks_base", algin: "left" },
    { title: "Limit bids", key: "limit_bids_base", algin: "left" },
    { title: "Base precision", key: "base_precision", algin: "left" },
    { title: "Quote precision", key: "quote_precision", algin: "left" },
    { title: "Action", key: "action", algin: "center" }
  ];

  mounted() {
    this.get_exchanges();
    this.get_markets();
    this.set_action_header();
  }

  set_action_header() {
    this.$route.meta["action-header"] = [
      {
        title: "Add Market",
        key: "add_exchange",
        icon: "plus-circle",
        callback: () => {
          (this.$refs["modal-market"] as any).create({
            type: "create",
            exchanges: this.exchanges
          });
        }
      }
    ];

    this.$nextTick(() => {
      ZSmartModel.emit("set-action-header");
    });
  }

  async get_markets() {
    this.loading = true;
    try {
      const { data } = await QuantexController.get_markets();
      this.markets = data;
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }

  async get_exchanges() {
    try {
      const { data } = await QuantexController.get_exchanges();
      this.exchanges = data;
    } catch (error) {
      return error;
    }
  }

  get_exchange_name(exchange_id: number) {
    return this.exchanges.find(exchange => exchange.id == exchange_id)?.name;
  }
}
</script>
