<template>
  <div class="configuration">
    <div class="configuration-head">
      <div class="configuration-title">
        <div>Setting</div>
        <div class="note">Last updated: {{ getDate(market.updated_at) }}</div>
      </div>
      <z-info-row :item="setting_head_list">
        <template slot="state">
          <span style="margin-right: 8px">
            {{ market_status ? "Enabled" : "Disabled" }}
          </span>
          <span>
            <a-switch v-model="market_status" />
          </span>
        </template>
      </z-info-row>
    </div>
    <div class="configuration-content">
      <z-info-row
        v-for="setting in setting_list"
        v-model="market[setting.key]"
        :key="setting.key"
        :item="setting"
      />
      <div class="configuration-action">
        <a-button type="primary" @click="update_market">Submit</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import helpers from "@zsmartex/z-helpers";
import { UPDATE_MARKET } from "@/store/types";
import { StoreTypes } from "types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class App extends Vue {
  @Prop() readonly market!: StoreTypes.Market;

  getDate(date: Date, allow_year = true) {
    return helpers.getDate(date, allow_year);
  }

  get setting_head_list() {
    return {
      title: "Status",
      key: "state",
      value: this.market_status,
      style: "width: auto",
      style_title: "text-align: right",
      style_content:
        "justify-content: space-between;display: flex;flex-wrap: wrap",
      type: "slot"
    };
  }

  get setting_list() {
    return [
      {
        title: "Market name",
        key: "name",
        value: this.market.name,
        style: "width: 30%",
        type: "input",
        edit: false
      },
      {
        title: "Base currency",
        key: "base_unit",
        value: this.market.base_unit.toUpperCase(),
        style: "width: 30%",
        type: "input",
        edit: false
      },
      {
        title: "Quote currency",
        key: "quote_unit",
        value: this.market.quote_unit.toUpperCase(),
        style: "width: 30%",
        type: "input",
        edit: false
      },
      {
        title: "Min price",
        key: "min_price",
        value: this.market.min_price,
        style: "width: 30%",
        type: "input",
        edit: true
      },
      {
        title: "Max price",
        key: "max_price",
        value: this.market.max_price,
        style: "width: 30%",
        type: "input",
        edit: true
      },
      {
        title: "Min amount",
        key: "min_amount",
        value: this.market.min_amount,
        style: "width: 30%",
        type: "input",
        edit: true
      },
      {
        title: "Price precision",
        key: "price_precision",
        value: this.market.price_precision,
        style: "width: 30%",
        type: "input",
        edit: true
      },
      {
        title: "Amount precision",
        key: "amount_precision",
        value: this.market.amount_precision,
        style: "width: 30%",
        type: "input",
        edit: true
      },
      {
        title: "Total precision",
        key: "total_precision",
        value: this.market.total_precision,
        style: "width: 30%",
        type: "input",
        edit: true
      },
      {
        title: "Position",
        key: "position",
        value: this.market.position,
        style: "width: 30%",
        type: "input",
        edit: true
      }
    ];
  }

  get market_status() {
    return this.market.state === "enabled";
  }

  set market_status(enabled: boolean) {
    this.market.state = enabled ? "enabled" : "disabled";
  }

  async update_market() {
    try {
      await store.dispatch(UPDATE_MARKET, {
        id: this.market.id,
        min_price: this.market.min_price,
        max_price: this.market.max_price,
        min_amount: this.market.min_amount,
        price_precision: this.market.price_precision,
        amount_precision: this.market.amount_precision,
        total_precision: this.market.total_precision,
        position: this.market.position,
        state: this.market.state
      });
      this.$router.push("/exchange/markets");
    } catch (error) {
      return error;
    }
  }
}
</script>
