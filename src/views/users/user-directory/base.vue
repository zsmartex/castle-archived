<template>
  <a-layout-content class="page-user-directory">
    <z-table
      :loading="loading"
      :columns="columns"
      :data="users"
      :scroll="false"
      :pagination="true"
      :total="total"
      :page="page"
      :page-size="limit"
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
  </a-layout-content>
</template>

<script lang="ts">
import store from "@/store";
import { GET_USERS } from "@/store/types";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Template extends Vue {
  loading = false;
  users: User[] = [];
  page = 1;
  total = 0;
  limit = 50;

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
    this.get_users({
      limit: this.limit,
      page: this.page
    });
  }

  async get_users(payload) {
    this.loading = true;
    try {
      const { data, headers } = await store.dispatch(GET_USERS, payload);
      this.total = Number(headers.total);
      this.page = Number(headers.page);
      this.limit = Number(headers["per-page"]);
      this.users = data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      return error;
    }
  }
}
</script>
