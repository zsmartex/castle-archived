const Conponents = {
  "dashboard.analysis": () => import("@/views/dashboard/analysis.vue")
};

const routes: any = [
  {
    path: "/",
    component: () => import("@/views/home.vue"),
    children: []
  }
];

for (const name in Conponents) {
  const path = name.split(".");

  if (path.length === 2) {
    let index = routes[0].children.findIndex(row => row.path === path[0]);
    if (index < 0) {
      routes[0].children.push({
        path: path[0],
        component: () => import("@/layouts/page-view.vue"),
        meta: {
          user: true
        },
        children: []
      });
      index = 0;
    }

    routes[0].children[index].children.push({
      path: path[1],
      component: Conponents[name],
      children: []
    });
  } else if (path.length === 3) {
    const index_main_router = routes[0].children.findIndex(
      row => row.path === path[0]
    );
    if (index_main_router < 0) continue;
    const index_router = routes[0].children[
      index_main_router
    ].children.findIndex(row => row.path === path[1]);

    routes[0].children[index_main_router].children[index_router].children.push({
      path: path[1],
      component: Conponents[name],
      children: []
    });
  }
}

routes.push({
  path: "/login",
  component: () => import("@/views/login.vue"),
  meta: {
    guest: true
  }
});

export default routes;
