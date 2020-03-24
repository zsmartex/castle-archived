<template>
  <div class="user-setting">
    <div class="user-setting-head">
      <div class="title">Setting</div>
    </div>
    <div class="user-setting-content">
      <template v-for="(item, index) in SETTING_LIST">
        <user-setting-row v-if="item.key === 'otp'" :key="index" :item="item">
          <span>{{ item.value ? "Enabled" : "Disabled" }}</span>
          <a-switch
            :loading="loading === item.key"
            :checked="item.value"
            @change="on2FASwitch"
          />
        </user-setting-row>
        <user-setting-row
          v-else
          :key="index"
          :item="item"
          @change="onSettingChange"
        />
      </template>
    </div>
  </div>
</template>

<script lang="tsx">
import store from "@/store";
import {
  UPDATE_USER_INFO,
  UPDATE_MEMBER_INFO,
  UPDATE_USER_ROLE
} from "@/store/types";
import { StoreTypes } from "types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "user-setting-row": () => import("./row.vue")
  }
})
export default class App extends Vue {
  protected loading: string | null = null;
  @Prop() readonly user_info!: StoreTypes.UserInfo;
  @Prop() readonly member_info!: StoreTypes.MemberInfo;

  get SETTING_LIST() {
    return [
      {
        title: "Status",
        value: this.user_info.state,
        key: "state",
        type: "select",
        list: {
          active: "Active",
          pending: "Pending",
          banned: "Banned",
          deleted: "Deleted"
        }
      },
      {
        title: "Referral UID",
        value: this.user_info.referral_uid || "",
        key: "referral_uid",
        style: "margin-left: 75px",
        type: "input"
      },
      {
        title: "Role",
        value: this.user_info.role,
        key: "role",
        type: "select",
        list: this.role_list
      },
      {
        title: "Fee group",
        value: this.member_info.group,
        key: "group",
        style: "margin-left: 75px",
        type: "select",
        list: {
          "vip-0": "VIP 0",
          "vip-1": "VIP 1",
          "vip-2": "VIP 2",
          "vip-3": "VIP 3"
        }
      },
      {
        title: "Authorization 2FA",
        value: this.user_info.otp,
        key: "otp",
        type: "slot",
        style_body: `justify-content: space-between;display: flex;flex-wrap: wrap;`
      }
    ];
  }

  get role_list() {
    return store.state.admin.role.map(record => (({} as any)[record] = record));
  }

  async on2FASwitch(checked: boolean) {
    this.loading = "otp";
    await store.dispatch(UPDATE_USER_INFO, {
      uid: this.user_info.uid,
      otp: checked
    });
    this.loading = null;
  }

  async onStateChange(state: string) {
    this.loading = "state";
    await store.dispatch(UPDATE_USER_INFO, {
      uid: this.user_info.uid,
      state: state
    });
    this.loading = null;
  }

  async onRoleChange(role: string) {
    this.loading = "role";
    await store.dispatch(UPDATE_USER_ROLE, {
      uid: this.user_info.uid,
      role: role
    });
    this.loading = null;
  }

  async onGroupChange(group: string) {
    this.loading = "group";
    await store.dispatch(UPDATE_MEMBER_INFO, {
      uid: this.user_info.uid,
      group: group
    });
    this.loading = null;
  }

  onSettingChange(payload: { key: string; value: string }) {
    switch (payload.key) {
      case "state":
        this.onStateChange(payload.value);
        break;
      case "role":
        this.onRoleChange(payload.value);
        break;
      case "group":
        this.onGroupChange(payload.value);
        break;
    }
  }
}
</script>
