<template>
  <a-layout-content class="page-settings-wallets">
    <z-table
      :loading="loading"
      :columns="COLUMN"
      :data="wallets"
      :hover="true"
      :scroll="false"
      :pagination="true"
      :total="total"
      :page="page"
      :page-size="limit"
      @change-pagination="get_wallets"
      @click="on_table_click"
    >
      <template slot="action" slot-scope="{ item, column }">
        <span :class="`action text-${column.algin}`">
          <a-icon type="right" />
        </span>
      </template>
      <template slot="address" slot-scope="{ item, column }">
        <span :class="`address text-${column.algin}`">
          <a
            :href="
              get_explorer_address_by_blockchain_key(
                item.blockchain_key,
                item.address
              )
            "
            target="_blank"
            @click.stop="
              $event =>
                on_a_click(
                  get_explorer_address_by_blockchain_key(
                    item.blockchain_key,
                    item.address
                  ),
                  $event
                )
            "
            >{{ item.address }}</a
          >
        </span>
      </template>
    </z-table>
  </a-layout-content>
</template>

<script lang="ts">
import store from "@/store";
import { GET_WALLETS, GET_BLOCKCHAINS } from "@/store/types";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  data: Wallet[] = [];
  page = 1;
  total = 0;
  limit = 50;
  blockchains: Blockchain[] = [];

  readonly COLUMN = [
    { title: "Id", key: "id", algin: "left" },
    { title: "Code", key: "currency", algin: "left" },
    { title: "Kind", key: "kind", algin: "left" },
    { title: "Name", key: "name", algin: "left" },
    { title: "Address", key: "address", algin: "left", scopedSlots: true },
    { title: "Max Balance", key: "max_balance", algin: "left" },
    { title: "Status", key: "status", algin: "left" },
    { title: "", key: "action", algin: "center", scopedSlots: true }
  ];

  get loading() {
    return !this.data.length || !this.blockchains.length;
  }

  get wallets() {
    return this.data.map(wallet => {
      wallet.currency = wallet.currency.toUpperCase();

      return wallet;
    });
  }

  async mounted() {
    this.set_action_header();
    await this.get_blockchains();
    this.get_wallets({
      page: this.page,
      limit: this.limit
    });
  }

  set_action_header() {
    this.$route.meta["action-header"] = [
      {
        title: "Add Wallet",
        key: "add_wallet",
        icon: "plus-circle",
        callback: () => {
          this.$router.push("/settings/wallets/add");
        }
      }
    ];
  }

  get_explorer_address_by_blockchain_key(
    blockchain_key: string,
    address: string
  ) {
    const blockchain = this.blockchains.find(
      blockchain => blockchain.key === blockchain_key
    );

    return blockchain?.explorer_address.replace("#{address}", address);
  }

  on_a_click(url: string, $event: Event) {
    if ($event) $event.preventDefault();

    window.open(url, "_blank");
  }

  async get_wallets(payload) {
    try {
      const { data, headers } = await store.dispatch(GET_WALLETS, payload);

      this.data = data;
      this.total = Number(headers.total);
      this.page = Number(headers.page);
      this.limit = Number(headers["per-page"]);
    } catch (error) {
      return error;
    }
  }

  async get_blockchains() {
    try {
      const { data } = await store.dispatch(GET_BLOCKCHAINS);
      this.blockchains = data;
    } catch (error) {
      return error;
    }
  }

  on_table_click(item: Wallet) {
    this.$router.push(`/settings/wallets/${item.id}/edit`);
  }
}
</script>

<style lang="less">
@import "~@styles/views/settings/wallets/base";
</style>
