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

  reload_strategy(id: number) {
    return new ApiClient("quantex").post(`admin/strategies/${id}/reload`);
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

  get_markets() {
    return new ApiClient("quantex").get("admin/markets");
  }

  get_market(id: number) {
    return new ApiClient("quantex").get(`admin/markets/${id}`);
  }

  create_market(payload: Quantex.Market) {
    return new ApiClient("quantex").post("admin/markets", payload);
  }

  update_market(payload: Quantex.Market) {
    return new ApiClient("quantex").put("admin/markets", payload);
  }

  get_exchanges() {
    return new ApiClient("quantex").get("admin/exchanges");
  }

  get_exchange(id: number) {
    return new ApiClient("quantex").get(`admin/exchanges/${id}`);
  }

  create_exchange(payload: Quantex.Exchange) {
    return new ApiClient("quantex").post("admin/exchanges", payload);
  }

  update_exchange(payload: Quantex.Exchange) {
    return new ApiClient("quantex").put("admin/exchanges", payload);
  }
}

export default new QuantexController();
