const routes = [
  {
    path: "/",
    meta: { user: true },
    component: () => import("@/views/dashboard/base.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("@/layouts/page-view.vue"),
        children: [
          {
            path: "analysis",
            component: () => import("@/views/dashboard/analysis/base.vue")
          }
        ]
      },
      {
        path: "users",
        component: () => import("@/views/users/base.vue"),
        children: [
          {
            path: "user-directory",
            component: () => import("@/views/users/user-directory/base.vue")
          },
          {
            path: "user-directory/:uid",
            component: () =>
              import("@/views/users/user-directory/profile/base.vue")
          },
          {
            path: "operators",
            component: () => import("@/views/users/operators/base.vue")
          }
        ]
      },
      {
        path: "exchange",
        component: () => import("@/views/exchange/base.vue"),
        children: [
          {
            path: "currencies",
            component: () => import("@/views/exchange/currencies/base.vue")
          },
          {
            path: "currencies/:code/edit",
            component: () => import("@/views/exchange/currencies/edit.vue")
          },
          {
            path: "markets",
            component: () => import("@/views/exchange/markets/base.vue")
          },
          {
            path: "markets/:market/info",
            component: () => import("@/views/exchange/markets/info/base.vue")
          },
          {
            path: "orders",
            component: () => import("@/views/exchange/orders/base.vue")
          },
          {
            path: "trades",
            component: () => import("@/views/exchange/trades/base.vue")
          }
        ]
      },
      {
        path: "accountings",
        component: () => import("@/views/accountings/base.vue"),
        children: [
          {
            path: "deposits",
            component: () => import("@/views/accountings/deposits/base.vue"),
          },
          {
            path: "withdrawals",
            component: () => import("@/views/accountings/withdrawals/base.vue"),
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
    meta: { guest: true }
  }
];

export default routes;
