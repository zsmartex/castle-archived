import ApiClient from "@zsmartex/z-apiclient";
import {
  GET_METRICS,
  GET_USERS,
  GET_USER_INFO,
  UPDATE_USER_INFO,
  UPDATE_USER_LABEL,
  CREATE_USER_LABEL,
  GET_MEMBER_INFO,
  UPDATE_MEMBER_INFO,
  UPDATE_USER_ROLE,
  DELETE_USER_LABEL,
  GET_OPERATORS,
  GET_CURRENCIES,
  GET_CURRENCY,
  UPDATE_CURRENCY,
  GET_MARKETS,
  GET_ORDERS,
  GET_TRADES,
  GET_MARKET,
  UPDATE_MARKET
} from "./action-types";
import { ActionTree } from "vuex";
import { StoreTypes } from "types";

const actions: ActionTree<StoreTypes.AdminState, any> = {
  async [GET_METRICS]({ commit }) {
    try {
      const { data } = await new ApiClient("auth").get("admin/metrics");
      commit("SET_METRICS", data);
    } catch (error) {
      return error;
    }
  },
  [GET_USERS](store, payload) {
    return new ApiClient("auth").get("admin/users", payload);
  },
  async [GET_USER_INFO]({ commit }, uid) {
    try {
      const { data } = await new ApiClient("auth").get("admin/users/" + uid);
      commit("SET_USER_INFO", data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [UPDATE_USER_INFO]({ commit }, payload) {
    try {
      await new ApiClient("auth").post("admin/users/update", payload);
      commit("UPDATE_USER_INFO", payload);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [CREATE_USER_LABEL]({ dispatch }, payload) {
    try {
      await new ApiClient("auth").post("admin/users/labels", payload);
      await dispatch(GET_USER_INFO, payload.uid);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [DELETE_USER_LABEL]({ dispatch }, payload) {
    try {
      await new ApiClient("auth").delete("admin/users/labels", payload);
      await dispatch(GET_USER_INFO, payload.uid);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [UPDATE_USER_LABEL]({ dispatch }, payload) {
    try {
      await new ApiClient("auth").post("admin/users/labels/update", payload);
      await dispatch(GET_USER_INFO, payload.uid);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [GET_MEMBER_INFO]({ commit }, uid) {
    try {
      const { data } = await new ApiClient("trade").get("admin/members/" + uid);
      commit("SET_MEMBER_INFO", data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [UPDATE_MEMBER_INFO]({ commit }, payload) {
    try {
      await new ApiClient("trade").put("admin/members/" + payload.uid, {
        group: payload.group
      });

      commit("UPDATE_MEMBER_INFO", payload);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [UPDATE_USER_ROLE]({ commit }, payload) {
    try {
      await new ApiClient("auth").put("admin/users/role/" + payload.uid, {
        role: payload.role
      });

      commit("UPDATE_USER_ROLE", payload);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  [GET_ORDERS](store, payload) {
    return new ApiClient("trade").get("admin/orders", payload);
  },
  [GET_TRADES](store, payload) {
    return new ApiClient("trade").get("admin/trades", payload);
  },
  [GET_OPERATORS](store, payload) {
    return new ApiClient("auth").get("admin/activities/admin", payload);
  },
  [GET_CURRENCIES](store, payload) {
    return new ApiClient("trade").get("admin/currencies", payload);
  },
  [GET_CURRENCY](store, code) {
    return new ApiClient("trade").get("admin/currencies/" + code);
  },
  [UPDATE_CURRENCY](store, payload) {
    return new ApiClient("trade").post("admin/currencies/update", payload);
  },
  [GET_MARKETS]({ commit, state }, payload) {
    return new ApiClient("trade").get("admin/markets", payload);
  },
  [GET_MARKET]({ commit }, market_id) {
    return new ApiClient("trade").get("admin/markets/" + market_id);
  },
  [UPDATE_MARKET]({ commit }, payload) {
    return new ApiClient("trade").post("admin/markets/update", payload);
  }
};

export default actions;
