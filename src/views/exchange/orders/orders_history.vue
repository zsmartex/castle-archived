<template>
  <div>
    <z-table
      :loading="loading"
      :columns="COLUMN"
      :data="orders_data"
      :hover="true"
      :scroll="false"
      :pagination="true"
      :total="total"
      :page="page"
      :page-size="limit"
      @change-pagination="get_orders"
    />
    <z-filter-drawer ref="filter" @submit="onFilterSubmit">
      <z-info-row
        v-for="item in filter_list"
        v-model="payload_filter[item.key]"
        :ref="`z-info-row-${item.key}`"
        :item="item"
        :key="item.key"
      >
        <template slot="from">
          <a-date-picker
            placeholder="From date"
            @change="
              moment => (payload_filter.from = moment.toDate().toISOString())
            "
            @focus="$refs['z-info-row-from'][0].focus()"
            @blur="$refs['z-info-row-from'][0].blur()"
          />
        </template>
        <template slot="to">
          <a-date-picker
            placeholder="To date"
            @change="
              moment => (payload_filter.to = moment.toDate().toISOString())
            "
            @focus="$refs['z-info-row-to'][0].focus()"
            @blur="$refs['z-info-row-to'][0].blur()"
          />
        </template>
      </z-info-row>
    </z-filter-drawer>
  </div>
</template>

<script lang="ts">
import ZSmartModel from "@zsmartex/z-eventbus";
import helpers from "@zsmartex/z-helpers";
import store from "@/store";
import { StoreTypes } from "types";
import { GET_ORDERS } from "@/store/types";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  loading = false;
  data: StoreTypes.UserOrder[] = [];
  page = 1;
  total = 0;
  limit = 50;
  payload_filter = {
    market: "",
    ord_type: "", //type
    price: "",
    origin_volume: "",
    type: "", //side
    email: "",
    uid: "",
    from: "",
    to: ""
  };

  get COLUMN() {
    return [
      { title: "Order ID", key: "id", algin: "left" },
      { title: "Email", key: "email", algin: "left" },
      { title: "Market", key: "market", algin: "left" },
      { title: "Type", key: "ord_type", algin: "left" },
      { title: "Amount", key: "origin_volume", algin: "left" },
      { title: "Executed", key: "executed_volume", algin: "left" },
      { title: "Price", key: "price", algin: "left" },
      { title: "Side", key: "side", algin: "left" },
      { title: "Created", key: "created_at", algin: "left" },
      { title: "Updated", key: "updated_at", algin: "left" },
      { title: "State", key: "state", algin: "center" }
    ];
  }

  get orders_data() {
    return this.data.map(order => {
      order.market = order.market.toUpperCase();
      (order as any).created_at = helpers.getDate(
        order.created_at as Date,
        true
      );
      (order as any).updated_at = helpers.getDate(
        order.updated_at as Date,
        true
      );

      return order;
    });
  }

  get filter_list() {
    return [
      {
        title: "From date",
        key: "from",
        value: this.payload_filter.from,
        type: "slot",
        style: "width: 45%"
      },
      {
        title: "To date",
        key: "to",
        value: this.payload_filter.to,
        type: "slot",
        style: "width: 45%"
      },
      {
        title: "Market",
        key: "market",
        value: this.payload_filter.market,
        type: "input",
        edit: true
      },
      {
        title: "Order type",
        key: "ord_type",
        value: this.payload_filter.ord_type,
        type: "input",
        edit: true
      },
      {
        title: "Price",
        key: "price",
        value: this.payload_filter.price,
        type: "input",
        edit: true
      },
      {
        title: "Amount",
        key: "origin_volume",
        value: this.payload_filter.origin_volume,
        type: "input",
        edit: true
      },
      {
        title: "Side",
        key: "type",
        value: this.payload_filter.type,
        type: "input",
        edit: true
      },
      {
        title: "Email",
        key: "email",
        value: this.payload_filter.type,
        type: "input",
        edit: true
      },
      {
        title: "UID",
        key: "uid",
        value: this.payload_filter.uid,
        type: "input",
        edit: true
      }
    ];
  }

  mounted() {
    this.get_orders({
      page: this.page,
      limit: this.limit
    });
    this.set_action_header();
  }

  set_action_header() {
    this.$route.meta["action-header"] = [
      {
        title: "Filter",
        key: "filter",
        icon: "funnel-plot",
        callback: () => {
          (this.$refs.filter as any).create();
        }
      },
      {
        title: "Export",
        key: "export",
        icon: "file-zip",
        callback: async () => {
          const csvString = await helpers.jsonToCSV(
            this.data.map(order => {
              delete order.uid;
              delete order.email;

              return order;
            })
          );
          helpers.saveFile(csvString, "orders.csv", {
            type: "text/csv;charset=utf-8;"
          });
        }
      }
    ];

    this.$nextTick(() => {
      ZSmartModel.emit("set-action-header");
    });
  }

  async get_orders(payload) {
    this.loading = true;
    try {
      const { data, headers } = await store.dispatch(
        GET_ORDERS,
        Object.assign(
          {
            order_by: "desc"
          },
          payload
        )
      );
      this.total = Number(headers.total);
      this.page = Number(headers.page);
      this.limit = Number(headers["per-page"]);
      this.data = data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      return error;
    }
  }

  onFilterSubmit() {
    this.get_orders(this.payload_filter);
  }

  cancel_order(id: string) {
    console.log(id);
  }
}
</script>
