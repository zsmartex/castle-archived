<template>
  <a-layout-sider
    collapsible
    :collapsed="collapsed"
    :trigger="null"
    :width="250"
    style="z-index: 1;"
  >
    <div class="ant-layout-sider-logo">
      <router-link to="/dashboard/analysis">
        <img src="@/assets/img/logo.png" />
        <h1>ZSmart Admin</h1>
      </router-link>
    </div>
    <a-menu
      :defaultOpenKeys="[`${isMenuSelected}`]"
      :selectedKeys="[`${isSubMenuSelected}`]"
      mode="inline"
      theme="dark"
    >
      <template v-for="(menu, mindex) in MENUS">
        <a-sub-menu v-if="menu.children" :key="`menu-${mindex}`">
          <span slot="title">
            <a-icon :type="menu.icon" />
            <span>{{ menu.name }}</span>
          </span>
          <a-menu-item
            v-for="(sub, subindex) in menu.children"
            :key="`sub-${menu.key}-${subindex}`"
          >
            <router-link
              :to="sub.attrs.to"
              :exact-active-class="sub.attrs['exact-active-class']"
              :active-class="sub.attrs['active-class']"
            >
              <a-icon :type="sub.icon" />
              <span>{{ sub.name }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="`menu-${mindex}`">
          <router-link
            :to="menu.attrs.to"
            :exact-active-class="menu.attrs['exact-active-class']"
            :active-class="menu.attrs['active-class']"
          >
            <a-icon :type="menu.icon" />
            <span>{{ menu.name }}</span>
          </router-link>
        </a-menu-item>
      </template>
    </a-menu>
    <div class="ant-layout-sider-footer"><a-icon type="logout" /> LOGOUT</div>
  </a-layout-sider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

interface MenuAttrs {
  to: string;
  "exact-active-class"?: string;
  "active-class"?: string;
}

interface SubMenu {
  name: string;
  icon: string;
  attrs?: MenuAttrs;
}

interface Menu {
  key: string;
  name: string;
  icon: string;
  attrs?: MenuAttrs;
  children?: SubMenu[];
}

@Component
export default class App extends Vue {
  @Prop() private readonly collapsed!: boolean;
  private readonly MENUS: Menu[] = [
    {
      key: "dashboard",
      name: "Dashboard",
      icon: "dashboard",
      children: [
        {
          name: "Analysis",
          icon: "fund",
          attrs: {
            to: "/dashboard/analysis",
            "exact-active-class": "",
            "active-class": ""
          }
        }
      ]
    },
    {
      key: "user",
      name: "Users",
      icon: "user",
      children: [
        {
          name: "Users directory",
          icon: "team",
          attrs: {
            to: "/users/user-directory",
            "exact-active-class": "",
            "active-class": ""
          }
        },
        {
          name: "Operators",
          icon: "user",
          attrs: {
            to: "/users/operators",
            "exact-active-class": "",
            "active-class": ""
          }
        }
      ]
    },
    {
      key: "exchange",
      name: "Exchange",
      icon: "line-chart",
      children: [
        {
          name: "Currencies",
          icon: "dollar",
          attrs: {
            to: "/exchange/currencies",
            "exact-active-class": "",
            "active-class": ""
          }
        },
        {
          name: "Markets",
          icon: "bar-chart",
          attrs: {
            to: "/exchange/markets",
            "exact-active-class": "",
            "active-class": ""
          }
        },
        {
          name: "Orders",
          icon: "database",
          attrs: {
            to: "/exchange/orders",
            "exact-active-class": "",
            "active-class": ""
          }
        },
        {
          name: "Trades",
          icon: "carry-out",
          attrs: {
            to: "/exchange/trades",
            "exact-active-class": "",
            "active-class": ""
          }
        }
      ]
    },
    {
      key: "accountings",
      name: "Accountings",
      icon: "calculator",
      children: [
        {
          name: "Deposits",
          icon: "cloud-download",
          attrs: {
            to: "/accountings/deposits",
            "exact-active-class": "",
            "active-class": ""
          }
        },
        {
          name: "Withdrawals",
          icon: "cloud-upload",
          attrs: {
            to: "/accountings/withdrawals",
            "exact-active-class": "",
            "active-class": ""
          }
        }
      ]
    }
  ];

  get isMenuSelected() {
    const { MENUS } = this;
    const { path } = this.$route;

    return `menu-${MENUS.findIndex(menu => {
      if (menu.children) {
        return menu.children?.find(sub => {
          if (sub.attrs) return path.includes(sub.attrs.to);
        });
      } else {
        if (menu.attrs) return path.includes(menu.attrs.to);
      }
    })}`;
  }

  get isSubMenuSelected() {
    const { MENUS, isMenuSelected } = this;
    const { path } = this.$route;
    const indexMenu = Number(isMenuSelected.split("menu-")[1]);

    if (!MENUS[indexMenu].children) return isMenuSelected;

    return `sub-${MENUS[indexMenu].key}-${MENUS[indexMenu].children?.findIndex(
      sub => {
        if (sub.attrs) return path.includes(sub.attrs.to);
      }
    )}`;
  }
}
</script>
