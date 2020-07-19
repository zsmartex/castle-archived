import ApiClient from "@zsmartex/z-apiclient";
import * as helpers from "@zsmartex/z-helpers";
import { ActionTree } from "vuex";
import {
  CANCEL_ORDER, CANCEL_ORDERS,
  CREATE_BLOCKCHAIN,
  CREATE_CURRENCY,
  CREATE_MARKET,
  CREATE_PERMISSION,
  CREATE_TRADING_FEE,
  CREATE_USER_LABEL,
  DELETE_PERMISSION,
  DELETE_TRADING_FEE,
  DELETE_USER_LABEL,
  GET_ADJUSTMENT,
  GET_ADJUSTMENTS,
  GET_ASSETS,
  GET_BLOCKCHAIN,
  GET_BLOCKCHAINS,
  GET_BLOCKCHAIN_CLIENTS,
  GET_CURRENCIES,
  GET_CURRENCY,
  GET_DEPOSITS,
  GET_EXPENSES,
  GET_LIABILITIES,
  GET_MARKET,
  GET_MARKETS,
  GET_MEMBER,
  GET_METRICS,
  GET_OPERATORS,
  GET_ORDERS,
  GET_PERMISSIONS,
  GET_RESTRICTIONS,
  GET_REVENUES,
  GET_TRADES,
  GET_TRADING_FEES,
  GET_USERS,
  GET_USER_INFO,
  GET_WALLET,
  GET_WALLETS,
  GET_WALLET_GATEWAYS,
  GET_WALLET_KINDS,
  GET_WITHDRAW,
  GET_WITHDRAWS,
  INIT,
  SEND_WITHDRAW_ACTION,
  UPDATE_BLOCKCHAIN,
  UPDATE_CURRENCY,
  UPDATE_MARKET,
  UPDATE_MEMBER_INFO,
  UPDATE_PERMISSION,
  UPDATE_TRADING_FEE,
  UPDATE_USER_INFO,
  UPDATE_USER_LABEL,
  UPDATE_USER_ROLE
} from "./action-types";

