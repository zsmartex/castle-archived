<template>
  <div class="flow-table">
    <z-table
      :columns="FLOW_COLUMN"
      :data="flows"
      :hover="true"
      :scroll="false"
      :pagination="false"
      :loading="loading"
      @click="
        item =>
          this.$refs['modal-flow'].create({
            type: 'edit',
            payload: item,
            strategy: this.strategy
          })
      "
    >
      <template slot="spread_asks" slot-scope="{ item, column }">
        <span :class="`spread_asks text-${column.algin}`">
          {{ item.options.spread_asks }}
        </span>
      </template>
      <template slot="spread_bids" slot-scope="{ item, column }">
        <span :class="`spread_bids text-${column.algin}`">
          {{ item.options.spread_bids }}
        </span>
      </template>
      <template slot="levels_size" slot-scope="{ item, column }">
        <span :class="`levels_size text-${column.algin}`">
          {{ item.options.levels_size }}
        </span>
      </template>
      <template slot="levels_count" slot-scope="{ item, column }">
        <span :class="`levels_count text-${column.algin}`">
          {{ item.options.levels_count }}
        </span>
      </template>
      <template slot="levels_start" slot-scope="{ item, column }">
        <span :class="`levels_start text-${column.algin}`">
          {{ item.options.levels_start }}
        </span>
      </template>
      <template slot="action" slot-scope="{ item, column }">
        <span :class="`action text-${column.algin}`">
          <span @click.stop.prevent>
            <a-switch
              :checked="item.state == 'enabled'"
              :loading="item.loading"
              @click="
                update_strategy_flow_state(
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
    <div class="add-flow">
      <a-button type="primary" @click="add_flow">ADD FLOW</a-button>
    </div>
    <modal-flow ref="modal-flow" @updated="get_flows" />
  </div>
</template>

<script lang="ts">
import { QuantexController } from "@/controllers";
import { runNotice } from "@/mixins";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "modal-flow": () => import("./modal-flow.vue")
  }
})
export default class FlowTable extends Vue {
  @Prop() readonly strategy!: Quantex.Strategy;

  loading = false;
  flows = Array<Quantex.StrategyFlow>();

  get FLOW_COLUMN() {
    if (this.strategy.type == "copy") {
      return [
        { title: "ID", key: "id", algin: "left" },
        { title: "Period", key: "period", algin: "left" },
        { title: "Spread asks", key: "spread_asks", algin: "left", scopedSlots: true },
        { title: "Spread bids", key: "spread_bids", algin: "left", scopedSlots: true },
        { title: "Levels size", key: "levels_size", algin: "center", scopedSlots: true },
        { title: "Levels count", key: "levels_count", algin: "right", scopedSlots: true },
        { title: "Levels start", key: "levels_start", algin: "right", scopedSlots: true },
        { title: "Action", key: "action", algin: "right", scopedSlots: true }
      ];
    } else {
      return [
        { title: "ID", key: "id", algin: "left" },
        { title: "Period", key: "period", algin: "left" },
        { title: "Action", key: "action", algin: "right", scopedSlots: true }
      ];
    }
  }

  mounted() {
    this.get_flows();
  }

  async get_flows() {
    this.loading = true;
    try {
      const { data } = await QuantexController.get_strategy_flows(
        this.strategy.id
      );
      this.flows = data;
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }

  add_flow() {
    (this.$refs["modal-flow"] as any).create({
      type: "create",
      strategy: this.strategy
    });
  }

  async update_strategy_flow_state(
    flow: Quantex.StrategyFlow,
    state: Quantex.StrategyState
  ) {
    const payload: Quantex.StrategyFlow = {
      id: flow.id,
      strategy_id: this.strategy.id,
      period: Number(flow.period),
      state: state
    };

    const index = this.flows.findIndex(s => s.id == flow.id);
    Vue.set(this.flows[index], "loading", true);

    if (this.strategy.type == "copy") {
      payload.options = {
        spread_asks: flow.options.spread_asks,
        spread_bids: flow.options.spread_bids,
        levels_size: flow.options.levels_size,
        levels_count: Number(flow.options.levels_count),
        levels_start: Number(flow.options.levels_start),
      }
    }

    try {
      const { data } = await QuantexController.update_strategy_flow(payload);
      runNotice("success", "Strategy flow update successfully");
      Vue.set(this.flows, index, data);
    } catch (error) {
      return error;
    } finally {
      Vue.set(this.flows[index], "loading", false);
    }
  }
}
</script>

<style lang="less">
.page-bot-strategies .flow-table {
  margin-top: 12px;

  .add-flow {
    width: 100%;
    margin: 12px auto 0;
    text-align: center;
  }
}
</style>
