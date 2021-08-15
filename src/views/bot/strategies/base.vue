<template>
  <a-layout-content class="page-bot-strategies">
    <z-table
      class="strategies-table"
      :loading="loading"
      :columns="COLUMN"
      :data="strategies"
      :hover="true"
      :scroll="false"
      :pagination="false"
      @click="item => $router.push('/bot/strategies/' + item.id)"
    >
      <template slot="target_market" slot-scope="{ item, column }">
        <span :class="`target_market text-${column.algin}`">
          {{
            [
              get_market(item.target_market_id).ask,
              get_market(item.target_market_id).bid
            ]
              .join("/")
              .toUpperCase()
          }}
          - ({{
            get_exchange(get_market(item.target_market_id).exchange_id).name
          }})
        </span>
      </template>
      <template slot="action" slot-scope="{ item, column }">
        <span :class="`action text-${column.algin}`">
          <span @click.stop.prevent>
            <a-switch
              :checked="item.state == 'enabled'"
              :loading="item.loading"
              @click="
                update_strategy_state(
                  item,
                  item.state == 'enabled' ? 'disabled' : 'enabled'
                )
              "
            >
              <a-icon slot="checkedChildren" type="check" />
              <a-icon slot="unCheckedChildren" type="close" />
            </a-switch>
          </span>
        </span>
      </template>
    </z-table>
  </a-layout-content>
</template>

<script lang="ts">
import ZSmartModel from "@zsmartex/z-eventbus";
import { QuantexController } from "@/controllers";
import { Vue, Component } from "vue-property-decorator";
import { runNotice } from "@/mixins";

@Component
export default class Base extends Vue {
  loading = false;
  limit = 50;
  page = 1;
  exchanges = Array<Quantex.Exchange>();
  markets = Array<Quantex.Market>();
  strategies = Array<Quantex.Strategy>();
  COLUMN = [
    { title: "ID", key: "id", algin: "left" },
    { title: "Type", key: "type", algin: "left" },
    { title: "Side", key: "side", algin: "left" },
    {
      title: "Target Market",
      key: "target_market",
      algin: "left",
      scopedSlots: true
    },
    { title: "Action", key: "action", algin: "right", scopedSlots: true }
  ];
  redo_loading?: number = null;

  async mounted() {
    this.loading = true;
    await this.get_exchanges();
    await this.get_markets();
    await this.get_strategies();
    this.set_action_header();
  }

  set_action_header() {
    this.$route.meta["action-header"] = [
      {
        title: "Add Strategy",
        key: "add_strategy",
        icon: "plus-circle",
        callback: () => {
          this.$router.push("/bot/strategies/new");
        }
      }
    ];

    this.$nextTick(() => {
      ZSmartModel.emit("set-action-header");
    });
  }

  async get_markets() {
    try {
      const { data } = await QuantexController.get_markets();
      this.markets = data;
    } catch (error) {
      return error;
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

  async get_strategies() {
    this.loading = true;
    try {
      const { data } = await QuantexController.get_strategies();
      this.strategies = data;
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }

  async update_strategy_state(
    strategy: Quantex.Strategy,
    state: Quantex.StrategyState
  ) {
    const payload: Quantex.Strategy = {
      id: strategy.id,
      side: strategy.side,
      type: strategy.type,
      enable_orderback: strategy.enable_orderback,
      target_market_id: strategy.target_market_id,
      source_market_ids: strategy.source_market_ids,
      state: state
    };

    const strategies = [...this.strategies];
    const index = this.strategies.findIndex(s => s.id == strategy.id);
    this.strategies[index].loading = true;
    this.strategies = strategies;
    this.$forceUpdate();

    try {
      const strategies = [...this.strategies];
      const { data } = await QuantexController.update_strategy(payload);
      runNotice("success", "Strategy updated successfully");
      strategies[index] = data;
      this.strategies = strategies;
      this.$forceUpdate();
    } catch (error) {
      return error;
    } finally {
      this.strategies[index].loading = null;
    }
  }

  get_market(id: number) {
    return this.markets.find(market => market.id == id);
  }

  get_exchange(id: number) {
    return this.exchanges.find(exchange => exchange.id == id);
  }
}
</script>

<style lang="less">
.page-bot-strategies .strategies-table {
  .ic-action {
    i {
      font-size: 20px;
      margin: 0 12px;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.45);

      &.redo-loading {
        animation: loadingCircle 1s infinite linear;
      }
    }
  }
}
</style>
