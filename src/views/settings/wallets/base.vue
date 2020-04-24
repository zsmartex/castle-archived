<template>
  <a-layout-content class="page-settings-wallets"> </a-layout-content>
</template>

<script lang="ts">
/**
 * TODO: turn on wallets service and continue working on it
 */
import store from "@/store";
import { GET_WALLETS } from "@/store/types";
import { StoreTypes } from "types";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  loading = false;
  data: StoreTypes.Wallet[] = [];
  page = 1;
  total = 0;
  limit = 50;

  mounted() {
    this.get_wallets({
      page: this.page,
      limit: this.limit
    });
  }

  async get_wallets(payload) {
    this.loading = true;
    try {
      const { data, headers } = await store.dispatch(GET_WALLETS, payload);

      this.data = data;
      this.total = Number(headers.total);
      this.page = Number(headers.page);
      this.limit = Number(headers["per-page"]);
      this.loading = false;
    } catch (error) {
      this.loading = false;
      return error;
    }
  }
}
</script>
