<template>
  <a-layout-content
    v-if="!loading"
    class="page-accountings-adjustments details"
  >
    <z-configuration>
      <div class="z-edit-panel">
        <div class="z-edit-panel-content">
          <template v-if="page_type === 'add'">
            <z-info-row
              v-for="setting in SETTING_PANEL_LEFT"
              v-model="adjustment[setting.key]"
              :key="setting.key"
              :item="setting"
            >
              <template>
                <template slot="counter_part_code">
                  <a-select
                    v-model="adjustment['receiving_account_code']"
                    size="large"
                    style="width: 20%; margin-right: 20px"
                  >
                    <a-select-option
                      v-for="code in ['202,', '302', '402']"
                      :value="code"
                      :key="code"
                    >
                      {{ code }}
                    </a-select-option>
                  </a-select>
                  <a-input
                    v-model="adjustment['receiving_member_uid']"
                    size="large"
                    placeholder="UID"
                    style="width: 35%"
                  />
                </template>
              </template>
            </z-info-row>
          </template>
          <template v-else>
            <z-info-row
              v-for="setting in SETTING_PANEL_LEFT"
              :value="adjustment[setting.key]"
              :key="setting.key"
              :item="setting"
            >
              <template>
                <template slot="counter_part_code">
                  <a-select
                    :value="adjustment['receiving_account_code']"
                    size="large"
                    style="width: 20%; margin-right: 20px"
                  >
                    <a-select-option
                      v-for="code in ['202,', '302', '402']"
                      :value="code"
                      :key="code"
                    >
                      {{ code }}
                    </a-select-option>
                  </a-select>
                  <a-input
                    :value="adjustment['receiving_member_uid']"
                    size="large"
                    placeholder="UID"
                    style="width: 35%"
                  />
                </template>
              </template>
            </z-info-row>
          </template>
        </div>
      </div>
      <div class="z-edit-panel">
        <div class="z-edit-panel-content">
          <z-info-row
            v-for="setting in SETTING_PANEL_RIGHT"
            :value="adjustment[setting.key]"
            :key="setting.key"
            :item="setting"
            style="margin-bottom: 12px"
          />
          <a-textarea
            v-if="page_type === 'add'"
            size="large"
            v-model="adjustment['description']"
            placeholder="Adjustment description"
            allow-clear
            :autosize="true"
          />
          <a-textarea
            v-else
            size="large"
            :value="adjustment['description']"
            placeholder="Adjustment description"
            allow-clear
            :autosize="true"
          />
        </div>
      </div>
    </z-configuration>
  </a-layout-content>
</template>

<script lang="ts">
import store from "@/store";
import { GET_ADJUSTMENT, GET_CURRENCIES } from "@/store/types";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AdjustmentInfo extends Vue {
  loading = false;
  adjustment: Adjustment = {
    amount: "",
    asset_account_code: 0,
    category: "",
    creator_uid: "",
    currency: "",
    description: "",
    reason: "",
    receiving_account_code: "",
    receiving_member_uid: ""
  };
  currencies: string[] = [];

  get page_type(): "add" | "update" {
    return this.$route.meta.page_type;
  }

  get id() {
    return this.$route.params.id;
  }

  get currencies_list(): { [key: string]: string } {
    return this.currencies.reduce((a, b) => ((a[b] = b.toUpperCase()), a), {});
  }

  get SETTING_PANEL_LEFT() {
    return [
      {
        title: "Reason",
        key: "reason",
        value: this.adjustment.reason,
        type: "input",
        style: this.page_type === "update" ? "width: 45%" : "width: 100%",
        edit: true
      },
      {
        title: "State",
        key: "state",
        value: this.adjustment.state,
        type: "input",
        style: "width: 45%",
        edit: false
      },
      {
        title: "Currency",
        key: "currency",
        value: this.adjustment.currency,
        type: "select",
        list: this.currencies_list
      },
      {
        title: "Category",
        key: "category",
        value: this.adjustment.category,
        type: "input",
        edit: true
      },
      {
        title: "Asset code",
        key: "asset_account_code",
        value: this.adjustment.asset_account_code,
        type: "input",
        edit: true
      },
      { title: "Counterpart code", key: "counter_part_code", type: "slot" },
      {
        title: "Creator UID",
        key: "creator_uid",
        value: this.adjustment.creator_uid,
        type: "input",
        edit: true
      },
      {
        title: "Vaildaor UID",
        key: "validator_uid",
        value: this.adjustment.validator_uid || "",
        type: "input",
        edit: true
      }
    ].filter(setting => {
      if (this.page_type === "add") {
        return !["state", "validator_uid"].includes(setting.key);
      }

      return true;
    });
  }

  get SETTING_PANEL_RIGHT() {
    return [
      {
        title: "Created At",
        key: "created_at",
        value: this.adjustment.created_at,
        type: "input",
        style: "width: 50%"
      },
      {
        title: "Updated At",
        key: "updated_at",
        value: this.adjustment.updated_at,
        type: "input",
        style: "width: 50%"
      }
    ].filter(() => this.page_type !== "add");
  }

  beforeMount() {
    if (this.page_type === "update") this.get_adjustment();
    this.get_currencies();
  }

  async get_adjustment() {
    this.loading = true;
    try {
      const { data } = await store.dispatch(GET_ADJUSTMENT, this.id);
      this.adjustment = data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      return error;
    }
  }

  async get_currencies() {
    try {
      const { data } = await store.dispatch(GET_CURRENCIES, { limit: 100 });
      this.currencies = data.map(currency => currency.code);
    } catch (error) {
      return error;
    }
  }
}
</script>
