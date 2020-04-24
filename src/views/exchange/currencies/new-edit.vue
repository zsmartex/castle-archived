<template>
  <a-layout-content v-if="!loading" class="page-exchange-currencies edit">
    <z-configuration>
      <div class="z-edit-panel">
        <div class="z-edit-panel-content">
          <z-info-row
            v-for="setting in SETTING_PANEL_LEFT"
            v-model="currency[setting.key]"
            :key="setting.key"
            :item="setting"
          >
            <template v-if="setting.type === 'slot'" :slot="setting.key">
              <span>
                {{ currency[setting.key] ? "Enabled" : "Disabled" }}
              </span>
              <span>
                <a-switch v-model="currency[setting.key]" />
              </span>
            </template>
          </z-info-row>
        </div>
      </div>
      <div class="z-edit-panel">
        <div class="z-edit-panel-content">
          <z-info-row
            v-for="setting in SETTING_PANEL_RIGHT"
            v-model="currency[setting.key]"
            :key="setting.key"
            :item="setting"
          >
            <template v-if="setting.type === 'slot'" :slot="setting.key">
              <span>
                {{ currency[setting.key] ? "Enabled" : "Disabled" }}
              </span>
              <span>
                <a-switch v-model="currency[setting.key]" />
              </span>
            </template>
          </z-info-row>
        </div>
      </div>
    </z-configuration>
    <z-configuration>
      <div class="z-edit-panel">
        <div class="z-edit-panel-head">
          <div class="z-edit-panel-title">
            Properties
          </div>
          <div class="add-property">
            <a-popover placement="bottomRight" trigger="click">
              <template slot="content">
                <z-info-row
                  class="add-property"
                  v-model="new_property_value"
                  :item="{
                    title: 'New property',
                    value: new_property_value,
                    type: 'input',
                    edit: true
                  }"
                >
                  <template slot="suffix">
                    <a-icon
                      type="plus-circle"
                      @click="add_property(new_property_value)"
                    />
                  </template>
                </z-info-row>
              </template>
              <div>
                <a-icon type="plus-circle" />
                Add property
              </div>
            </a-popover>
          </div>
        </div>
        <div class="z-edit-panel-content">
          <z-info-row
            v-for="setting in PROPERTIES()"
            :key="setting.key"
            :item="setting"
            @input="value => set_options_value(setting.key, value)"
          >
            <template slot="suffix">
              <a-icon
                type="minus-circle"
                @click="remove_property(setting.key)"
              />
            </template>
          </z-info-row>
        </div>
      </div>
      <div class="z-edit-panel">
        <div class="z-edit-panel-content">
          <div class="note-borderable">
            <p class="note-borderable-head">JSON</p>
            <pre>{{ properties_as_string() }}</pre>
          </div>
          <div class="z-edit-panel-action">
            <a-button @click="onSubmit" type="primary">Submit</a-button>
          </div>
        </div>
      </div>
    </z-configuration>
  </a-layout-content>
</template>

