import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import store from "@zsmartex/z-store";
import { StoreTypes } from "types";

(store as any).modules = Object.assign((store as any).modules, modules);

Vue.use(Vuex);

export default new Vuex.Store<StoreTypes.RootState>(store);
