<template>
  <a-layout-content class="page-accountings-withdrawals details">
    <z-configuration>
      <div class="z-edit-panel">
        <div class="z-edit-panel-head">
          <div class="z-edit-panel-title">Member info</div>
        </div>
        <div class="z-edit-panel-content">
          <z-info-row
            v-for="setting in MEMBER_INFO"
            :key="setting.key"
            :item="setting"
          />
        </div>
        <div class="z-edit-panel-head" style="margin: 20px 0">
          <div class="z-edit-panel-title" v-if="currency">
            Account info: {{ currency.code.toUpperCase() }}
          </div>
          <div class="z-edit-panel-title" v-else>
            Account info:
          </div>
        </div>
        <div class="z-edit-panel-content">
          <z-info-row
            v-for="setting in ACCOUNT_INFO"
            :key="setting.key"
            :item="setting"
          />
        </div>
      </div>
      <div class="z-edit-panel">
        <div class="z-edit-panel-head">
          <div class="z-edit-panel-title">Withdraw info</div>
          <div v-if="withdraw" class="z-edit-panel-action">
            <template v-if="withdraw.state == 'accepted'">
              <a-button type="danger" @click="send_action('cancel')">
                Cancel
              </a-button>
              <a-button type="danger" @click="send_action('reject')">
                Reject
              </a-button>
              <a-button type="primary" @click="send_action('process')">
                Process
              </a-button>
            </template>
            <template v-if="withdraw.state == 'prepared'">
              <a-button type="danger" @click="send_action('cancel')">
                Cancel
              </a-button>
              <a-button type="primary" @click="send_action('accept')">
                Accept
              </a-button>
            </template>
          </div>
        </div>
        <div class="z-edit-panel-content">
          <z-info-row
            v-for="setting in WITHDRAW_INFO"
            :key="setting.key"
            :item="setting"
          />
        </div>
        <div class="z-edit-panel-content" style="margin-top: 20px">
          <z-info-row :item="WITHDRAW_INFO_EXTRA" v-model="txid_load" />
          <div class="z-edit-panel-action">
            <a-button
              type="primary"
              :disabled="!txid_load.length"
              @click="send_action('load', { txid: txid_load })"
            >
              Load Withdraw
            </a-button>
          </div>
        </div>
      </div>
      <z-loading v-if="loading" />
    </z-configuration>

    <withdrawals-table
      :loading="loading"
      :data="withdrawals"
      :total="total"
      :page="page"
      :limit="limit"
      :load-data="get_withdrawals"
      @click="on_table_click"
    />
  </a-layout-content>
</template>

<script lang="ts">
import store from "@/store";
import { getDate } from "@/mixins";
import {
  GET_CURRENCY,
  GET_MEMBER,
  GET_WITHDRAW,
  GET_WITHDRAWS,
  SEND_WITHDRAW_ACTION
} from "@/store/types";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "withdrawals-table": () => import("./table.vue")
  }
})
export default class WithdrawDetails extends Vue {
  loading = false;
  data: Withdraw[] = [];
  withdraw?: Withdraw = null;
  member?: Member = null;
  currency?: Currency = null;
  page = 1;
  total = 0;
  limit = 50;
  txid_load = "";

  get id() {
    return this.$route.params.id;
  }

  get withdrawals() {
    return this.data.map(withdraw => {
      withdraw.currency = withdraw.currency.toUpperCase();
      (withdraw as any).created_at = getDate(withdraw.created_at, true);

      return withdraw;
    });
  }

  get account() {
    return this.member?.accounts.find(
      account => account.currency === this.currency?.code
    );
  }

  get MEMBER_INFO() {
    return [
      {
        title: "Email",
        key: "email",
        value: this.member?.email,
        type: "input",
        edit: false
      },
      {
        title: "UID",
        key: "uid",
        value: this.member?.uid,
        type: "input",
        edit: false
      },
      {
        title: "Created at",
        key: "created_at",
        value: getDate(this.member?.created_at, true),
        type: "input",
        edit: false
      }
    ];
  }

  get ACCOUNT_INFO() {
    return [
      {
        title: "Total balance",
        key: "total",
        value: (
          Number(this.account?.balance) * Number(this.account?.locked)
        ).toFixed(8),
        type: "input",
        edit: false
      },
      {
        title: "Locked balance",
        key: "locked",
        value: this.account?.locked,
        type: "input",
        edit: false
      },
      {
        title: "Available balance",
        key: "available",
        value: this.account?.balance,
        type: "input",
        edit: false
      }
    ];
  }

  get WITHDRAW_INFO() {
    return [
      {
        title: "ID",
        key: "id",
        value: this.withdraw?.id,
        type: "input",
        edit: false
      },
      {
        title: "TxID",
        key: "txid",
        value: this.withdraw?.blockchain_txid,
        type: "input",
        edit: false
      },
      {
        title: "Created At",
        key: "created_at",
        value: getDate(this.withdraw?.created_at, true),
        type: "input",
        edit: false
      },
      {
        title: "State",
        key: "state",
        value: this.withdraw?.state,
        type: "input",
        edit: false
      },
      {
        title: "Email",
        key: "email",
        value: this.withdraw?.email,
        type: "input",
        edit: false
      },
      {
        title: "Recipient Address",
        key: "rid",
        value: this.withdraw?.rid,
        type: "input",
        edit: false
      },
      {
        title: "Amount",
        key: "amount",
        value: this.withdraw?.amount,
        type: "input",
        edit: false
      }
    ];
  }

  get WITHDRAW_INFO_EXTRA() {
    return {
      title: "TxID",
      key: "txid_load",
      value: this.txid_load,
      type: "input",
      style: "width: 45%",
      edit: true
    };
  }

  async beforeMount() {
    this.loading = true;
    await this.get_withdraw();
    await Promise.all([
      this.get_withdrawals(),
      this.get_member(),
      this.get_currency()
    ]);
    this.loading = false;
  }

  async get_withdraw() {
    try {
      const { data } = await store.dispatch(GET_WITHDRAW, this.id);
      this.withdraw = data;
    } catch (error) {
      return error;
    }
  }

  async get_withdrawals(payload = { limit: this.limit, page: this.page }) {
    try {
      const { data, headers } = await store.dispatch(
        GET_WITHDRAWS,
        Object.assign(payload, {
          uid: this.withdraw.uid
        })
      );

      this.total = Number(headers.total);
      this.page = Number(headers.page);
      this.limit = Number(headers["per-page"]);
      this.data = data;
    } catch (error) {
      return error;
    }
  }

  async get_member() {
    try {
      const { data } = await store.dispatch(GET_MEMBER, this.withdraw.uid);

      this.member = data;
    } catch (error) {
      return error;
    }
  }

  async get_currency() {
    try {
      const { data } = await store.dispatch(
        GET_CURRENCY,
        this.withdraw.currency
      );

      this.currency = data;
    } catch (error) {
      return error;
    }
  }

  async send_action(action: string, payload = {}) {
    try {
      await store.dispatch(
        SEND_WITHDRAW_ACTION,
        Object.assign(
          {
            action,
            id: this.withdraw.id
          },
          payload
        )
      );

      this.get_withdraw();
      this.get_member();
    } catch (error) {
      return error;
    }
  }

  async on_table_click(item: Withdraw) {
    this.$router.push(`/accountings/withdrawals/${item.id}/details`);

    this.loading = true;
    await this.get_withdraw();
    await this.get_withdrawals();
    this.loading = false;
  }
}
</script>

<style lang="less">
@import "~@styles/views/accountings/withdrawals/details";
</style>
