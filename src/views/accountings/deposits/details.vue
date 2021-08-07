<template>
  <a-layout-content class="page-accountings-deposits details">
    <z-configuration>
      <div class="z-edit-panel">
        <div class="z-edit-panel-head">
          <div class="z-edit-panel-title">
            Deposit Details
          </div>

          <div class="z-edit-panel-action" v-if="deposit">
            <a-button
              v-if="['accepted', 'skipped', 'errored'].includes(deposit.state)"
              type="primary"
              @click="send_action('process')"
            >
              Process
            </a-button>
          </div>
        </div>
        <div class="z-edit-panel-content">
          <z-info-row
            v-for="setting in SETTING_PANEL_LEFT"
            :key="setting.key"
            :item="setting"
          />
        </div>
      </div>
      <z-loading v-if="loading" />
    </z-configuration>
  </a-layout-content>
</template>

<script lang="ts">
import store from "@/store";
import { GET_DEPOSITS, SEND_DEPOSIT_ACTION } from "@/store/types";
import { getDate, runNotice } from "@/mixins";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class DepositDetails extends Vue {
  loading = false;
  deposit?: Deposit = null;

  get tid(): string {
    return this.$route.params.tid;
  }

  get SETTING_PANEL_LEFT() {
    return [
      {
        title: "Name",
        key: "uid",
        value: this.deposit?.uid,
        type: "input",
        style: "width: 45%",
        edit: false
      },
      {
        title: "Date",
        key: "date",
        value: getDate(this.deposit?.created_at, true),
        type: "input",
        style: "width: 45%",
        edit: false
      },
      {
        title: "Member",
        key: "member",
        value: this.deposit?.email,
        type: "input",
        style: "width: 45%",
        edit: false
      },
      {
        title: "State",
        key: "state",
        value: this.deposit?.state,
        type: "input",
        style: "width: 45%",
        edit: false
      },
      {
        title: "Amount",
        key: "amount",
        value: this.deposit?.amount,
        type: "input",
        edit: false
      }
    ];
  }

  beforeMount() {
    this.get_deposit();
  }

  async get_deposit() {
    this.loading = true;
    try {
      const { data } = await store.dispatch(GET_DEPOSITS, { tid: this.tid });
      if (data.length) this.deposit = data[0];
      this.loading = false;
    } catch (error) {
      this.loading = false;
      return error;
    }
  }

  async send_action(action: string) {
    try {
      const { data } = await store.dispatch(SEND_DEPOSIT_ACTION, {
        id: this.deposit.id,
        action: action
      });
      runNotice("success", "Action was send successfully");
      this.deposit = data;
    } catch (error) {
      return error;
    }
  }
}
</script>

<style lang="less">
@import "~@styles/views/accountings/deposits/details";
</style>
