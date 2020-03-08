<template>
  <a-layout-content>
    <slot />
  </a-layout-content>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ZContent extends Vue {
  constructor() {
    super();
  }
}
</script>
