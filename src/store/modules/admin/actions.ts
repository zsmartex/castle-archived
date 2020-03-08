import ApiClient from "@zsmartex/z-apiclient";
import { ActionTree } from "vuex";
import { StoreTypes } from "types";

const actions: ActionTree<StoreTypes.AdminState, any> = {
  async get_metrics({ commit }) {
    try {
      const { data } = await new ApiClient("auth").get("admin/metrics");
      commit("SET_METRICS", data);
    } catch (error) {
      return error;
    }
  }
};

export default actions;
