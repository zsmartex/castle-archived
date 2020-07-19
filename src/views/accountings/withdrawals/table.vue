<template>
  <z-table
    :loading="loading"
    :columns="COLUMN"
    :data="data"
    :scroll="false"
    :pagination="true"
    :hover="true"
    :total="total"
    :page="page"
    :page-size="limit"
    @change-pagination="loadData"
    @click="on_table_click"
  >
    <template slot="email" slot-scope="{ item, column }">
      <router-link
        :class="['email', `text-${column.algin}`]"
        :to="`/users/user-directory/${item.uid}`"
      >
        {{ item.email }}
      </router-link>
    </template>
    <template slot="action" slot-scope="{ item, column }">
      <span :class="`action text-${column.algin}`">
        <a-icon type="right" />
      </span>
    </template>
  </z-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class WithdrawalsTable extends Vue {
  @Prop() readonly loading!: boolean;
  @Prop() readonly data!: Withdraw;
  @Prop() readonly limit!: number;
  @Prop() readonly total!: number;
  @Prop() readonly page!: number;
  @Prop() readonly loadData!: void;

  COLUMN = [
    { title: "ID", key: "id", algin: "left" },
    { title: "Email", key: "email", algin: "left", scopedSlots: true },
    { title: "Currency", key: "currency", algin: "left" },
    { title: "TxID", key: "blockchain_txid", algin: "left" },
    { title: "Recipient Address", key: "rid", algin: "left" },
    { title: "Created At", key: "created_at", algin: "left" },
    { title: "Amount", key: "amount", algin: "left" },
    { title: "State", key: "state", algin: "left" },
    { title: "", key: "action", algin: "right", scopedSlots: true }
  ];

  on_table_click(item: Withdraw) {
    this.$emit("click", item);
  }
}
</script>

<style lang="less">
@import "~@styles/views/accountings/withdrawals/table";
</style>
