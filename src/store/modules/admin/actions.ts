import ApiClient from "@zsmartex/z-apiclient";
import { StoreTypes } from "types";
import { ActionTree } from "vuex";
import { CREATE_CURRENCY, CREATE_MARKET, CREATE_USER_LABEL, DELETE_USER_LABEL, GET_BLOCKCHAIN, GET_BLOCKCHAINS, GET_BLOCKCHAIN_CLIENTS, GET_CURRENCIES, GET_CURRENCY, GET_MARKET, GET_MARKETS, GET_MEMBER_INFO, GET_METRICS, GET_OPERATORS, GET_ORDERS, GET_TRADES, GET_TRADING_FEES, GET_USERS, GET_USER_INFO, GET_WALLETS, UPDATE_CURRENCY, UPDATE_MARKET, UPDATE_MEMBER_INFO, UPDATE_USER_INFO, UPDATE_USER_LABEL, UPDATE_USER_ROLE } from "./action-types";

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
  [CREATE_CURRENCY](store, payload) {
    return new ApiClient("trade").post("admin/currencies/new", payload);
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
  [CREATE_MARKET](store, payload) {
    return new ApiClient("trade").post("admin/markets/new", payload);
  },
  [UPDATE_MARKET]({ commit }, payload) {
    return new ApiClient("trade").post("admin/markets/update", payload);
  },
  [GET_BLOCKCHAINS]({ commit }, payload) {
    return new ApiClient("trade").get("admin/blockchains", payload);
  },
  [GET_BLOCKCHAIN](store, id) {
    return new ApiClient("trade").get(`admin/blockchains/${id}`)
  },
  async [GET_BLOCKCHAIN_CLIENTS]({ commit }) {
    try {
      const { data } = await new ApiClient("trade").get("admin/blockchains/clients");

      commit("SET_BLOCKCHAIN_CLIENTS", data);
    } catch (error) {
      return error;
    }
  },
  [GET_WALLETS](store, payload) {
    return new ApiClient("trade").get("admin/wallets", payload);
  },
  [GET_TRADING_FEES](store, payload) {
    return new ApiClient("trade").get("admin/trading_fees", payload);
  }
};

export default actions;
