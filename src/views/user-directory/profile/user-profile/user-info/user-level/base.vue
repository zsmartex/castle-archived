<template>
  <div class="user-level">
    <div class="user-level-head">
      <div class="title">Level: {{ user_info.level }}</div>
    </div>
    <div class="user-level-content">
      <user-level-row
        v-for="(label, index) in LABEL_LIST"
        :title="label.title"
        :desc="label.desc"
        :value="label.value"
        :data_key="label.key"
        :key="label.key"
        :loading="loading === index"
        @user-label-change="onUserLabelChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import {
  CREATE_USER_LABEL,
  DELETE_USER_LABEL
} from "@/store/modules/admin/action-types";
import { StoreTypes } from "types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "user-level-row": () => import("./row.vue")
  }
})
export default class App extends Vue {
  loading = -1;
  @Prop() readonly user_info!: StoreTypes.UserInfo;

  get LABEL_LIST() {
    return [
      {
        key: "email",
        title: "Email verification",
        desc: "Confirm the phone",
        value: !!this.labels.find(
          record => record.key === "email" && record.value === "verified"
        )
      },
      {
        key: "phone",
        title: "Phone verification",
        desc: "Confirm the phone",
        value: !!this.labels.find(
          record => record.key === "phone" && record.value === "verified"
        )
      },
      {
        key: "document",
        title: "Residence verification",
        desc: "Confirm the document",
        value: !!this.labels.find(
          record => record.key === "document" && record.value === "verified"
        )
      }
    ];
  }

  get labels() {
    return this.user_info.labels;
  }

  removeLoading() {
    this.loading = -1;
  }

  async delete_label() {
    return;
  }

  async onUserLabelChange(payload: { key: string; value: boolean }) {
    const index = this.LABEL_LIST.findIndex(
      record => record.key === payload.key
    );
    this.loading = index;

    await store.dispatch(
      payload.value ? CREATE_USER_LABEL : DELETE_USER_LABEL,
      {
        uid: this.user_info.uid,
        key: payload.key,
        scope: "private",
        value: payload.value ? "verified" : null
      }
    );
    this.removeLoading();
  }
}
</script>
