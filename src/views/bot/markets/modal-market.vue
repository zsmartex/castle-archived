<template>
  <a-modal
    v-model="modal_enabled"
    wrap-class-name="modal-market"
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
export default class ModalMarket extends Mixins(ZModalMixin) {
  loading = false;
  modal_type?: ModalType = null;
  modal_payload: Quantex.Market = {};
  exchanges = Array<Quantex.Exchange>();

  get title() {
    return this.modal_type === "edit" ? "Edit Exchange" : "Create Exchange";
  }

  get SETTING_LIST() {
    return [
      {
        title: "Symbol",
        key: "symbol",
        value: (
          this.modal_payload?.ask +
          "/" +
          this.modal_payload?.bid
        ).toUpperCase(),
        type: "input",
        edit: false
      },
      {
        title: "Ask",
        key: "ask",
        value: this.modal_payload?.ask,
        type: "input",
        edit: true
      },
      {
        title: "Bid",
        key: "bid",
        value: this.modal_payload?.bid,
        type: "input",
        edit: true
      },
      {
        title: "Exchange",
        key: "exchange_id",
        value: this.modal_payload.exchange_id,
        type: "select",
        list: (() => {
          return this.exchanges.reduce((obj, exchange) => {
            return {
              ...obj,
              [exchange["id"]]: exchange.name
            };
          }, {});
        })()
      },
      {
        title: "Limit Ask Amount",
        key: "limit_asks_base",
        value: this.modal_payload?.limit_asks_base,
        type: "input",
        edit: true
      },
      {
        title: "Limit Bid Amount",
        key: "limit_bids_base",
        value: this.modal_payload?.limit_bids_base,
        type: "input",
        edit: true
      },
      {
        title: "Base Precision",
        key: "base_precision",
        value: this.modal_payload?.base_precision,
        type: "input",
        edit: true
      },
      {
        title: "Quote Precision",
        key: "quote_precision",
        value: this.modal_payload?.quote_precision,
        type: "input",
        edit: true
      }
    ].filter(item => {
      if (item.key == "ask" && this.modal_type == "edit") return false;
      if (item.key == "bid" && this.modal_type == "edit") return false;

      return true;
    });
  }

  get button_disabled() {
    return this.loading;
  }

  get button_string() {
    return this.modal_type === "edit" ? "Edit" : "Create";
  }

  onCreate(payload: {
    type: ModalType;
    payload: Quantex.Market;
    exchanges: Quantex.Exchange[];
  }) {
    this.modal_type = payload.type;
    if (this.modal_type == "edit") {
      this.modal_payload = payload.payload;
    } else {
      this.modal_payload = {
        ask: "",
        bid: "",
        exchange_id: null,
        limit_asks_base: null,
        limit_bids_base: null,
        base_precision: null,
        quote_precision: null
      };
    }

    this.exchanges = payload.exchanges;
  }

  async onSubmit() {
    this.loading = true;
    let payload = {
      exchange_id: Number(this.modal_payload.exchange_id),
      limit_asks_base: this.modal_payload.limit_asks_base,
      limit_bids_base: this.modal_payload.limit_bids_base,
      base_precision: Number(this.modal_payload.base_precision),
      quote_precision: Number(this.modal_payload.quote_precision)
    };

    try {
      if (this.modal_type == "edit") {
        await QuantexController.update_market(
          Object.assign(payload, { id: this.modal_payload.id })
        );
        runNotice("success", "Market update successfully");
      } else {
        payload = Object.assign(payload, {
          ask: this.modal_payload.ask,
          bid: this.modal_payload.bid
        });
        await QuantexController.create_market(payload);
        runNotice("success", "Market created successfully");
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
.modal-market {
  .ant-modal-body {
    button {
      margin-top: 12px;
      width: 100%;
    }
  }
}
</style>
