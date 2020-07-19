<template>
  <button
    class="auth-button"
    @click="onButtonClicked"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class AuthButton extends Vue {
  @Prop({ default: "text" }) readonly type!: string;
  @Prop({ default: false }) readonly disabled!: boolean;

  onButtonClicked($event) {
    this.$emit("click", $event);
  }
}
</script>

<style lang="less">
.auth-button {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  margin: 20px 0;
  border: 0;
  border-radius: 0;
  cursor: pointer;
}
</style>
