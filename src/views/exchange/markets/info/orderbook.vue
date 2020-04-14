<template>
  <div class="orderbook">
    <a-card class="ant-card-no-padding" title="Buy orders">
      <z-table
        :loading="loading.bids"
        :columns="ORDERS_COLUMN"
        :data="data.bids"
        :hover="true"
        :scroll="false"
        :pagination="true"
        :total="total.bids"
        :page="page.bids"
        :page-size="limit.bids"
        @change-pagination="get_orders_bids"
      >
        <template slot="total" slot-scope="{ item, column }">
          <span :class="['total', `text-${column.algin}`]">
            {{ get_total(item) }}
          </span>
        </template>
        <template slot="action" slot-scope="{ item, column }">
          <span :class="['action', `text-${column.algin}`]">
            <span @click="close_order(item.id)">
              Cancel <a-icon type="close-circle" />
            </span>
          </span>
        </template>
      </z-table>
    </a-card>
    <a-card class="ant-card-no-padding" title="Sell orders">
      <z-table
        :loading="loading.asks"
        :columns="ORDERS_COLUMN"
        :data="data.asks"
        :hover="true"
        :scroll="false"
        :pagination="true"
        :total="total.asks"
        :page="page.asks"
        :page-size="limit.asks"
        @change-pagination="get_orders_asks"
      >
        <template slot="total" slot-scope="{ item, column }">
          <span :class="['total', `text-${column.algin}`]">
            {{ get_total(item) }}
          </span>
        </template>
        <template slot="action" slot-scope="{ item, column }">
          <span :class="['action', `text-${column.algin}`]">
            <span @click="close_order(item.id)">
              Cancel <a-icon type="close-circle" />
            </span>
          </span>
        </template>
      </z-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { StoreTypes } from "types";
import { GET_ORDERS } from "@/store/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class App extends Vue {
  @Prop() readonly market!: StoreTypes.Market;

  loading = {
    asks: false,
    bids: true
  };
  data: { asks: StoreTypes.UserOrder[]; bids: StoreTypes.UserOrder[] } = {
    asks: [],
    bids: []
  };
  page = {
    asks: 1,
    bids: 1
  };
  total = {
    asks: 0,
    bids: 0
  };
  limit = {
    asks: 50,
    bids: 50
  };

  private readonly ORDERS_COLUMN = [
    { title: "Order ID", key: "id", algin: "left" },
    { title: "UID", key: "uid", algin: "left" },
    { title: "Type", key: "ord_type", algin: "left" },
    { title: "Price", key: "price", algin: "left" },
    { title: "Amount", key: "origin_volume", algin: "left" },
    { title: "Total", key: "total", algin: "left", scopedSlots: true },
    { title: "", key: "action", algin: "center", scopedSlots: true }
  ];

  mounted() {
    this.get_orders_asks({
      page: this.page.asks,
      limit: this.limit.asks
    });
    this.get_orders_bids({
      page: this.page.bids,
      limit: this.limit.bids
    });
  }

  get_total(order: StoreTypes.UserOrder) {
    return Number(
      (Number(order.price) * Number(order.origin_volume)).toFixed(
        this.market.total_precision
      )
    );
  }

  async get_orders_asks(payload) {
    try {
      this.loading.asks = true;
      const { data, headers } = await store.dispatch(
        GET_ORDERS,
        Object.assign(
          {
            market: this.market.id,
            state: "wait",
            type: "sell",
            order_by: "price"
          },
          payload
        )
      );
      this.total.asks = Number(headers.total);
      this.page.asks = Number(headers.page);
      this.limit.asks = Number(headers["per-page"]);
      this.data.asks = data;
      this.loading.asks = false;
    } catch (error) {
      return error;
    }
  }

  async get_orders_bids(payload) {
    try {
      this.loading.bids = true;
      const { data, headers } = await store.dispatch(
        GET_ORDERS,
        Object.assign(
          {
            market: this.market.id,
            state: "wait",
            type: "buy",
            order_by: "desc"
          },
          payload
        )
      );
      this.total.bids = Number(headers.total);
      this.page.bids = Number(headers.page);
      this.limit.bids = Number(headers["per-page"]);
      this.data.bids = data;
      this.loading.bids = false;
    } catch (error) {
      return error;
    }
  }

  async close_order(id: number) {
    console.log(id);
  }
}
</script>
