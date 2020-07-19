<template>
  <a-modal
    v-model="modal_enabled"
    wrap-class-name="modal-fee-schedule"
    :title="title"
    :width="width"
    :footer="false"
  >
    <z-info-row
      v-for="setting in SETTING_LIST()"
      :key="setting.key"
      :item="setting"
      @input="value => set_cache_value(setting.key, value)"
    />

    <a-button type="primary" :disabled="button_disabled()" @click="onSubmit">
      Submit
    </a-button>
  </a-modal>
</template>

<script lang="ts">
import ZModalMixin from "@/mixins/z-modal";
import { Component, Prop, Mixins } from "vue-property-decorator";

interface Payload {
  type: "edit" | "create";
  item: PayloadItem;
}

interface PayloadItem {
  id?: number;
  group: string;
  market_id: string;
  maker: string;
  taker: string;
}

@Component
export default class ModalFeeSchedule extends Mixins(ZModalMixin) {
  @Prop() readonly markets!: Market[];

  protected payload: Payload = {
    type: "create",
    item: {
      group: "",
      maker: "",
      market_id: "",
      taker: ""
    }
  };
  protected cache_edit: PayloadItem = this.payload.item;

  private get title() {
    return this.payload?.type === "edit"
      ? "Edit fees schedule"
      : "Create fees schedule";
  }

  private button_disabled() {
    const diff_object = this.diff_object(this.payload?.item, this.cache_edit, [
      "group",
      "market_id",
      "maker",
      "taker"
    ]);
    const value_exists = this.value_exists(this.cache_edit, [
      "group",
      "market_id",
      "maker",
      "taker"
    ]);

    return diff_object || !value_exists;
  }

  private diff_object(source, target, keys: string[]) {
    const map_diff = keys.map(key => source[key] === target[key]);

    return map_diff.reduce((a, b) => a && b, true);
  }

  private value_exists(object, keys: string[]) {
    const map_exists = keys.map(key => !!object[key]);

    return map_exists.reduce((a, b) => a && b, true);
  }

  private SETTING_LIST() {
    return [
      {
        title: "Name",
        key: "group",
        value: this.cache_edit?.group,
        type: "input",
        edit: true
      },
      {
        title: "Market ID",
        key: "market_id",
        value: this.cache_edit?.market_id,
        type: "select",
        list: {
          any: "ANY",
          ...this.markets.reduce(
            (a, b) => ((a[b.id] = b.name.toUpperCase()), a),
            {}
          )
        }
      },
      {
        title: "Maker Fee",
        key: "maker",
        value: this.cache_edit?.maker,
        type: "input",
        edit: true
      },
      {
        title: "Taker Fee",
        key: "taker",
        value: this.cache_edit?.taker,
        type: "input",
        edit: true
      }
    ];
  }

  private set_cache_value(key: string, value: string) {
    (this.cache_edit as any)[key] = value;
    this.$nextTick(() => {
      this.$forceUpdate();
    });
  }

  onCreate(payload: Payload) {
    this.payload = payload;
    this.cache_edit = payload.item;
  }

  private onSubmit() {
    this.$emit("submit", {
      type: this.payload?.type,
      item: this.cache_edit
    });
  }
}
</script>

<style lang="less">
@import "~@styles/views/settings/fees-schedules/modal";
</style>
