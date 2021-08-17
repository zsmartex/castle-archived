import Vue from "vue";
import VueCompositionAPI, { reactive } from "@vue/composition-api";

Vue.use(VueCompositionAPI);

export type IStoreData<T> = {
  loading: boolean;
  data: T[];
}

export interface Store {
  drivers: IStoreData<string>;
  exchanges: IStoreData<Quantex.Exchange>;
  markets: IStoreData<Quantex.Market>;
  strategies: IStoreData<Quantex.Strategy>;
}

const store: Store = reactive<Store>({
  drivers: {
    loading: false,
    data: []
  },
  exchanges: {
    loading: false,
    data: []
  },
  markets: {
    loading: false,
    data: []
  },
  strategies: {
    loading: false,
    data: []
  },
});

export default store;
