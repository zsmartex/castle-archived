<template>
  <a-layout-content class="page-accountings-deposits">
    <z-table
      :loading="loading"
      :data="deposits"
      :columns="COLUMN"
      :scroll="false"
      :pagination="true"
      :hover="true"
      :total="total"
      :page="page"
      :page-size="limit"
      @change-pagination="get_deposits"
      @click="on_table_click"
    >
      <template slot="uid" slot-scope="{ item, column }">
        <router-link
          :class="['uid', `text-${column.algin}`]"
          :to="`/users/user-directory/${item.uid}`"
        >
          {{ item.uid }}
        </router-link>
      </template>
      <template slot="action" slot-scope="{ item, column }">
        <span :class="`action text-${column.algin}`">
          <a-icon type="right" />
        </span>
      </template>
    </z-table>
    <z-filter-drawer
      ref="filter"
      @reset="onDrawerReset"
      @submit="onDrawerSubmit"
    >
      <z-info-row
        v-for="item in filter_list"
        :item="item"
        :key="item.key"
        v-model="payload_filter[item.key]"
      >
        <template
          v-for="date_picker in [
            { key: 'from', placeholder: 'From date' },
            { key: 'to', placeholder: 'To date' }
          ]"
          :slot="date_picker.key"
        >
          <a-date-picker
            :key="date_picker.key"
            :placeholder="date_picker.placeholder"
            @change="
              moment => {
                payload_filter[date_picker.key] = moment.toDate().toISOString();
              }
            "
          />
        </template>
      </z-info-row>
    </z-filter-drawer>
  </a-layout-content>
</template>

<script lang="ts">
import store from "@/store";
import ZSmartModel from "@zsmartex/z-eventbus";
import { getDate } from "@zsmartex/z-helpers";
import { GET_DEPOSITS } from "@/store/types";
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Deposits extends Vue {
  loading = false;
  data: Deposit[] = [];
  page = 1;
  total = 0;
  limit = 50;
  payload_filter = {
    from: "",
    to: "",
    email: "",
    currency: "",
    state: ""
  };

  COLUMN = [
    { title: "ID", key: "id", algin: "left" },
    { title: "UID", key: "uid", algin: "left", scopedSlots: true },
    { title: "TxID", key: "txid", algin: "left" },
    { title: "Created At", key: "created_at", algin: "left" },
    { title: "Amount", key: "amount", algin: "left" },
    { title: "Currency", key: "currency", algin: "left" },
    { title: "Confirmations", key: "confirmations", algin: "left" },
    { title: "", key: "action", algin: "center", scopedSlots: true }
  ];

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
        title: "Email",
        key: "email",
        value: this.payload_filter.email,
        type: "input",
        edit: true
      },
      {
        title: "Currency",
        key: "currency",
        value: this.payload_filter.currency,
        type: "input",
        edit: true
      },
      {
        title: "State",
        key: "state",
        value: this.payload_filter.state,
        type: "input",
        edit: true
      }
    ];
  }

  get deposits() {
    return this.data.map(deposit => {
      (deposit as any).created_at = getDate(deposit.created_at, true);
      deposit.currency = deposit.currency.toUpperCase();

      return deposit;
    });
  }

  mounted() {
    this.get_deposits();
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
      }
    ];

    this.$nextTick(() => {
      ZSmartModel.emit("set-action-header");
    });
  }

  onDrawerReset() {
    for (const index in this.payload_filter) {
      this.payload_filter[index] = "";
    }
    (this.$refs.filter as any).remove();
  }

  onDrawerSubmit() {
    this.get_deposits();
    (this.$refs.filter as any).remove();
  }

  async get_deposits(payload = { limit: this.limit, page: this.page }) {
    this.loading = true;
    try {
      const { data, headers } = await store.dispatch(
        GET_DEPOSITS,
        (payload = Object.assign(payload, this.payload_filter))
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

  on_table_click(item: Deposit) {
    this.$router.push(`/accountings/deposits/${item.tid}/details`);
  }
}
</script>

<style lang="less">
@import "~@styles/views/accountings/deposits/base";
</style>
