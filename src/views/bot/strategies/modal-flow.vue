<template>
  <a-modal
    v-model="modal_enabled"
    wrap-class-name="modal-flow"
    :title="title"
    :width="width"
    :footer="false"
  >
    <z-info-row
      v-for="setting in SETTING_LIST"
      :key="setting.key"
      :item="setting"
      v-model="modal_payload[setting.key]"
    />

    <a-button
      type="primary"
      :loading="loading"
      :disabled="button_disabled"
      @click="onSubmit"
    >
      {{ button_string }}
    </a-button>
  </a-modal>
</template>

<script lang="ts">
import { QuantexController } from "@/controllers";
import { runNotice } from "@/mixins";
import ZModalMixin from "@/mixins/z-modal";
import { Component, Mixins } from "vue-property-decorator";

type ModalType = "edit" | "new";

@Component
export default class ModalExchange extends Mixins(ZModalMixin) {
  loading = false;
  modal_type?: ModalType = null;
  modal_payload: Quantex.StrategyFlow = {};
  strategy: Quantex.Strategy = {};

  get title() {
    return this.modal_type === "edit"
      ? "Edit Strategy Flow"
      : "Create Strategy Flow";
  }

  get SETTING_LIST() {
    console.log(this.strategy)
    if (this.strategy.type == "copy") {
      return [
        {
          title: "Period",
          key: "period",
          value: this.modal_payload?.period,
          type: "input",
          edit: true
        },
        {
          title: "Spread asks",
          key: "spread_asks",
          value: this.modal_payload?.spread_asks,
          type: "input",
          edit: true
        },
        {
          title: "Spread bids",
          key: "spread_bids",
          value: this.modal_payload?.spread_bids,
          type: "input",
          edit: true
        },
        {
          title: "Levels size",
          key: "levels_size",
          value: this.modal_payload?.levels_size,
          type: "input",
          edit: true
        },
        {
          title: "Levels count",
          key: "levels_count",
          value: this.modal_payload?.levels_count,
          type: "input",
          edit: true
        },
        {
          title: "Levels start",
          key: "levels_start",
          value: this.modal_payload?.levels_start,
          type: "input",
          edit: true
        },
        {
          title: "State",
          key: "state",
          value: this.modal_payload.state,
          type: "select",
          list: {
            enabled: "Enabled",
            disabled: "Disabled"
          }
        }
      ];
    } else {
      return [
        {
          title: "Period",
          key: "period",
          value: this.modal_payload?.period,
          type: "input",
          edit: true
        },
        {
          title: "State",
          key: "state",
          value: this.modal_payload.state,
          type: "select",
          list: {
            enabled: "Enabled",
            disabled: "Disabled"
          }
        }
      ]
    }
  }

  get button_disabled() {
    return this.loading;
  }

  get button_string() {
    return this.modal_type === "edit" ? "Edit" : "Create";
  }

  onCreate(payload: {
    type: ModalType;
    payload: Quantex.StrategyFlow;
    strategy: Quantex.Strategy;
  }) {
    this.modal_type = payload.type;
    if (this.modal_type == "edit") {
      this.modal_payload = payload.payload;
    } else {
      this.modal_payload = {};
    }
    this.strategy = payload.strategy;
  }

  async onSubmit() {
    this.loading = true;
    const payload: Quantex.StrategyFlow = {
      strategy_id: this.strategy.id,
      period: Number(this.modal_payload.period),
      state: this.modal_payload.state
    };

    if (this.strategy.type == "copy") {
      payload.spread_asks = this.modal_payload.spread_asks;
      payload.spread_bids = this.modal_payload.spread_bids;
      payload.levels_size = this.modal_payload.levels_size;
      payload.levels_count = Number(this.modal_payload.levels_count);
      payload.levels_start = Number(this.modal_payload.levels_start);
    }

    try {
      if (this.modal_type == "edit") {
        payload.id = this.modal_payload.id;
        await QuantexController.update_strategy_flow(payload);
        runNotice("success", "Strategy flow update successfully");
      } else {
        await QuantexController.create_strategy_flow(payload);
        runNotice("success", "Strategy flow created successfully");
      }
      this.$emit("updated");
      this.delete();
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="less">
.modal-flow {
  .ant-modal-body {
    button {
      margin-top: 12px;
      width: 100%;
    }
  }
}
</style>
