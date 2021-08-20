import { applyMixins } from "../mixins";
import ApiClient from "@zsmartex/z-apiclient";
import GettersSetters from "./getters_setters";
import store from "./store";
import Vue from "vue";

export class QuantexController {
  constructor() {
    this.store = store;
  }

  async get_strategies() {
    try {
      this.strategies.loading = true;
      const { data } = await new ApiClient("quantex").get("admin/strategies");
      this.strategies.data = data;
    } catch (error) {
      return error;
    } finally {
      this.strategies.loading = false;
    }
  }

  async create_strategy(payload: Quantex.Strategy) {
    try {
      const { data } = await new ApiClient("quantex").post("admin/strategies", payload);
      this.strategies.data.push(data);
    } catch (error) {
      return error;
    }
  }

  async update_strategy(payload: Quantex.Strategy) {
    delete payload.created_at;
    delete payload.updated_at;

    try {
      const { data } = await new ApiClient("quantex").put("admin/strategies", payload);
      const index = this.strategies.data.findIndex(strategy => strategy.id == payload.id);

      if (index >= 0) {
        Vue.set(this.strategies.data, index, data)
      }
    } catch (error) {
      return error;
    }
  }

  get_strategy_flows(strategy_id: number) {
    return new ApiClient("quantex").get(`admin/strategies/${strategy_id}/flows`);
  }

  create_strategy_flow(payload: Quantex.StrategyFlow) {
    return new ApiClient("quantex").post("admin/strategies/flows", payload);
  }

  update_strategy_flow(payload: Quantex.StrategyFlow) {
    return new ApiClient("quantex").put("admin/strategies/flows", payload);
  }

  async get_markets() {
    try {
      this.markets.loading = true;
      const { data } = await new ApiClient("quantex").get("admin/markets");
      this.markets.data = data;
    } catch (error) {
      return error;
    } finally {
      this.markets.loading = false;
    }
  }

  async create_market(payload: Quantex.Market) {
    try {
      const { data } = await new ApiClient("quantex").post("admin/markets", payload);
      this.markets.data.push(data);
    } catch (error) {
      return error;
    }
  }

  async update_market(payload: Quantex.Market) {
    try {
      const { data } = await new ApiClient("quantex").put("admin/markets", payload);
      const index = this.markets.data.findIndex(market => market.id == payload.id);

      if (index >= 0) {
        Vue.set(this.markets.data, index, data);
      }
    } catch (error) {
      return error;
    }
  }

  async get_exchanges() {
    try {
      this.exchanges.loading = true;
      const { data } = await new ApiClient("quantex").get("admin/exchanges");
      this.exchanges.data = data;
    } catch (error) {
      return error;
    } finally {
      this.exchanges.loading = false;
    }
  }

  async create_exchange(payload: Quantex.Exchange) {
    try {
      const { data } = await new ApiClient("quantex").post("admin/exchanges", payload);
      this.exchanges.data.push(data);
    } catch (error) {
      return error;
    }
  }

  async update_exchange(payload: Quantex.Exchange) {
    try {
      const { data } = await new ApiClient("quantex").put("admin/exchanges");
      const index = this.exchanges.data.findIndex(exchange => exchange.id == payload.id);

      if (index >= 0) {
        Vue.set(this.exchanges.data, index, data);
      }
    } catch (error) {
      return error;
    }
  }

  async get_drivers() {
    try {
      this.drivers.loading = true;
      const { data } = await new ApiClient("quantex").get("admin/exchanges/drivers");
      this.drivers.data = data;
    } catch (error) {
      return error;
    } finally {
      this.drivers.loading = false;
    }
  }
}

export interface QuantexController extends GettersSetters {
}

applyMixins(QuantexController, [GettersSetters]);

const class_mounted = new QuantexController();

export default class_mounted;
