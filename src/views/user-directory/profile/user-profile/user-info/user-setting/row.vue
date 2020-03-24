<template>
  <div class="user-setting-row" :style="item.style">
    <div class="title">{{ item.title }}</div>
    <div class="value" :style="item.style_body">
      <div class="input-setting" v-if="item.type === 'input'">
        <a-input type="text" :value="input_value" @input="onInputChange" />
        <a-button v-if="input_value !== item.value" type="primary">
          Save
        </a-button>
      </div>
      <slot v-if="item.type === 'slot'" />
      <a-select
        v-else-if="item.type === 'select'"
        :value="item.value"
        @change="onChange"
      >
        <a-select-option
          v-for="(select, key) in item.list"
          :key="key"
          :value="key"
        >
          {{ select }}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class App extends Vue {
  input_value = "";

  @Prop() readonly item!: {
    title: string;
    value: string | boolean;
    key: string;
    type: "input" | "slot" | "select";
    style?: string;
    style_body?: string;
    list?: {
      [key: string]: string;
    };
  };

  beforeMount() {
    if (typeof this.item.value !== "string") return;
    this.input_value = this.item.value;
  }

  onInputChange($event) {
    const { value } = $event.target;

    this.input_value = value;
  }

  onChange(value: string) {
    this.$emit("change", { key: this.item.key, value: value });
  }
}
</script>
