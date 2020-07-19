<template>
  <a-modal
    v-model="modal_enabled"
    wrap-class-name="modal-permission"
    :title="title"
    :width="width"
    :footer="false"
  >
    <z-info-row
      v-for="setting in SETTING_LIST"
      :key="setting.key"
      :item="setting"
      @input="value => set_cache_value(setting.key, value)"
    />

    <a-button type="primary" :disabled="button_disabled" @click="onSubmit">
      {{ button_string }}
    </a-button>
  </a-modal>
</template>

<script lang="ts">
import ZModalMixin from "@/mixins/z-modal";
import { Component, Mixins } from "vue-property-decorator";

interface Payload {
  type: "edit" | "create";
  item: PayloadItem;
}

interface PayloadItem {
  id?: number;
  role: string;
  path: string;
  topic: string | null;
  verb: string;
  action: string;
}

@Component
export default class ModalPermission extends Mixins(ZModalMixin) {
  payload: Payload = {
    type: "create",
    item: {
      role: "",
      path: "",
      topic: "",
      verb: "",
      action: ""
    }
  };
  cache_edit: PayloadItem = this.payload.item;

  get title() {
    return this.payload?.type === "edit"
      ? "Edit permission"
      : "Create permission";
  }

  get button_disabled() {
    const diff_object = this.diff_object(this.payload?.item, this.cache_edit, [
      "role",
      "path",
      "topic",
      "verb",
      "action"
    ]);
    const value_exists = this.value_exists(this.cache_edit, [
      "role",
      "path",
      "verb",
      "action"
    ]);

    return diff_object || !value_exists;
  }

  get SETTING_LIST() {
    return [
      {
        title: "Role",
        key: "role",
        value: this.cache_edit?.role,
        type: "input",
        edit: true
      },
      {
        title: "Path",
        key: "path",
        value: this.cache_edit?.path,
        type: "input",
        edit: true
      },
      {
        title: "Topic",
        key: "topic",
        value: this.cache_edit?.topic,
        type: "input",
        edit: true
      },
      {
        title: "Verb",
        key: "verb",
        value: this.cache_edit?.verb,
        type: "input",
        edit: true
      },
      {
        title: "Action",
        key: "action",
        value: this.cache_edit?.action,
        type: "input",
        edit: true
      }
    ];
  }

  get button_string() {
    return this.payload?.type === "edit" ? "Edit" : "Create";
  }

  diff_object(source, target, keys: string[]) {
    const map_diff = keys.map(key => source[key] === target[key]);

    return map_diff.reduce((a, b) => a && b, true);
  }

  value_exists(object, keys: string[]) {
    const map_exists = keys.map(key => !!object[key]);

    return map_exists.reduce((a, b) => a && b, true);
  }

  set_cache_value(key: string, value: string) {
    (this.cache_edit as any)[key] = value;
    this.$nextTick(() => {
      this.$forceUpdate();
    });
  }

  onCreate(payload: Payload) {
    this.payload = payload;
    this.cache_edit = payload.item;
  }

  onSubmit() {
    this.$emit("submit", {
      type: this.payload?.type,
      item: this.cache_edit
    });
  }
}
</script>

<style lang="less">
@import "~@styles/views/settings/permissions/modal";
</style>
