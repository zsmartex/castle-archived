<template>
  <a-layout-content class="page-exchange-trades">
    <z-table
      :loading="loading"
      :columns="COLUMN"
      :data="trades_data"
      :hover="true"
      :scroll="false"
      :pagination="true"
      :total="total"
      :page="page"
      :page-size="limit"
      @change-pagination="get_trades"
    />
    <z-filter-drawer ref="filter" @submit="onFilterSubmit">
      <z-info-row
        v-for="item in filter_list"
        v-model="payload_filter[item.key]"
        :ref="`z-info-row-${item.key}`"
        :item="item"
        :key="item.key"
      >
        <template slot="from">
          <a-date-picker
            placeholder="From date"
            @change="
              moment => (payload_filter.from = moment.toDate().toISOString())
            "
            @focus="$refs['z-info-row-from'][0].focus()"
            @blur="$refs['z-info-row-from'][0].blur()"
          />
        </template>
        <template slot="to">
          <a-date-picker
            placeholder="To date"
            @change="
              moment => (payload_filter.to = moment.toDate().toISOString())
            "
            @focus="$refs['z-info-row-to'][0].focus()"
            @blur="$refs['z-info-row-to'][0].blur()"
          />
        </template>
      </z-info-row>
    </z-filter-drawer>
  </a-layout-content>
</template>

<script lang="ts">
import ZSmartModel from "@zsmartex/z-eventbus";
import helpers from "@zsmartex/z-helpers";
import store from "@/store";
import { GET_TRADES } from "@/store/types";
import { StoreTypes } from "types";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "z-table": () => import("@/components/z-table")
  }
})
export default class App extends Vue {
  loading = false;
  data: StoreTypes.UserTrade[] = [];
  page = 1;
  total = 0;
  limit = 50;
  payload_filter = {
    uid: "",
    from: "",
    to: "",
    order_id: ""
  };

  get COLUMN() {
    return [
      { title: "Trade ID", key: "id", algin: "left" },
      { title: "Marker order email", key: "maker_order_email", algin: "left" },
      { title: "Taker order email", key: "taker_order_email", algin: "left" },
      { title: "Market UID", key: "maker_uid", algin: "left" },
      { title: "Taker UID", key: "taker_uid", algin: "left" },
      { title: "Market", key: "market", algin: "left" },
      { title: "Price", key: "price", algin: "left" },
      { title: "Amount", key: "amount", algin: "left" },
      { title: "Total", key: "total", algin: "left" },
      { title: "Side", key: "taker_type", algin: "left" },
      { title: "Trade time", key: "created_at", algin: "left" }
    ];
  }

  get filter_list() {
    return [
      {
        title: "From date",
        key: "from",
        value: this.payload_filter.from,
        type: "slot",
        style: "width: 45%"
      },
      {
        title: "To date",
        key: "to",
        value: this.payload_filter.to,
        type: "slot",
        style: "width: 45%"
      },
      {
        title: "UID",
        key: "uid",
        value: this.payload_filter.uid,
        type: "input",
        edit: true
      },
      {
        title: "Order ID",
        key: "order_id",
        value: this.payload_filter.order_id,
        type: "input",
        edit: true
      }
    ];
  }

  get trades_data() {
    return this.data.map(trade => {
      trade.market = trade.market.toUpperCase();
      (trade as any).created_at = helpers.getDate(
        trade.created_at as Date,
        true
      );

      return trade;
    });
  }

  mounted() {
    this.get_trades({
      page: this.page,
      limit: this.limit
    });
    this.set_action_header();
  }

  set_action_header() {
    this.$route.meta["action-header"] = [
      {
        title: "Filter",
        key: "filter",
        icon: "funnel-plot",
        callback: () => {
          (this.$refs.filter as any).create();
        }
      },
      {
        title: "Export",
        key: "export",
        icon: "file-zip",
        callback: async () => {
          const csvString = await helpers.jsonToCSV(
            this.data.map(order => {
              return order;
            })
          );
          helpers.saveFile(csvString, "trades.csv", {
            type: "text/csv;charset=utf-8;"
          });
        }
      }
    ];

    this.$nextTick(() => {
      ZSmartModel.emit("set-action-header");
    });
  }

  async get_trades(payload) {
    this.loading = true;
    try {
      const { data, headers } = await store.dispatch(GET_TRADES, payload);
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

  onFilterSubmit() {
    this.get_trades(this.payload_filter);
  }
}
</script>

<style lang="less">
@import "~@styles/views/exchange/trades/base";
</style>
