import ApiClient from "@zsmartex/z-apiclient";

class QuantexController {
  get_strategies() {
    return new ApiClient("quantex").get("admin/strategies");
  }

  get_strategy(id: number) {
    return new ApiClient("quantex").get(`admin/strategies/${id}`);
  }

  create_strategy(payload: Quantex.Strategy) {
    return new ApiClient("quantex").post("admin/strategies", payload);
  }

  update_strategy(payload: Quantex.Strategy) {
    return new ApiClient("quantex").put("admin/strategies", payload);
  }

  get_strategy_flows(strategy_id: number) {
    return new ApiClient("quantex").get("admin/strategies", { strategy_id });
  }

  create_strategy_flows(payload: Quantex.StrategyFlow) {
    return new ApiClient("quantex").post("admin/strategies", payload);
  }

  update_strategy_flows(payload: Quantex.StrategyFlow) {
    return new ApiClient("quantex").put("admin/strategies", payload);
  }

  get_markets() {
    return new ApiClient("quantex").get("admin/markets");
  }

  get_market(id: number) {
    return new ApiClient("quantex").get(`admin/markets/${id}`);
  }

  create_markets(payload: Quantex.Market) {
    return new ApiClient("quantex").post("admin/markets", payload);
  }

  update_markets(payload: Quantex.Market) {
    return new ApiClient("quantex").put("admin/markets", payload);
  }

  get_exchanges() {
    return new ApiClient("quantex").get("admin/exchanges");
  }

  get_exchange(id: number) {
    return new ApiClient("quantex").get(`admin/exchanges/${id}`);
  }

  create_exchange(name: string, driver: string, key: string, secret: string, host: string, ws: string) {
    return new ApiClient("quantex").post("admin/exchanges", {
      name,
      driver,
      key,
      secret,
      host,
      ws
    });
  }

  update_exchange(id: number, name: string, driver: string, key: string, secret: string, host: string, ws: string) {
    return new ApiClient("quantex").put("admin/exchanges", {
      id,
      name,
      driver,
      key,
      secret,
      host,
      ws
    });
  }
}

export default new QuantexController();