const actions: ActionTree<AdminState, any> = {
  async [INIT]({ dispatch }) {
    (global as any).helpers = helpers;

    return Promise.all([dispatch("user/getLogged")]);
  },
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
  [GET_MEMBER]({ commit }, uid) {
    return new ApiClient("trade").get("admin/members/" + uid);
  },
  async [UPDATE_MEMBER_INFO]({ commit }, payload) {
    try {
      await new ApiClient("trade").put("admin/members/" + payload.uid, {
        group: payload.group,
      });

      commit("UPDATE_MEMBER_INFO", payload);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [UPDATE_USER_ROLE]({ commit }, payload) {
    try {
      await new ApiClient("auth").put("admin/users/role/" + payload.uid, {
        role: payload.role,
      });

      commit("UPDATE_USER_ROLE", payload);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  [GET_ORDERS](store, payload) {
    return new ApiClient("trade").get("admin/orders", payload);
  },
  [CANCEL_ORDERS](store, payload: { market: string; side: ZTypes.Side }) {
    return new ApiClient("trade").post("admin/orders/cancel", payload);
  },
  [CANCEL_ORDER](store, id) {
    return new ApiClient("trade").post(`admin/orders/${id}/cancel`);
  },
  [GET_TRADES](store, payload) {
    return new ApiClient("trade").get("admin/trades", payload);
  },
  [GET_OPERATORS](store, payload) {
    return new ApiClient("auth").get("admin/activities/admin", payload);
  },
  //TODO: Make it work with mutations and state
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
  //TODO: Make it work with mutations and state
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
  //TODO: Make it work with mutations and state
  [GET_BLOCKCHAINS]({ commit }, payload) {
    return new ApiClient("trade").get("admin/blockchains", payload);
  },
  [GET_BLOCKCHAIN](store, id) {
    return new ApiClient("trade").get(`admin/blockchains/${id}`);
  },
  [CREATE_BLOCKCHAIN](store, payload) {
    return new ApiClient("trade").post("admin/blockchains/new", payload);
  },
  [UPDATE_BLOCKCHAIN](store, payload) {
    return new ApiClient("trade").post("admin/blockchains/update", payload);
  },
  async [GET_BLOCKCHAIN_CLIENTS]({ commit }) {
    try {
      const { data } = await new ApiClient("trade").get(
        "admin/blockchains/clients"
      );

      commit("SET_BLOCKCHAIN_CLIENTS", data);
    } catch (error) {
      return error;
    }
  },
  [GET_WALLETS](store, payload) {
    return new ApiClient("trade").get("admin/wallets", payload);
  },
  [GET_WALLET](store, id) {
    return new ApiClient("trade").get(`admin/wallets/${id}`);
  },
  async [GET_WALLET_KINDS]({ commit }) {
    try {
      const { data } = await new ApiClient("trade").get("admin/wallets/kinds");

      commit("SET_WALLET_KINDS", data);
    } catch (error) {
      return error;
    }
  },
  async [GET_WALLET_GATEWAYS]({ commit }) {
    try {
      const { data } = await new ApiClient("trade").get(
        "admin/wallets/gateways"
      );

      commit("SET_WALLET_GATEWAYS", data);
    } catch (error) {
      return error;
    }
  },
  [GET_TRADING_FEES](store, payload) {
    return new ApiClient("trade").get("admin/trading_fees", payload);
  },
  [CREATE_TRADING_FEE](store, payload) {
    return new ApiClient("trade").post("admin/trading_fees/new", payload);
  },
  [UPDATE_TRADING_FEE](store, payload) {
    return new ApiClient("trade").post("admin/trading_fees/update", payload);
  },
  [DELETE_TRADING_FEE](store, id) {
    return new ApiClient("trade").post("admin/trading_fees/delete", { id });
  },
  [GET_PERMISSIONS](store, payload) {
    return new ApiClient("auth").get("admin/permissions", payload);
  },
  [CREATE_PERMISSION](store, payload) {
    return new ApiClient("auth").post("admin/permissions", payload);
  },
  [UPDATE_PERMISSION](store, payload) {
    return new ApiClient("auth").put("admin/permissions", payload);
  },
  [DELETE_PERMISSION](store, id) {
    return new ApiClient("auth").delete("admin/permissions", { id });
  },
  [GET_ASSETS](store, payload) {
    return new ApiClient("trade").get("admin/assets", payload);
  },
  [GET_LIABILITIES](store, payload) {
    return new ApiClient("trade").get("admin/liabilities", payload);
  },
  [GET_REVENUES](store, payload) {
    return new ApiClient("trade").get("admin/revenues", payload);
  },
  [GET_EXPENSES](store, payload) {
    return new ApiClient("trade").get("admin/expenses", payload);
  },
  [GET_RESTRICTIONS](store, payload) {
    return new ApiClient("auth").get("admin/restrictions", payload);
  },
  [GET_DEPOSITS](store, payload) {
    return new ApiClient("trade").get("admin/deposits", payload);
  },
  [GET_WITHDRAWS](store, payload) {
    return new ApiClient("trade").get("admin/withdraws", payload);
  },
  [GET_WITHDRAW](store, id: number) {
    return new ApiClient("trade").get(`admin/withdraws/${id}`);
  },
  [SEND_WITHDRAW_ACTION](store, payload) {
    return new ApiClient("trade").get("admin/withdraws/actions", payload);
  },
  [GET_ADJUSTMENTS](store, payload) {
    return new ApiClient("trade").get("admin/adjustments", payload);
  },
  [GET_ADJUSTMENT](store, id) {
    return new ApiClient("trade").get(`admin/adjustments/${id}`);
  }
};

export default actions;
