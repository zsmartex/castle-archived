<template>
  <div class="page-bot-exchanges"></div>
</template>

<script lang="ts">
import { QuantexController } from "@/controllers";
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Base extends Vue {
  loading = false;
  limit = 50;
  page = 1;
  exchanges = Array<Quantex.Exchange>();

  mounted() {
    this.get_exchanges();
  }

  async get_exchanges() {
    try {
      this.loading = true;
      const { data } = await QuantexController.get_exchanges();
      this.exchanges = data;
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }
}
</script>
