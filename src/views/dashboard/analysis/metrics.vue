<template>
  <a-card
    :loading="loading"
    class="metrics-chart"
    title="Last 7 days user activity"
    :bordered="false"
  >
    <a-button @click="get_metrics" slot="extra">Reload</a-button>
    <line-chart ref="metrics" :height="350" />
  </a-card>
</template>

<script lang="ts">
import moment from "moment";
import store from "@/store";
import { LineChart } from "@/components/chart";
import { Vue, Component } from "vue-property-decorator";

interface MetricsLineChart {
  date: string;
  signups?: number;
  sucessful_logins?: number;
  failed_logins?: number;
}

@Component({
  components: {
    LineChart
  }
})
export default class App extends Vue {
  loading: boolean;
  is_chart_draw: boolean;
  $refs!: {
    metrics: LineChart;
  };
  constructor() {
    super();

    this.is_chart_draw = false;
    this.loading = true;
    this.get_metrics();
  }

  metric_name_to_lang(name) {
    if (name === "signups") return "SignUp";
    if (name === "sucessful_logins") return "Sucessful Login";
    if (name === "failed_logins") return "Failed Login";
    return name;
  }

  async get_metrics() {
    await store.dispatch("admin/GET_METRICS");
    this.loading = false;
    this.$nextTick(() => {
      if (!this.$refs.metrics) return;
      if (!this.is_chart_draw) {
        this.$refs.metrics.create_chart();
        this.draw_chart();
        this.is_chart_draw = true;
      }
      this.$refs.metrics.chart_data(this.metrics);
      this.$refs.metrics.render_chart();
    });
  }

  draw_chart() {
    const { chart } = this.$refs.metrics;

    chart.scale({
      [this.metric_name_to_lang("signups")]: {
        min: 0,
        max: 100
      },
      [this.metric_name_to_lang("sucessful_logins")]: {
        min: 0,
        max: 100
      },
      [this.metric_name_to_lang("failed_logins")]: {
        min: 0,
        max: 100
      }
    });

    chart.tooltip({
      shared: true
    });

    chart.legend({
      custom: true,
      items: [
        {
          name: this.metric_name_to_lang("signups"),
          value: this.metric_name_to_lang("signups"),
          marker: { symbol: "line", style: { stroke: "#1890ff", lineWidth: 2 } }
        },
        {
          name: this.metric_name_to_lang("sucessful_logins"),
          value: this.metric_name_to_lang("sucessful_logins"),
          marker: { symbol: "line", style: { stroke: "#2fc25b", lineWidth: 2 } }
        },
        {
          name: this.metric_name_to_lang("failed_logins"),
          value: this.metric_name_to_lang("failed_logins"),
          marker: {
            symbol: "line",
            style: { stroke: "#e97878", lineWidth: 2 }
          }
        }
      ]
    });

    chart
      .line()
      .position(`date*${this.metric_name_to_lang("signups")}`)
      .color("#1890ff");
    chart
      .line()
      .position(`date*${this.metric_name_to_lang("sucessful_logins")}`)
      .color("#2fc25b");
    chart
      .line()
      .position(`date*${this.metric_name_to_lang("failed_logins")}`)
      .color("#e97878");
  }

  get metrics() {
    const { metrics } = store.state.admin;
    const keys = Object.keys(metrics);

    const out_data: MetricsLineChart[] = [];

    for (const metric_name of keys) {
      if (metric_name === "pending_applications") {
        continue;
      }
      const name = this.metric_name_to_lang(metric_name);

      for (const date in metrics[metric_name]) {
        const metric_value = metrics[metric_name][date];
        const index = out_data.findIndex(record => {
          return date === record.date;
        });
        if (index >= 0) {
          out_data[index][name] = metric_value;
          continue;
        }

        const data = { date };
        data[name] = metric_value;
        out_data.push(data);
      }
    }

    out_data.sort((first, end) => {
      const first_date = moment(first.date, "YYYY-MM-DD").toDate();
      const end_date = moment(end.date, "YYYY-MM-DD").toDate();

      return first_date.getTime() - end_date.getTime();
    });

    return out_data;
  }
}
</script>
