import Vue from "vue";
import VueRouter from "vue-router";
import * as helpers from "@zsmartex/z-helpers";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const waitCheckedLogged = callback => {
  if (helpers.authStatus() !== "loading") {
    callback();
  } else {
    setTimeout(() => {
      waitCheckedLogged(callback);
    }, 10);
  }
};

router.beforeEach((to, from, next) => {
  waitCheckedLogged(() => {
    const isAuth = helpers.isAuth();
    const authStatus = helpers.authStatus();

    if (to.path === "/") {
      next(isAuth ? "/dashboard/analysis" : "/login");
    } else if (to.matched.some(record => record.meta.user) && !isAuth) {
      next("/login");
    } else if (to.matched.some(record => record.meta.guest) && isAuth) {
      next("/dashboard/analysis");
    } else {
      next();
    }
  });
});

export default router;
