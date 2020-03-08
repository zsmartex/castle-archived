<template>
  <a-layout-sider
    collapsible
    :collapsed="collapsed"
    :trigger="null"
    :width="250"
    style="z-index: 1;"
  >
    <div class="ant-layout-sider-logo">
      <router-link to="/dashboard">
        <img src="@/assets/img/logo.png" />
        <h1>ZSmart Admin</h1>
      </router-link>
    </div>
    <a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['sub1']"
      mode="inline"
      theme="dark"
    >
      <a-sub-menu key="sub1">
        <span slot="title">
          <a-icon type="dashboard" />
          <span>Dashboard</span>
        </span>
        <a-menu-item key="1">
          <router-link
            to="/dashboard/analysis"
            exact-active-class=""
            active-class=""
          >
            <a-icon type="fund" />
            <span>Analysis</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class App extends Vue {
  @Prop() readonly collapsed!: boolean;
  constructor() {
    super();
  }
}
</script>
