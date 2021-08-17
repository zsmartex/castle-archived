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
          },
          {
            path: "pending",
            component: () => import("@/views/users/pending/base.vue")
          },
          {
            path: "pending/:name",
            component: () => import("@/views/users/pending/base.vue")
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
            path: "currencies/:code",
            meta: { type: "edit" },
            component: () => import("@/views/exchange/currencies/new-edit.vue")
          },
          {
            path: "currencies/:code/networks/new",
            meta: { type: "new" },
            component: () =>
              import("@/views/exchange/currencies/blockchain-currency.vue")
          },
          {
            path: "currencies/:code/networks/:id",
            meta: { type: "edit" },
            component: () =>
              import("@/views/exchange/currencies/blockchain-currency.vue")
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
            path: "deposits/:tid/details",
            component: () => import("@/views/accountings/deposits/details.vue"),
          },
          {
            path: "withdrawals",
            meta: { page_type: "normal" },
            component: () => import("@/views/accountings/withdrawals/base.vue"),
          },
          {
            path: "withdrawals/:id/details",
            component: () => import("@/views/accountings/withdrawals/details.vue"),
          },
          {
            path: "withdrawals-pending",
            meta: { page_type: "pending" },
            component: () => import("@/views/accountings/withdrawals/base.vue"),
          },
          {
            path: "withdrawals-pending/:id/details",
            component: () => import("@/views/accountings/withdrawals/details.vue"),
          },
          {
            path: "adjustments",
            component: () => import("@/views/accountings/adjustments/base.vue"),
          },
          {
            path: "adjustments/add",
            meta: { page_type: "add"},
            component: () => import("@/views/accountings/adjustments/add-update.vue"),
          },
          {
            path: "adjustments/:id",
            meta: { page_type: "update"},
            component: () => import("@/views/accountings/adjustments/add-update.vue"),
          },
          {
            path: "operations",
            component: () => import("@/views/accountings/operations/base.vue")
          },
          {
            path: "operations/:name",
            component: () => import("@/views/accountings/operations/base.vue")
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
            path: "blockchains/add",
            meta: { type: "create" },
            component: () =>
              import("@/views/settings/blockchains/edit-create.vue")
          },
          {
            path: "blockchains/:id/edit",
            meta: { type: "edit" },
            component: () =>
              import("@/views/settings/blockchains/edit-create.vue")
          },
          {
            path: "wallets",
            component: () => import("@/views/settings/wallets/base.vue"),
          },
          {
            path: "wallets/:id/edit",
            meta: { type: "edit" },
            component: () => import("@/views/settings/wallets/edit-create.vue"),
          },
          {
            path: "wallets/add",
            meta: { type: "create" },
            component: () => import("@/views/settings/wallets/edit-create.vue"),
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
          },
          {
            path: "whitelisted-smart-contract",
            component: () =>
              import("@/views/settings/whitelisted-smart-contract/base.vue")
          },
          {
            path: "banners",
            component: () => import("@/views/settings/banners/base.vue"),
          },
          {
            path: "broadcasts",
            component: () => import("@/views/settings/broadcasts/base.vue")
          }
        ]
      },
      {
        path: "bot",
        component: () => import("@/views/settings/base.vue"),
        children: [
          {
            path: "exchanges",
            component: () => import("@/views/bot/exchanges/base.vue"),
          },
          {
            path: "markets",
            component: () => import("@/views/bot/markets/base.vue"),
          },
          {
            path: "strategies",
            component: () => import("@/views/bot/strategies/base.vue"),
          },
          {
            path: "strategies/new",
            meta: { type: "create" },
            component: () => import("@/views/bot/strategies/add-edit.vue"),
          },
          {
            path: "strategies/:id",
            meta: { type: "edit" },
            component: () => import("@/views/bot/strategies/add-edit.vue"),
          },
        ]
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
    meta: { guest: true }
  },
  {
    path: "/*",
    component: () => import("@/views/404.vue")
  }
];

export default routes;
