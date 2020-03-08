import { MutationTree } from "vuex";
import { StoreTypes } from "types";

const mutations: MutationTree<StoreTypes.AdminState> = {
  SET_METRICS(state, payload) {
    state.metrics = payload;
  }
};

export default mutations;
