import store from "@/store";
import { INIT } from "@/store/types";
import { isAuth } from "@zsmartex/z-helpers";
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

let first_route = true;

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  if (first_route) {
    first_route = false;

    await store.dispatch(INIT);
  }
  const is_auth = isAuth();

  if (to.path === "/") {
    next(is_auth ? "/dashboard/analysis" : "/login");
  } else if (to.matched.some(record => record.meta.user) && !is_auth) {
    next("/login");
  } else if (to.matched.some(record => record.meta.guest) && is_auth) {
    next("/dashboard/analysis");
  } else {
    next();
  }
});

export default router;
