<template>
  <header
    class="page-dashboard-header ant-layout-header ant-layout-sider-light"
  >
    <span class="ant-layout-header-trigger" @click="$emit('change-collapsed')">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </span>
  </header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  @Prop() protected readonly collapsed!: string;

  constructor() {
    super();
  }
}
</script>
