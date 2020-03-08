<template>
  <a-modal
    :visible="modal.enabled"
    :footer="null"
    :width="width"
    :closable="true"
    :wrap-class-name="wrapClassName"
    @cancel="$emit('cancel')"
  >
    <slot />
  </a-modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class App extends Vue {
  @Prop({ default: 400 }) protected readonly width!: number;
  @Prop() protected readonly wrapClassName!: string;

  protected modal: { enabled: boolean };
  constructor() {
    super();

    this.modal = {
      enabled: false
    };
  }

  public create() {
    this.modal.enabled = true;
  }

  public delete() {
    this.modal.enabled = false;
  }
}
</script>
