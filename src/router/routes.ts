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
            path: "currencies/add",
            meta: { type: "new" },
            component: () => import("@/views/exchange/currencies/new-edit.vue")
          },
          {
            path: "currencies/:code/edit",
            meta: { type: "edit" },
            component: () => import("@/views/exchange/currencies/new-edit.vue")
          },
          {
            path: "markets",
            component: () => import("@/views/exchange/markets/base.vue")
          },
          {
            path: "markets/add",
            meta: { type: "new" },
            component: () => import("@/views/exchange/markets/add.vue")
          },
          {
            path: "markets/:market/info",
            meta: { type: "info" },
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
          },
          {
            path: "withdrawals-pending",
            component: () => import("@/views/accountings/withdrawals-pending/base.vue"),
          },
          {
            path: "adjustments",
            component: () => import("@/views/accountings/adjustments/base.vue"),
          },
          {
            path: "operations",
            component: () => import("@/views/accountings/operations/base.vue"),
          }
        ]
      },
      {
        path: "settings",
        component: () => import("@/views/settings/base.vue"),
        children: [
          {
            path: "blockchains",
            component: () => import("@/views/settings/blockchains/base.vue"),
          },
          {
            path: "blockchains/:id/edit",
            component: () => import("@/views/settings/blockchains/edit.vue"),
          },
          {
            path: "wallets",
            component: () => import("@/views/settings/wallets/base.vue"),
          },
          {
            path: "fees-schedules",
            component: () => import("@/views/settings/fees-schedules/base.vue"),
          },
          {
            path: "permissions",
            component: () => import("@/views/settings/permissions/base.vue"),
          },
          {
            path: "restrictions",
            component: () => import("@/views/settings/restrictions/base.vue"),
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
