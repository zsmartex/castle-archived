<template>
  <a-layout-content class="page-exchange-currencies">
    <z-table
      :loading="loading"
      :columns="COLUMN"
      :data="currencies_data"
      :hover="true"
      :scroll="false"
      :pagination="true"
      :total="total"
      :page="page"
      :page-size="limit"
      @change-pagination="get_currencies"
      @click="on_table_click"
    >
      <template slot="action" slot-scope="{ item, column }">
        <span :class="`action text-${column.algin}`">
          <a-icon type="right" />
        </span>
      </template>
    </z-table>
    <z-filter-drawer ref="filter" @submit="onDrawerSubmit('filter')">
      <z-info-row
        v-for="item in filter_list"
        v-model="payload_filter[item.key]"
        :item="item"
        :key="item.key"
      >
      </z-info-row>
    </z-filter-drawer>
  </a-layout-content>
</template>

<script lang="ts">
import ZSmartModel from "@zsmartex/z-eventbus";
import helpers from "@zsmartex/z-helpers";
import store from "@/store";
import { StoreTypes } from "types";
import { GET_CURRENCIES } from "@/store/types";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  loading = false;
  data: StoreTypes.Currency[] = [];
  page = 1;
  total = 0;
  limit = 50;
  payload_filter = {
    type: ""
  };
  private readonly COLUMN = [
    { title: "Code", key: "code", algin: "left" },
    { title: "Name", key: "name", algin: "left" },
    { title: "Symbol", key: "symbol", algin: "left" },
    { title: "Type", key: "type", algin: "left" },
    { title: "Created", key: "created_at", algin: "left" },
    { title: "Visible", key: "visible", algin: "left" },
    { title: "Deposit", key: "deposit_enabled", algin: "left" },
    { title: "Withdrawal", key: "withdrawal_enabled", algin: "left" },
    { title: "", key: "action", algin: "center", scopedSlots: true }
  ];

  get filter_list() {
    return [
      {
        title: "Type",
        key: "type",
        value: this.payload_filter.type,
        type: "input",
        edit: true
      }
    ];
  }

  get currencies_data() {
    return this.data.map(currency => {
      currency.code = currency.code.toUpperCase();
      (currency as any).created_at = helpers.getDate(
        currency.created_at as Date,
        true
      );

      return currency;
    });
  }

  mounted() {
    this.get_currencies({
      limit: this.limit,
      page: this.page
    });
    this.set_action_header();
  }

  set_action_header() {
    this.$route.meta["action-header"] = [
      {
        title: "Add Currency",
        key: "add_currency",
        icon: "plus-circle",
        callback: () => {
          this.$router.push("/exchange/currencies/add");
        }
      },
      {
        title: "Filter",
        key: "filter",
        icon: "funnel-plot",
        callback: () => {
          (this.$refs.filter as any).create();
        }
      }
    ];

    this.$nextTick(() => {
      ZSmartModel.emit("set-action-header");
    });
  }

  async get_currencies(payload) {
    this.loading = true;
    try {
      const { data, headers } = await store.dispatch(GET_CURRENCIES, payload);
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
    this.$router.push(`/exchange/currencies/${item.code.toLowerCase()}/edit`);
  }

  onDrawerSubmit(drawer: string) {
    this.get_currencies(this.payload_filter);
  }
}
</script>

<style lang="less">
@import "~@styles/views/exchange/currencies/base";
</style>