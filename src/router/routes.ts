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
        path: "users/user-directory",
        component: () => import("@/views/user-directory/base.vue"),
      },
      {
        path: "users/user-directory/:uid",
        component: () => import("@/views/user-directory/profile/base.vue")
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
