<template>
  <div class="user-level-row">
    <div class="title">
      <div>{{ title }}</div>
      <div class="desc">{{ desc }}</div>
    </div>
    <div class="value">
      <a-switch :loading="loading" :checked="value" @change="onValueChanged" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  @Prop() readonly data_key!: string;
  @Prop() readonly title!: string;
  @Prop() readonly desc!: string;
  @Prop() readonly value!: boolean;
  @Prop({ default: false }) readonly loading!: boolean;

  onValueChanged(checked: boolean) {
    this.$emit("user-label-change", { key: this.data_key, value: checked });
  }
}
</script>
