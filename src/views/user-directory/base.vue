<template>
  <a-layout-content class="page-dashboard-users">
    <a-card class="ant-card-no-padding" title="Card title" :bordered="false">
      <z-table
        :columns="columns"
        :data="users_data"
        :scroll="false"
        :pagination="true"
        :total="users_total"
        :page="users_page"
      >
        <template slot="otp" slot-scope="{ item, column }">
          <span :class="`text-${column.algin}`">
            {{ item.otp === true ? "ON" : "OFF" }}
          </span>
        </template>
        <template slot="action" slot-scope="{ item, column }">
          <router-link
            :to="`/users/user-directory/${item.uid}`"
            :class="`text-${column.algin}`"
          >
            Info
          </router-link>
        </template>
      </z-table>
    </a-card>
  </a-layout-content>
</template>

<script lang="ts">
import store from "@/store";
import { GET_USERS } from "@/store/types";
import { Vue, Component } from "vue-property-decorator";
import ZTable from "@/components/z-table";

@Component({
  components: {
    "z-table": ZTable
  }
})
export default class Template extends Vue {
  protected loading = false;
  protected readonly columns = [
    { title: "Email", key: "email", algin: "left" },
    { title: "UID", key: "uid", algin: "left" },
    { title: "Role", key: "role", algin: "left" },
    { title: "Level", key: "level", algin: "center" },
    { title: "OTP", key: "otp", algin: "right", scopedSlots: true },
    { title: "State", key: "state", algin: "right" },
    {
      title: "Action",
      key: "action",
      algin: "right",
      scopedSlots: true
    }
  ];

  mounted() {
    this.get_users();
  }

  async get_users() {
    await store.dispatch(GET_USERS);
    this.after_get_users();
  }

  after_get_users() {
    this.loading = false;
  }

  get users() {
    return store.state.admin.users;
  }

  get users_data() {
    return this.users.data;
  }

  get users_page() {
    return this.users.page;
  }

  get users_total() {
    return this.users.total;
  }
}
</script>
