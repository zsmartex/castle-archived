<template>
  <router-view />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class PageView extends Vue {
  constructor() {
    super();
  }
}
</script>
