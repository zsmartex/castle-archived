<template>
  <body>
    <a-layout>
      <router-view v-if="isReady" />
      <div v-else>LOADING</div>
    </a-layout>
  </body>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store from "@/store";

@Component
export default class App extends Vue {
  ready: boolean;
  constructor() {
    super();
    this.ready = false;
  }

  get isReady() {
    return store.state.public.ready;
  }
}
</script>
