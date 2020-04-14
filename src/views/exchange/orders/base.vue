<template>
  <a-layout-content class="page-exchange-orders">
    <a-tabs defaultActiveKey="1" @change="tabChange" :animated="false">
      <a-tab-pane tab="Open Orders" key="1" forceRender>
        <open-orders ref="open-orders" />
      </a-tab-pane>
      <a-tab-pane tab="Orders History" key="2" forceRender>
        <orders-history ref="orders-history" />
      </a-tab-pane>
    </a-tabs>
  </a-layout-content>
</template>

<script lang="ts">
import open_orders from "./open_orders.vue";
import orders_history from "./orders_history.vue"
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "z-table": () => import("@/components/z-table"),
    "open-orders": open_orders,
    "orders-history": orders_history
  }
})
export default class App extends Vue {
  $refs!: {
    "open-orders": open_orders;
    "orders-history": orders_history;
  }

  tabChange(activeKey) {
    switch (activeKey) {
      case "1":
        this.$refs["open-orders"].set_action_header();
        break;
      case "2":
        this.$refs["orders-history"].set_action_header();
        break;
    }
  }
}
</script>

<style lang="less">
@import "~@styles/views/exchange/orders/base";
</style>
