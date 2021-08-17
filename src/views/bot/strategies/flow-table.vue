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
        { title: "Spread asks", key: "spread_asks", algin: "left" },
        { title: "Spread bids", key: "spread_bids", algin: "left" },
        { title: "Levels size", key: "levels_size", algin: "center" },
        { title: "Levels count", key: "levels_count", algin: "right" },
        { title: "Levels start", key: "levels_start", algin: "right" },
        { title: "Action", key: "action", algin: "right", scopedSlots: true }
      ];
    } else {
      return [
        { title: "ID", key: "id", algin: "left" },
        { title: "Period", key: "period", algin: "left" },
        { title: "Action", key: "action", algin: "right" }
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
      payload.spread_asks = flow.spread_asks;
      payload.spread_bids = flow.spread_bids;
      payload.levels_size = flow.levels_size;
      payload.levels_count = Number(flow.levels_count);
      payload.levels_start = Number(flow.levels_start);
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
