<template>
  <div>
    <a-card title="Card title" :bordered="false" style="width: 300px">
      <v-chart :force-fit="true" :height="height" :data="data" :scale="scale">
        <v-tooltip />
        <v-axis />
        <v-smooth-line position="month*temperature" color="city" :size="2" />
      </v-chart>
    </a-card>
  </div>
</template>

<script lang="ts">
import G2 from "@antv/g2";
import store from "@/store";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  height: number;
  chart!: G2.Chart;
  constructor() {
    super();

    this.height = 400;

    store.dispatch("admin/get_metrics");
  }

  mounted() {
    this.chart = new G2.Chart({
      
    });
  }

  get metrics() {
    return store.state.admin.metrics;
  }
}
</script>
