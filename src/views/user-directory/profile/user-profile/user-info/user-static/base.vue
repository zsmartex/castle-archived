<template>
  <div class="user-info">
    <div class="user-info-head">
      <div class="title">
        <div class="email">{{ user_info.email }}</div>
        <div class="last-activity">
          Last activity: {{ getDate(user_info.updated_at) }}
        </div>
      </div>
      <div class="action">
        <a-button type="primary" @click="start_edit">
          {{ edit ? "Save" : "Edit" }}
        </a-button>
      </div>
    </div>
    <div class="user-info-content">
      <user-info-row
        v-for="(item, index) in LIST_INFO"
        :key="index"
        :title="item.title"
        :value="item.value"
        :allow_edit="!!item.allow_edit"
        :edit="edit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import helpers from "@zsmartex/z-helpers";
import row from "./row.vue";
import { StoreTypes } from "types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "user-info-row": row
  }
})
export default class App extends Vue {
  protected edit = false;

  @Prop() readonly user_info!: StoreTypes.UserInfo;

  LIST_INFO = [
    { title: "UID", value: this.user_info.uid, allow_edit: false },
    {
      title: "Created at",
      value: this.getDate(this.user_info.created_at),
      allow_edit: false
    }
  ];

  start_edit() {
    this.edit = !this.edit;
  }

  getDate(date: Date) {
    return helpers.getDate(date, true);
  }
}
</script>
