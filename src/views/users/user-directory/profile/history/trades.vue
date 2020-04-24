<template>
  <z-table
    :loading="loading"
    :columns="COLUMN"
    :data="trades_data"
    :scroll="false"
    :pagination="true"
    :total="total"
    :page="page"
    :page-size="limit"
    @change-pagination="get_trades"
  />
</template>

<script lang="ts">
import helpers from "@zsmartex/z-helpers";
import store from "@/store";
import ZTable from "@/components/z-table";
import { GET_TRADES } from "@/store/types";
import { StoreTypes } from "types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "z-table": ZTable
  }
})
export default class App extends Vue {
  loading = false;
  total = 0;
  page = 1;
  limit = 50;
  data: StoreTypes.UserTrade[] = [];

  @Prop() readonly user_info!: StoreTypes.UserInfo;

  private readonly COLUMN = [
    { title: "Trade ID", key: "id", algin: "left" },
    { title: "Marker order email", key: "maker_order_email", algin: "left" },
    { title: "Taker order email", key: "taker_order_email", algin: "left" },
    { title: "Marker UID", key: "maker_uid", algin: "left" },
    { title: "Taker UID", key: "taker_uid", algin: "left" },
    { title: "Market", key: "market", algin: "left" },
    { title: "Price", key: "price", algin: "left" },
    { title: "Amount", key: "amount", algin: "left" },
    { title: "Side", key: "taker_type", algin: "left" },
    { title: "Trade time", key: "created_at", algin: "right" }
  ];

  get trades_data() {
    return this.data.map(trade => {
      trade.market = trade.market.toUpperCase();
      (trade as any).created_at = helpers.getDate(
        trade.created_at as Date,
        true
      );

      return trade;
    });
  }

  mounted() {
    this.get_trades({
      page: this.page,
      limit: this.limit
    });
  }

  async get_trades(payload?) {
    this.loading = true;
    try {
      const { data, headers } = await store.dispatch(
        GET_TRADES,
        Object.assign(
          {
            uid: this.user_info.uid,
            ordering: "desc"
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
}
</script>