<script lang="ts">
import store from "@/store";
import { StoreTypes } from "types";
import { GET_CURRENCY, CREATE_CURRENCY, UPDATE_CURRENCY } from "@/store/types";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  new_property_value = "";
  loading = false;
  currency: StoreTypes.Currency = {
    name: "",
    symbol: "",
    explorer_transaction: "",
    explorer_address: "",
    type: "",
    deposit_enabled: false,
    withdrawal_enabled: false,
    deposit_fee: "0",
    min_deposit_amount: "0",
    withdraw_fee: "0",
    min_withdraw_amount: "0",
    withdraw_limit_24h: "0",
    withdraw_limit_72h: "0",
    base_factor: 0,
    precision: 0,
    position: 0,
    min_confirmations: 0,
    code: "",
    blockchain_key: "",
    min_collection_amount: "0",
    visible: true,
    subunits: 0,
    options: {}
  };

  get type() {
    return this.$route.meta.type;
  }

  get SETTING_PANEL_LEFT() {
    return [
      {
        title: "Name",
        key: "name",
        value: this.currency.name,
        type: "input",
        style: "width: 47.5%",
        edit: true
      },
      {
        title: "Visible",
        key: "visible",
        value: this.currency.visible,
        style: "float: right;width: 47.5%",
        style_content:
          "justify-content: space-between;display: flex;flex-wrap: wrap",
        type: "slot"
      },
      {
        title: "Code",
        key: "code",
        value: this.currency.code,
        type: "input",
        edit: true
      },
      {
        title: "Symbol",
        key: "symbol",
        value: this.currency.symbol,
        type: "input",
        edit: true
      },
      {
        title: "Type",
        key: "type",
        value: this.currency.type,
        type: "select",
        list: {
          coin: "coin",
          fiat: "fiat"
        }
      },
      {
        title: "Subunits",
        key: "subunits",
        value: this.currency.subunits,
        type: "input",
        edit: true
      },
      {
        title: "Precision",
        key: "precision",
        value: this.currency.precision,
        type: "input",
        edit: true
      },
      {
        title: "Blockchain key",
        key: "blockchain_key",
        value: this.currency.blockchain_key,
        type: "input",
        edit: true
      }
    ];
  }

  get SETTING_PANEL_RIGHT() {
    return [
      {
        title: "Deposit",
        key: "deposit_enabled",
        value: this.currency.deposit_enabled,
        style: "float: left;width: 47.5%",
        style_content:
          "justify-content: space-between;display: flex;flex-wrap: wrap",
        type: "slot"
      },
      {
        title: "Withdrawal",
        key: "withdrawal_enabled",
        value: this.currency.withdrawal_enabled,
        style: "float: right;width: 47.5%",
        style_content:
          "justify-content: space-between;display: flex;flex-wrap: wrap",
        type: "slot"
      },
      {
        title: "Deposit Fee",
        key: "deposit_fee",
        value: this.currency.deposit_fee,
        type: "input",
        edit: true
      },
      {
        title: "Min Deposit Amount",
        key: "min_deposit_amount",
        value: this.currency.min_deposit_amount,
        style: "float: left;width: 47.5%",
        type: "input",
        edit: true
      },
      {
        title: "Min Collection Amount",
        key: "min_collection_amount",
        value: this.currency.min_collection_amount,
        style: "float: right;width: 47.5%",
        type: "input",
        edit: true
      },
      {
        title: "Withdraw Fee",
        key: "withdraw_fee",
        value: this.currency.withdraw_fee,
        type: "input",
        edit: true
      },
      {
        title: "Min Withdraw Amount",
        key: "min_withdraw_amount",
        value: this.currency.min_withdraw_amount,
        type: "input",
        edit: true
      },
      {
        title: "Withdraw Limit 24h",
        key: "withdraw_limit_24h",
        value: this.currency.withdraw_limit_24h,
        style: "float: left;width: 47.5%",
        type: "input",
        edit: true
      },
      {
        title: "Withdraw Limit 72h",
        key: "withdraw_limit_72h",
        value: this.currency.withdraw_limit_72h,
        style: "float: right;width: 47.5%",
        type: "input",
        edit: true
      },
      {
        title: "Position",
        key: "position",
        value: this.currency.position,
        type: "input",
        edit: true
      }
    ];
  }

  PROPERTIES() {
    const options = this.currency.options;
    if (typeof options == "object") {
      return Object.keys(options).map(key => {
        return {
          title: key,
          key: key,
          value: options[key],
          type: "input",
          edit: true
        };
      });
    } else {
      return [];
    }
  }

  properties_as_string() {
    return JSON.stringify(this.currency.options, undefined, 2);
  }

  get code() {
    return this.$route.params.code;
  }

  async beforeMount() {
    if (this.type === "edit") await this.get_currency();
    if (!this.currency) return;
  }

  async get_currency() {
    this.loading = true;
    try {
      const { data } = await store.dispatch(GET_CURRENCY, this.code);
      this.currency = data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      return error;
    }
  }

  add_property(property: string) {
    const { options } = this.currency as any;

    if (!property) return;
    this.new_property_value = "";
    options[property] = "";
    (this.currency as any).options = options;

    this.$nextTick(() => {
      this.$forceUpdate();
    });
  }

  remove_property(property) {
    delete (this.currency as any).options[property];

    this.$nextTick(() => {
      this.$forceUpdate();
    });
  }

  set_options_value(key: string, value) {
    (this.currency as any).options[key] = value;
    this.$nextTick(() => {
      this.$forceUpdate();
    });
  }

  async onSubmit() {
    const { type, currency } = this;

    delete currency.created_at;
    delete currency.updated_at;
    try {
      await store.dispatch(
        type === "edit" ? UPDATE_CURRENCY : CREATE_CURRENCY,
        currency
      );

      this.$router.push("/exchange/currencies");
    } catch (error) {
      return error;
    }
  }
}
</script>

<style lang="less">
@import "~@styles/views/exchange/currencies/edit";
</style>
