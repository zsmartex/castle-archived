<template>
  <a-layout-content class="page-dashboard-users page-dashboard-users-profile">
    <profile-header class="page-dashboard-users-profile-head" :UID="UID" />
    <a-tabs class="page-dashboard-users-content" defaultActiveKey="1">
      <a-tab-pane tab="User profile" key="1">
        <div v-if="user_info && member_info" class="profile-container">
          <user-info :user_info="user_info" :member_info="member_info" />
          <user-labels :user_info="user_info" />
        </div>
      </a-tab-pane>
      <a-tab-pane tab="Balance" key="2">
        <user-balance :member_info="member_info" />
      </a-tab-pane>
      <a-tab-pane tab="Open orders" key="3">
        <open-orders />
      </a-tab-pane>
    </a-tabs>
  </a-layout-content>
</template>

<script lang="ts">
import store from "@/store";
import { GET_USER_INFO, GET_MEMBER_INFO } from "@/store/types";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "profile-header": () => import("./header.vue"),
    "user-balance": () => import("./user-balance/base.vue"),
    "user-info": () => import("./user-profile/user-info/base.vue"),
    "user-labels": () => import("./user-profile/user-labels/base.vue"),
    "open-orders": () => import("./open-orders/base.vue")
  }
})
export default class App extends Vue {
  loading = false;

  beforeMount() {
    this.get_user_info();
  }

  get UID() {
    return this.$route.params.uid;
  }

  get user_info() {
    return store.state.admin.user_info;
  }

  get member_info() {
    return store.state.admin.member_info;
  }

  async get_user_info() {
    const { UID } = this;

    this.loading = true;
    await store.dispatch(GET_USER_INFO, UID);
    await store.dispatch(GET_MEMBER_INFO, UID);
    this.loading = false;
  }
}
</script>

<style lang="less">
@import "~@styles/views/user_profile.less";
</style>
