<template>
  <z-table
    class="page-user-directory open-orders"
    :loading="loading"
    :columns="COLUMN"
    :data="orders_data"
    :scroll="false"
    :pagination="true"
    :total="total"
    :page="page"
    :page-size="limit"
    @change-pagination="get_orders"
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
      <span :class="`action text-${column.algin}`">
        <span @click="cancel_order(item.id)">
          Cancel
          <a-icon type="close-circle" />
        </span>
      </span>
    </template>
  </z-table>
</template>

<script lang="ts">
import store from "@/store";
import helpers from "@zsmartex/z-helpers";
import { StoreTypes } from "types";
import { Vue, Component, Prop } from "vue-property-decorator";
import { GET_ORDERS } from "@/store/types";

@Component
export default class App extends Vue {
  loading = false;
  total = 0;
  page = 1;
  limit = 50;
  data: StoreTypes.UserOrder[] = [];

  @Prop() readonly user_info!: StoreTypes.UserInfo;
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
    this.get_orders({
      page: this.page,
      limit: this.limit
    });
  }

  async get_orders(payload?) {
    this.loading = true;
    try {
      const { data, headers } = await store.dispatch(
        GET_ORDERS,
        Object.assign(
          {
            state: "wait"
          },
          payload
        )
      );
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

  get orders_data() {
    return this.data.map(order => {
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

<style lang="less">
@import "~@styles/views/users/user-directory/open_oders";
</style>
