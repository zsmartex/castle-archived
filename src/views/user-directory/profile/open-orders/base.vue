<template>
  <z-table
    class=""
    :columns="COLUMN"
    :data="open_orders_data"
    :scroll="false"
    :pagination="true"
    :total="open_orders.total"
    :page="open_orders.page"
  >
    <template slot="side" slot-scope="{ item, column }">
      <span
        :class="[
          'side',
          `text-${column.algin}`,
          `text-${item.side === 'buy' ? 'up' : 'down'}`
        ]"
      >
        {{ item.side }}
      </span>
    </template>
    <template slot="action" slot-scope="{ item, column }">
      <span
        :class="`action text-${column.algin}`"
        @click="cancel_order(item.id)"
      >
        Cancel
        <a-icon type="close-circle" />
      </span>
    </template>
  </z-table>
</template>

<script lang="ts">
import store from "@/store";
import helpers from "@zsmartex/z-helpers";
import ZTable from "@/components/z-table";
import { Vue, Component } from "vue-property-decorator";
import { GET_USER_ORDER } from "../../../../store/modules/admin/action-types";

@Component({
  components: {
    "z-table": ZTable
  }
})
export default class App extends Vue {
  protected readonly COLUMN = [
    { title: "Order ID", key: "id", algin: "left" },
    { title: "Market", key: "market", algin: "left" },
    { title: "Type", key: "ord_type", algin: "left" },
    { title: "Amount", key: "origin_volume", algin: "left" },
    { title: "Executed", key: "executed_volume", algin: "left" },
    { title: "Price", key: "price", algin: "left" },
    { title: "Side", key: "side", algin: "left", scopedSlots: true },
    { title: "Created", key: "created_at", algin: "left" },
    { title: "Updated", key: "updated_at", algin: "left" },
    { title: "Action", key: "action", algin: "center", scopedSlots: true }
  ];

  mounted() {
    store.dispatch(GET_USER_ORDER);
  }

  get open_orders() {
    return store.state.admin.user_orders;
  }

  get open_orders_data() {
    return store.state.admin.user_orders.data.map(order => {
      order["market"] = order["market"].toUpperCase();
      (order as any)["created_at"] = helpers.getDate(order["created_at"], true);
      (order as any)["updated_at"] = helpers.getDate(order["created_at"], true);
      return order;
    });
  }

  cancel_order(id: number) {
    console.log(id);
  }
}
</script>
