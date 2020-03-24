<template>
  <div class="user-info-row">
    <span class="title">{{ title }}</span>
    <div class="value">
      <span v-if="!allow_edit">{{ value }}</span>
      <span v-if="prefix">{{ prefix }}</span>
      <input v-if="allow_edit" type="text" :value="value" :disabled="!edit" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class App extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly value!: string;
  @Prop() readonly prefix!: string;
  @Prop() readonly allow_edit!: boolean;
  @Prop() readonly edit!: boolean;
}
</script>
