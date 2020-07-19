<template>
  <a-layout-content v-if="page_ready" class="page-settings-wallets">
    <z-configuration>
      <div class="z-edit-panel">
        <div class="z-edit-panel-content">
          <z-info-row
            v-for="setting in SETTING_PANEL_LEFT"
            :key="setting.key"
            :item="setting"
            v-model="wallet[setting.key]"
          >
            <template slot="status">
              <span>
                {{ wallet[setting.key] ? "Enabled" : "Disabled" }}
              </span>
              <span>
                <a-switch
                  :checked="wallet[setting.key] === 'active'"
                  @change="
                    checked =>
                      (wallet[setting.key] = checked ? 'active' : 'disabled')
                  "
                />
              </span>
            </template>
          </z-info-row>
        </div>
      </div>
      <div class="z-edit-panel">
        <div class="z-edit-panel-content">
          <z-info-row
            v-for="setting in SETTING_PANEL_RIGHT"
            :key="setting.key"
            :item="setting"
            v-model="wallet[setting.key]"
          ></z-info-row>
          <z-info-row
            v-for="setting in SETTING_PANEL_RIGHT_EXTRA"
            :key="setting.key"
            :item="setting"
            v-model="wallet_settings[setting.key]"
          ></z-info-row>
          <div class="z-edit-panel-action">
            <a-button type="primary" @click="onSubmit">Submit</a-button>
          </div>
        </div>
      </div>
    </z-configuration>
  </a-layout-content>
</template>

<script lang="ts">
import store from "@/store";
//import { runNotice } from "@zsmartex/z-helpers";
import {
  GET_WALLET,
  GET_CURRENCIES,
  GET_WALLET_KINDS,
  GET_WALLET_GATEWAYS,
  GET_BLOCKCHAINS
} from "@/store/types";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  page_state = "loading";
  wallet?: Wallet;
  blockchains!: { [key: string]: string };
  currencies!: { [key: string]: string };
  wallet_settings: WalletSettings = {
    uri: "",
    secret: ""
  };

  get id() {
    return this.$route.params.id;
  }

  get page_type() {
    return this.$route.meta.type;
  }

  get page_ready() {
    return this.page_state == "ready";
  }

  get SETTING_PANEL_LEFT() {
    return [
      {
        title: "Name",
        key: "name",
        value: this.wallet?.name,
        type: "input",
        style: "width: 47.5%",
        edit: true
      },
      {
        title: "Status",
        key: "status",
        value: this.wallet?.status, // active | disabled
        style: "float: right;width: 47.5%",
        style_content:
          "justify-content: space-between;display: flex;flex-wrap: wrap",
        type: "slot"
      },
      {
        title: "Blockchain Key",
        key: "blockchain_key",
        value: this.wallet?.blockchain_key,
        type: "select",
        list: this.blockchains
      },
      {
        title: "Gateway Client",
        key: "gateway",
        value: this.wallet?.gateway,
        type: "select",
        list: this.gateways
      },
      {
        title: "Address",
        key: "address",
        value: this.wallet?.address,
        type: "input",
        edit: true
      },
      {
        title: "Currency",
        key: "currency",
        value: this.wallet?.currency,
        type: "select",
        list: this.currencies
      }
    ];
  }

  get SETTING_PANEL_RIGHT() {
    return [
      {
        title: "Kind",
        key: "currency",
        value: this.wallet?.kind,
        type: "select",
        list: this.kinds
      },
      {
        title: "Maximum Balance",
        key: "max_balance",
        value: this.wallet?.max_balance,
        type: "input",
        edit: true
      }
    ];
  }

  get SETTING_PANEL_RIGHT_EXTRA() {
    return [
      {
        title: "Uri",
        key: "uri",
        value: this.wallet_settings.uri,
        type: "input",
        edit: true
      },
      {
        title: "Secret",
        key: "secret",
        value: this.wallet_settings.secret,
        type: "input",
        edit: true
      }
    ];
  }

  get kinds() {
    return store.state.admin.kinds.reduce((a, b) => ((a[b] = b), a), {});
  }

  get gateways() {
    return store.state.admin.gateways.reduce(
      (a, b) => ((a[b] = b.toUpperCase()), a),
      {}
    );
  }

  mounted() {
    if (this.page_type === "edit") this.get_wallet();
    if (!store.state.admin.kinds.length) this.get_kinds();
    if (!store.state.admin.gateways.length) this.get_gateways();
    this.get_blockchains();
    this.get_currencies();
  }

  async get_blockchains() {
    try {
      const { data } = await store.dispatch(GET_BLOCKCHAINS);
      this.blockchains = data.reduce((a, b) => ((a[b.key] = b.name), a), {});
    } catch (error) {
      return error;
    }
  }

  async get_currencies() {
    try {
      const { data } = await store.dispatch(GET_CURRENCIES);
      this.currencies = data.reduce((a, b) => ((a[b.code] = b.name), a), {});
    } catch (error) {
      return error;
    }
  }

  get_kinds() {
    store.dispatch(GET_WALLET_KINDS);
  }

  get_gateways() {
    store.dispatch(GET_WALLET_GATEWAYS);
  }

  async get_wallet() {
    this.page_state = "loading";
    try {
      const { data } = await store.dispatch(GET_WALLET, this.id);

      this.wallet = data;
      this.page_state = "ready";
    } catch (error) {
      this.page_state = "error";
      return error;
    }
  }

  onSubmit() {
    let { wallet } = this;
    if (this.wallet_settings.uri || this.wallet_settings.secret) {
      wallet = Object.assign(this.wallet, {
        settings: this.wallet_settings
      });
    }

    console.log(wallet);
  }
}
</script>
