import { StoreTypes } from "types";
import { MutationTree } from "vuex";

const mutations: MutationTree<StoreTypes.AdminState> = {
  SET_METRICS(state, payload) {
    state.metrics = payload;
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
  SET_BLOCKCHAIN_CLIENTS(state, payload) {
    state.clients = payload;
  }
};

export default mutations;
