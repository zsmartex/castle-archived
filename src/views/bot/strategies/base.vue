<template>
  <a-layout-content class="page-bot-strategies">
    <z-table
      class="strategies-table"
      :loading="strategies.loading"
      :columns="COLUMN"
      :data="strategies.data"
      :hover="true"
      :scroll="false"
      :pagination="false"
      @click="item => $router.push('/bot/strategies/' + item.id)"
    >
      <template slot="type" slot-scope="{ item, column }">
        <span :class="`type text-${column.algin}`">
          {{ item.type.toUpperCase() }}
        </span>
      </template>
      <template slot="side" slot-scope="{ item, column }">
        <span :class="`side text-${column.algin}`">
          {{ item.side.toUpperCase() }}
        </span>
      </template>
      <template slot="target_market" slot-scope="{ item, column }">
        <span :class="`target_market text-${column.algin}`">
          {{ get_market_name(item.target_market_id) }}
          - ({{
            get_exchange_name(get_market_exchange_id(item.target_market_id))
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
            <a-icon
              type="delete"
              theme="filled"
              @click.stop="delete_strategy(item.id)"
            />
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

@Component
export default class Base extends Vue {
  loading = false;
  limit = 50;
  page = 1;
  COLUMN = [
    { title: "ID", key: "id", algin: "left" },
    { title: "Type", key: "type", algin: "left", scopedSlots: true },
    { title: "Side", key: "side", algin: "left", scopedSlots: true },
    {
      title: "Target Market",
      key: "target_market",
      algin: "left",
      scopedSlots: true
    },
    { title: "Action", key: "action", algin: "right", scopedSlots: true }
  ];

  get exchanges() {
    return QuantexController.exchanges;
  }

  get markets() {
    return QuantexController.markets;
  }

  get strategies() {
    return QuantexController.strategies;
  }

  async mounted() {
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

  update_strategy_state(
    strategy: Quantex.Strategy,
    state: Quantex.StrategyState
  ) {
    QuantexController.update_strategy(
      Object.assign(strategy, { state: state })
    );
  }

  get_market_name(id: number) {
    const market = this.markets.data.find(market => market.id == id);

    return (market?.ask + "/" + market?.bid).toUpperCase();
  }

  get_market_exchange_id(id: number) {
    const market = this.markets.data.find(market => market.id == id);

    return market?.exchange_id;
  }

  get_exchange_name(id: number) {
    return this.exchanges.data.find(exchange => exchange.id == id)?.name;
  }

  delete_strategy(id: number) {
    QuantexController.delete_strategy(id);
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
