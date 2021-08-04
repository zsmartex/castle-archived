<template>
  <a-layout-content class="page-bot-exchanges">
    <z-table
      :loading="loading"
      :columns="COLUMN"
      :data="exchanges"
      :hover="true"
      :scroll="false"
      :pagination="false"
      @click="
        item =>
          this.$refs['modal-exchange'].create({
            type: 'edit',
            payload: item
          })
      "
    />
    <modal-exchange ref="modal-exchange" @updated="get_exchanges" />
  </a-layout-content>
</template>

<script lang="ts">
import ZSmartModel from "@zsmartex/z-eventbus";
import { QuantexController } from "@/controllers";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "modal-exchange": () => import("./modal-exchange.vue")
  }
})
export default class Base extends Vue {
  loading = false;
  limit = 50;
  page = 1;
  exchanges = Array<Quantex.Exchange>();
  COLUMN = [
    { title: "ID", key: "id", algin: "left" },
    { title: "Name", key: "name", algin: "left" },
    { title: "Driver", key: "driver", algin: "left" },
    { title: "Host", key: "host", algin: "left" },
    { title: "WS", key: "ws", algin: "left" },
    { title: "Action", key: "action", algin: "left" }
  ];

  mounted() {
    this.get_exchanges();
    this.set_action_header();
  }

  set_action_header() {
    this.$route.meta["action-header"] = [
      {
        title: "Add Exchange",
        key: "add_exchange",
        icon: "plus-circle",
        callback: () => {
          (this.$refs["modal-exchange"] as any).create({
            type: "create"
          });
        }
      }
    ];

    this.$nextTick(() => {
      ZSmartModel.emit("set-action-header");
    });
  }

  async get_exchanges() {
    try {
      this.loading = true;
      const { data } = await QuantexController.get_exchanges();
      this.exchanges = data;
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }
}
</script>
