<template>
  <header
    class="page-dashboard-header ant-layout-header ant-layout-header-light"
  >
    <a-icon
      class="ant-layout-sider-trigger ant-layout-sider-trigger-light"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="$emit('change-collapsed')"
    />
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
