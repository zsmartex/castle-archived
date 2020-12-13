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
import { PublicController } from "./controllers";

@Component
export default class App extends Vue {
  ready: boolean;

  constructor() {
    super();
  }

  get isReady() {
    return PublicController.page_ready;
  }
}
</script>
