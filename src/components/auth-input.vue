<template>
  <div class="auth-input" :class="{ 'has-error': isError }">
    <div class="ant-input-affix-wrapper">
      <a-input-password
        v-if="input_type === 'password'"
        :value="value"
        :type="input_type"
        :placeholder="placeholder"
        :max-length="Number(maxlength)"
        ref="input"
        @input="$emit('input', $event.target.value)"
      >
        <slot slot="prefix" name="prefix" />
      </a-input-password>
      <a-input
        v-else
        :value="value"
        :type="input_type"
        :placeholder="placeholder"
        :max-length="Number(maxlength)"
        ref="input"
        @input="$emit('input', $event.target.value)"
      >
        <slot slot="prefix" name="prefix" />
      </a-input>
    </div>
    <div v-if="isError" class="ant-form-explain">
      Please input your Password!
    </div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Vue, Component, Prop } from "vue-property-decorator";

type InputVM = Vue & { value: string };

@Component({})
export default class App extends Vue {
  @Prop() protected readonly type!: string;
  @Prop() protected readonly placeholder!: string;
  @Prop() protected readonly value!: string | number;
  @Prop() protected readonly maxlength!: string | number;
  @Prop() protected readonly isError!: boolean;

  get input_type() {
    return this.type === "number" ? "text" : this.type;
  }

  onlyNumberInput($event) {
    if (this.type !== "number") return;
    const charCode = $event.which ? $event.which : $event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return $event.preventDefault();
  }

  clear() {
    this.$emit("input", "");
  }
}
</script>
