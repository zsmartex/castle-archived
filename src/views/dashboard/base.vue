<template>
  <a-layout class="page-dashboard ant-layout-has-sider">
    <dashboard-menu :collapsed="collapsed" />
    <div
      class="page-dashboard-body ant-layout ant-layout-sider ant-layout-sider-light"
    >
      <dashboard-header
        :collapsed="collapsed"
        @change-collapsed="changeCollapsed"
      />
      <div class="page-dashboard-content">
        <router-view />
      </div>
    </div>
  </a-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "dashboard-menu": () => import("@/layouts/dashboard/menu.vue"),
    "dashboard-header": () => import("@/layouts/dashboard/header.vue")
  }
})
export default class App extends Vue {
  collapsed = false;

  changeCollapsed() {
    this.collapsed = !this.collapsed;
    this.$nextTick(() => {
      window.dispatchEvent(new Event("resize"));
    });
  }
}
</script>

<style lang="less">
@import "~@styles/views/dashboard.less";
</style>
