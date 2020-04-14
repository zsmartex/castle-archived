<template>
  <z-modal
    v-if="showing"
    ref="modal"
    wrap-class-name="modal-label"
    :title="title"
    @cancel="onCancel"
  >
    <a-input
      v-model="cache_edit.key"
      placeholder="Key *"
      :disabled="payload.type === 'edit'"
    />
    <a-input v-model="cache_edit.value" placeholder="Value *" />

    <a-select v-model="cache_edit.scope">
      <a-select-option value="private">private</a-select-option>
      <a-select-option value="public">public</a-select-option>
    </a-select>

    <a-button
      type="primary"
      @click="$emit('submit', { type: payload.type, payload: cache_edit })"
      :disabled="button_disabled"
    >
      {{ title }}
    </a-button>
  </z-modal>
</template>

<script lang="ts">
import ZModal from "@/layouts/z-modal.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "z-modal": ZModal
  }
})
export default class App extends Vue {
  showing = false;
  $refs!: {
    modal: ZModal;
  };

  payload!: {
    type: "edit" | "create";
    key?: string;
    payload?: {
      key: string;
      value: string;
      scope: "private" | "public";
    };
  };

  cache_edit = {
    key: "",
    value: "",
    scope: "private"
  };

  beforeMount() {
    this.reload_payload();
  }

  reload_payload() {
    this.payload = { type: "create" };
    this.cache_edit = {
      key: "",
      value: "",
      scope: "private"
    };
  }

  get button_disabled() {
    let allow = this.cache_edit.key !== "" && this.cache_edit.value !== "";
    if (this.payload.type === "edit") {
      if (!this.payload.payload) return false;
      allow = allow && this.cache_edit.key !== this.payload.payload.key;
      allow = allow || this.cache_edit.value !== this.payload.payload.value;
      allow = allow || this.cache_edit.scope !== this.payload.payload.scope;
    }
    return !allow;
  }

  get title() {
    return this.payload.type === "edit" ? "Edit label" : "Create label";
  }

  public create(payload) {
    this.showing = true;
    this.payload = payload;
    this.afterCreate();
    this.$nextTick(() => {
      this.$refs.modal.create();
    });
  }

  afterCreate() {
    if (!this.payload.payload) return;
    this.cache_edit.key = this.payload.payload.key;
    this.cache_edit.value = this.payload.payload.value;
    this.cache_edit.scope = this.payload.payload.scope;
  }

  public delete() {
    this.$refs.modal.delete();
    this.showing = false;
    this.reload_payload();
  }

  onCancel() {
    this.delete();
    this.$emit("cancel");
  }
}
</script>
