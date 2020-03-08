<template>
  <z-content class="page-dashboard">
    <dashboard-menu :collapsed="collapsed" />
    <div class="ant-layout-sider ant-layout-sider-light">
      <dashboard-header
        :collapsed="collapsed"
        @change-collapsed="collapsed = !collapsed"
      />
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </div>
  </z-content>
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
  collapsed: boolean;
  constructor() {
    super();

    this.collapsed = false;
  }
}
</script>
