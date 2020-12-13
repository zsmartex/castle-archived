<template>
  <a-layout-content v-if="!loading" class="page-settings-blockchains edit">
    <z-configuration>
      <div class="z-edit-panel">
        <div class="z-edit-panel-content">
          <z-info-row
            v-for="setting in SETTING_PANEL_LEFT"
            v-model="blockchain[setting.key]"
            :key="setting.key"
            :item="setting"
          >
            <template slot="status">
              <span>
                {{ blockchain.status === "active" ? "Enabled" : "Disabled" }}
              </span>
              <span>
                <a-switch
                  :checked="blockchain.status === 'active'"
                  @change="onStatusChanged"
                />
              </span>
            </template>
          </z-info-row>
        </div>
      </div>
      <div class="z-edit-panel" :style="{ paddingBottom: '60px' }">
        <div class="z-edit-panel-content">
          <z-info-row
            v-for="setting in SETTING_PANEL_RIGHT"
            v-model="blockchain[setting.key]"
            :key="setting.key"
            :item="setting"
          >
            <template v-if="setting.key === 'height'" slot="suffix">
              <a-button type="primary">Reset</a-button>
            </template>
          </z-info-row>
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
import { runNotice } from "@/mixins";
import {
  GET_BLOCKCHAIN,
  GET_BLOCKCHAIN_CLIENTS,
  CREATE_BLOCKCHAIN,
  UPDATE_BLOCKCHAIN
} from "@/store/types";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  loading = false;
  blockchain: Blockchain = {
    key: "",
    name: "",
    client: "",
    server: "",
    height: 0,
    explorer_address: "",
    explorer_transaction: "",
    min_confirmations: 0,
    status: "disabled"
  };

  get id() {
    return this.$route.params.id;
  }

  get page_type() {
    return this.$route.meta.type;
  }

  get clients() {
    return store.state.admin.clients.reduce(
      (a, b) => ((a[b] = b.toUpperCase()), a),
      {}
    );
  }

  get SETTING_PANEL_LEFT() {
    return [
      {
        title: "Name",
        key: "name",
        value: this.blockchain?.name,
        type: "input",
        style: "width: 47.5%",
        edit: true
      },
      {
        title: "Status",
        key: "status",
        value: this.blockchain?.status === "active", // active || disabled
        style: "width: 47.5%",
        style_content:
          "justify-content: space-between;display: flex;flex-wrap: wrap",
        type: "slot"
      },
      {
        title: "Client",
        key: "client",
        value: this.blockchain?.client,
        type: "select",
        list: this.clients
      },
      {
        title: "Server",
        key: "server",
        value: this.blockchain?.server,
        type: "input",
        edit: true
      },
      {
        title: "Min confirmations",
        key: "min_confirmations",
        value: this.blockchain?.min_confirmations,
        type: "input",
        edit: true
      }
    ];
  }

  get SETTING_PANEL_RIGHT() {
    return [
      {
        title: "Height",
        key: "height",
        value: this.blockchain?.height,
        style: "width: 47.5%",
        type: "input",
        edit: true
      },
      {
        title: "Key",
        key: "key",
        value: this.blockchain?.key,
        type: "input",
        edit: true
      },
      {
        title: "Explorer Address",
        key: "explorer_address",
        value: this.blockchain?.explorer_address,
        type: "input",
        edit: true
      },
      {
        title: "Explorer Transaction",
        key: "explorer_transaction",
        value: this.blockchain?.explorer_transaction,
        type: "input",
        edit: true
      }
    ];
  }

  mounted() {
    if (this.page_type === "edit") this.get_blockchain();
    if (!store.state.admin.clients.length) this.get_clients();
  }

  async get_blockchain() {
    this.loading = true;
    try {
      const { data } = await store.dispatch(GET_BLOCKCHAIN, this.id);

      this.blockchain = data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      return error;
    }
  }

  async get_clients() {
    await store.dispatch(GET_BLOCKCHAIN_CLIENTS);
  }

  async onSubmit() {
    try {
      await store.dispatch(
        this.page_type === "edit" ? UPDATE_BLOCKCHAIN : CREATE_BLOCKCHAIN,
        this.blockchain
      );

      runNotice(
        "success",
        `Blockchain ${this.blockchain.name} ${
          this.page_type === "edit" ? "updated" : "created"
        } successfully`
      );

      this.$router.push("/settings/blockchains");
    } catch (error) {
      return error;
    }
  }

  onStatusChanged(checked: boolean) {
    this.blockchain.status = checked ? "active" : "disabled";
  }
}
</script>
