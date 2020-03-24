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
  DELETE_USER_LABEL
} from "./action-types";
import { ActionTree } from "vuex";
import { StoreTypes } from "types";
import { GET_USER_ORDER } from './action-types';

const actions: ActionTree<StoreTypes.AdminState, any> = {
  async [GET_METRICS]({ commit }) {
    try {
      const { data } = await new ApiClient("auth").get("admin/metrics");
      commit("SET_METRICS", data);
    } catch (error) {
      return error;
    }
  },
  async [GET_USERS]({ commit }) {
    try {
      const { data, headers } = await new ApiClient("auth").get("admin/users");
      commit("SET_USERS", { data, headers });
    } catch (error) {
      return Promise.reject(error);
    }
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
  async [GET_USER_ORDER]({ commit }, payload) {
    try {
      const { headers, data } = await new ApiClient("trade").get("admin/orders", payload);

      commit("SET_USER_ORDER", { headers, data });
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default actions;
