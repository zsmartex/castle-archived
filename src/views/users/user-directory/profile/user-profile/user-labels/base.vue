<template>
  <div class="user-labels">
    <div class="user-labels-head">
      <div class="title">Labels</div>
      <div class="action">
        <a-button
          type="primary"
          @click="
            render_modal({
              type: 'create'
            })
          "
          >Add new</a-button
        >
      </div>
    </div>
    <div class="user-labels-content">
      <a-tag
        v-for="label in labels"
        :key="label.key"
        :color="get_color(label.key)"
        @click="
          render_modal({
            type: 'edit',
            key: label.key,
            payload: { key: label.key, value: label.value, scope: label.scope }
          })
        "
      >
        <div class="content">{{ label.key }}:{{ label.value }}</div>
        <div
          class="closeable"
          @click.stop="remove_label(label.key, label.scope)"
        >
          <a-icon type="close-circle" />
        </div>
      </a-tag>
    </div>
    <modal-label ref="modal-label" @submit="modal_submit" />
  </div>
</template>

<script lang="ts">
import store from "@/store";
import ModalLabel from "./modal.vue";
import { StoreTypes } from "types";
import {
  CREATE_USER_LABEL,
  DELETE_USER_LABEL,
  UPDATE_USER_LABEL
} from "@/store/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "modal-label": ModalLabel
  }
})
export default class App extends Vue {
  $refs!: {
    "modal-label": ModalLabel;
  };
  @Prop() readonly user_info!: StoreTypes.UserInfo;

  get labels() {
    return this.user_info.labels;
  }

  async remove_label(key: string, scope: "private" | "public") {
    await store.dispatch(DELETE_USER_LABEL, {
      uid: this.user_info.uid,
      key: key,
      scope: scope
    });
  }

  async update_label(payload) {
    try {
      await store.dispatch(UPDATE_USER_LABEL, {
        uid: this.user_info.uid,
        key: payload.key,
        value: payload.value,
        scope: payload.scope
      });
      this.$refs["modal-label"].delete();
    } catch (error) {
      return error;
    }
  }

  get_color(label: string) {
    switch (label) {
      case "email":
        return "green";
      case "phone":
        return "cyan";
      case "document":
        return "blue";
    }
  }

  render_modal(payload) {
    this.$refs["modal-label"].create(payload);
  }

  async create_label(payload) {
    try {
      await store.dispatch(CREATE_USER_LABEL, {
        uid: this.user_info.uid,
        key: payload.key,
        value: payload.value,
        scope: payload.scope
      });
      this.$refs["modal-label"].delete();
    } catch (error) {
      return error;
    }
  }

  modal_submit(payload) {
    switch (payload.type) {
      case "create":
        this.create_label(payload.payload);
        break;
      case "edit":
        this.update_label(payload.payload);
        break;
    }
  }
}
</script>