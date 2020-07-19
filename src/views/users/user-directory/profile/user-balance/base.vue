import { Component } from 'vue-property-decorator';
<template>
  <z-table
    class="page-user user-open-orders"
    :columns="COLUMN"
    :data="balance_data"
    :scroll="false"
    :pagination="false"
  >
    <template slot="test">
      <a-input placeholder="" v-model="test" />
    </template>
  </z-table>
</template>

<script lang="ts">
import ZTable from "@/components/z-table";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "z-table": ZTable
  }
})
export default class App extends Vue {
  @Prop() readonly member_info!: Member;
  test = "";

  protected readonly COLUMN = [
    { title: "Currency", key: "currency", algin: "left" },
    { title: "Available balance", key: "balance", algin: "left" },
    { title: "Locked balance", key: "locked", algin: "left" },
    { title: "Total balance", key: "total", algin: "left" },
    { title: "TC", key: "test", algin: "left", scopedSlots: true }
  ];

  mounted() {
    console.log("cc");
  }

  get balance_data() {
    return this.member_info.accounts.map((record: any) => {
      record.currency = record.currency.toUpperCase();
      record.balance = (record.balance * 1).toFixed(8);
      record.locked = (record.locked * 1).toFixed(8);
      record.total = (record.locked * 1 + record.balance * 1).toFixed(8);

      return record;
    });
  }
}
</script>

<style lang="less">
@import "~@styles/views/users/user-directory/balance";
</style>
