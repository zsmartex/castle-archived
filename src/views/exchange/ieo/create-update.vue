<template>
  <div v-if="!loading" :class="['page-exchange-ieo', page_type]">
    <z-configuration>
      <div class="z-edit-panel">
        <div class="z-edit-panel-content">
          <z-info-row
            v-for="setting in SETTING_PANEL_LEFT"
            v-model="ieo[setting.key]"
            :key="setting.key"
            :item="setting"
          />
        </div>
      </div>
      <div class="z-edit-panel">
        <div class="z-edit-panel-content">
          <z-info-row
            v-for="setting in SETTING_PANEL_RIGHT"
            v-model="ieo[setting.key]"
            :key="setting.key"
            :item="setting"
          >
            <template slot="start_time">
              <a-date-picker @change="onStartTimeChanged" />
            </template>
            <template slot="end_time">
              <a-date-picker @change="onEndTimeChanged" />
            </template>
          </z-info-row>
          <div class="z-edit-panel-action">
            <a-button @click="onSubmit" type="primary">Submit</a-button>
          </div>
        </div>
      </div>
    </z-configuration>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { GET_CURRENCIES } from "@/store/types";
import moment from "moment";
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class IEOCreateUpdate extends Vue {
  loading = false;
  ieo: IEO = {};
  currencies: string[] = [];

  get page_type() {
    return this.$route.meta.type;
  }

  get SETTING_PANEL_LEFT() {
    return [
      {
        title: "Curency",
        key: "currency_id",
        value: this.ieo.currency_id,
        type: "select",
        list: this.currencies
          .filter(c => c != this.ieo.main_payment_currency)
          .reduce((a, b) => ((a[b] = b.toUpperCase()), a), {})
      },
      {
        title: "Main Paymnet Currency",
        key: "main_payment_currency",
        value: this.ieo.main_payment_currency,
        type: "select",
        list: this.currencies
          .filter(c => c != this.ieo.currency_id)
          .reduce((a, b) => ((a[b] = b.toUpperCase()), a), {})
      },
      { title: "Price", key: "price", type: "input", edit: true }
    ];
  }

  get SETTING_PANEL_RIGHT() {
    return [
      {
        title: "Min Amount",
        key: "min_amount",
        type: "input",
        value: this.ieo.min_amount,
        edit: true
      },
      {
        title: "Start Time",
        key: "start_time",
        value: this.ieo.start_time,
        type: "slot"
      },
      {
        title: "End Time",
        key: "end_time",
        value: this.ieo.end_time,
        type: "slot"
      }
    ];
  }

  mounted() {
    this.get_currencies();

    if (this.page_type == "update") {
      // get_ieo
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

  onStartTimeChanged(date?: moment.Moment) {
    if (date) {
      this.ieo.start_time = date.unix();
    } else {
      this.ieo.start_time = null;
    }
  }

  onEndTimeChanged(date?: moment.Moment) {
    if (date) {
      this.ieo.end_time = date.unix();
    } else {
      this.ieo.end_time = null;
    }
  }

  onSubmit() {
    //
  }
}
</script>
