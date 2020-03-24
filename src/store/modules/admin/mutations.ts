import { MutationTree } from "vuex";
import { StoreTypes } from "types";

const mutations: MutationTree<StoreTypes.AdminState> = {
  SET_METRICS(state, payload) {
    state.metrics = payload;
  },
  SET_USERS(state, { data, headers }) {
    state.users.data = data;
    state.users.page = headers.page;
    state.users.total = headers.total;
  },
  SET_USER_INFO(state, payload) {
    state.user_info = payload;
  },
  UPDATE_USER_INFO(state, payload) {
    const { user_info } = state;
    if (!user_info) return;

    if (Object.hasOwnProperty.call(payload, "otp")) {
      user_info.otp = payload.otp;
    } else if (Object.hasOwnProperty.call(payload, "state")) {
      user_info.state = payload.state;
    }
  },
  SET_MEMBER_INFO(state, payload) {
    state.member_info = payload;
  },
  UPDATE_MEMBER_INFO(state, payload) {
    const { member_info } = state;
    if (!member_info) return;

    if (Object.hasOwnProperty.call(payload, "group")) {
      member_info.group = payload.group;
    }
  },
  UPDATE_USER_ROLE(state, payload) {
    const { user_info } = state;
    if (!user_info) return;

    if (Object.hasOwnProperty.call(payload, "role")) {
      user_info.role = payload.role;
    }
  },
  SET_USER_ORDER(state, { headers, data }) {
    state.user_orders.data = data;
    state.user_orders.total = headers.total;
    state.user_orders.page = headers.page;
    state.user_orders["per-page"] = headers["per-page"];
  }
};

export default mutations;
