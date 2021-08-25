const routes = [
  {
    name: "Dashboard",
    path: "/",
    meta: { user: true },
    component: () => import("@/views/dashboard/base.vue"),
    children: [
      {
        name: "Dashboard",
        path: "dashboard",
        component: () => import("@/layouts/page-view.vue"),
        children: [
          {
            name: "Analysis",
            path: "analysis",
            component: () => import("@/views/dashboard/analysis/base.vue")
          }
        ]
      },
      {
        name: "Users",
        path: "users",
        component: () => import("@/views/users/base.vue"),
        children: [
          {
            name: "User Directorys",
            path: "user-directory",
            component: () => import("@/views/users/user-directory/base.vue")
          },
          {
            name: "User Directory",
            path: "user-directory/:uid",
            component: () =>
              import("@/views/users/user-directory/profile/base.vue")
          },
          {
            name: "Operators",
            path: "operators",
            component: () => import("@/views/users/operators/base.vue")
          },
          {
            name: "Pending Applications",
            path: "pending",
            component: () => import("@/views/users/pending/base.vue")
          },
          {
            name: "Pending Applications",
            path: "pending/:name",
            component: () => import("@/views/users/pending/base.vue")
          }
        ]
      },
      {
        name: "Exchange",
        path: "exchange",
        component: () => import("@/views/exchange/base.vue"),
        children: [
          {
            name: "Currencies",
            path: "currencies",
            component: () => import("@/views/exchange/currencies/base.vue")
          },
          {
            name: "Add Currency",
            path: "currencies/add",
            meta: { type: "new", parent: "Currencies" },
            component: () => import("@/views/exchange/currencies/new-edit.vue")
          },
          {
            name: "Edit Currency",
            path: "currencies/:code",
            meta: { type: "edit", parent: "Currencies" },
            component: () => import("@/views/exchange/currencies/new-edit.vue")
          },
          {
            name: "New Currency Network",
            path: "currencies/:code/networks/new",
            meta: { type: "new", parent: "Edit Currency" },
            component: () =>
              import("@/views/exchange/currencies/blockchain-currency.vue")
          },
          {
            name: "Edit Currency Network",
            path: "currencies/:code/networks/:id",
            meta: { type: "edit", parent: "Edit Currency" },
            component: () =>
              import("@/views/exchange/currencies/blockchain-currency.vue")
          },
          {
            name: "Markets",
            path: "markets",
            component: () => import("@/views/exchange/markets/base.vue")
          },
          {
            name: "Add Market",
            path: "markets/add",
            meta: { type: "new", parent: "Markets" },
            component: () => import("@/views/exchange/markets/add.vue")
          },
          {
            name: "Edit Market",
            path: "markets/:market/info",
            meta: { type: "info", parent: "Markets" },
            component: () => import("@/views/exchange/markets/info/base.vue")
          },
          {
            name: "Orders",
            path: "orders",
            component: () => import("@/views/exchange/orders/base.vue")
          },
          {
            name: "Trades",
            path: "trades",
            component: () => import("@/views/exchange/trades/base.vue")
          }
        ]
      },
      {
        name: "Accountings",
        path: "accountings",
        component: () => import("@/views/accountings/base.vue"),
        children: [
          {
            name: "Deposits",
            path: "deposits",
            component: () => import("@/views/accountings/deposits/base.vue"),
          },
          {
            name: "Details",
            path: "deposits/:tid/details",
            meta: { parent: "Deposits" },
            component: () => import("@/views/accountings/deposits/details.vue"),
          },
          {
            name: "Withdrawals",
            path: "withdrawals",
            meta: { page_type: "normal" },
            component: () => import("@/views/accountings/withdrawals/base.vue"),
          },
          {
            name: "Details",
            path: "withdrawals/:id/details",
            meta: { page_type: "Withdrawals" },
            component: () => import("@/views/accountings/withdrawals/details.vue"),
          },
          {
            name: "Withdrawals Pending",
            path: "withdrawals-pending",
            meta: { page_type: "pending" },
            component: () => import("@/views/accountings/withdrawals/base.vue"),
          },
          {
            name: "Details",
            path: "withdrawals-pending/:id/details",
            component: () => import("@/views/accountings/withdrawals/details.vue"),
          },
          {
            name: "Adjustments",
            path: "adjustments",
            component: () => import("@/views/accountings/adjustments/base.vue"),
          },
          {
            name: "Add Adjustment",
            path: "adjustments/add",
            meta: { page_type: "add", name: "Adjustments" },
            component: () => import("@/views/accountings/adjustments/add-update.vue"),
          },
          {
            name: "Adjustment",
            path: "adjustments/:id",
            meta: { page_type: "update", name: "Adjustments" },
            component: () => import("@/views/accountings/adjustments/add-update.vue"),
          },
          {
            name: "Operations",
            path: "operations",
            component: () => import("@/views/accountings/operations/base.vue")
          },
          {
            name: "Operation",
            path: "operations/:name",
            meta: { name: "Operations" },
            component: () => import("@/views/accountings/operations/base.vue")
          }
        ]
      },
      {
        name: "Settings",
        path: "settings",
        component: () => import("@/views/settings/base.vue"),
        children: [
          {
            name: "Blockchains",
            path: "blockchains",
            component: () => import("@/views/settings/blockchains/base.vue"),
          },
          {
            name: "Create Blockchain",
            path: "blockchains/add",
            meta: { type: "create", parent: "Blockchains" },
            component: () =>
              import("@/views/settings/blockchains/edit-create.vue")
          },
          {
            name: "Update Blockchain",
            path: "blockchains/:id/edit",
            meta: { type: "edit", parent: "Blockchains" },
            component: () =>
              import("@/views/settings/blockchains/edit-create.vue")
          },
          {
            name: "Wallets",
            path: "wallets",
            component: () => import("@/views/settings/wallets/base.vue"),
          },
          {
            name: "Update Wallet",
            path: "wallets/:id/edit",
            meta: { type: "edit", parent: "Wallets" },
            component: () => import("@/views/settings/wallets/edit-create.vue"),
          },
          {
            name: "Create Wallet",
            path: "wallets/add",
            meta: { type: "create", parent: "Wallets" },
            component: () => import("@/views/settings/wallets/edit-create.vue"),
          },
          {
            name: "Fees Schedules",
            path: "fees-schedules",
            component: () => import("@/views/settings/fees-schedules/base.vue"),
          },
          {
            name: "Permissions",
            path: "permissions",
            component: () => import("@/views/settings/permissions/base.vue"),
          },
          {
            name: "Restrictions",
            path: "restrictions",
            component: () => import("@/views/settings/restrictions/base.vue"),
          },
          {
            name: "Whitelisted Smart Contract",
            path: "whitelisted-smart-contract",
            component: () =>
              import("@/views/settings/whitelisted-smart-contract/base.vue")
          },
          {
            name: "Banners",
            path: "banners",
            component: () => import("@/views/settings/banners/base.vue"),
          },
          {
            name: "Broadcasts",
            path: "broadcasts",
            component: () => import("@/views/settings/broadcasts/base.vue")
          }
        ]
      },
      {
        name: "Bot",
        path: "bot",
        component: () => import("@/views/settings/base.vue"),
        children: [
          {
            name: "Exchanges",
            path: "exchanges",
            component: () => import("@/views/bot/exchanges/base.vue"),
          },
          {
            name: "Markets",
            path: "markets",
            component: () => import("@/views/bot/markets/base.vue"),
          },
          {
            name: "Strategies",
            path: "strategies",
            component: () => import("@/views/bot/strategies/base.vue"),
          },
          {
            name: "Create Strategy",
            path: "strategies/new",
            meta: { type: "create", parent: "Strategies" },
            component: () => import("@/views/bot/strategies/add-edit.vue"),
          },
          {
            name: "Update Strategy",
            path: "strategies/:id",
            meta: { type: "edit", parent: "Strategies" },
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
