import "@/assets/css/themes/custom/index.less";
import AuthButton from "@/components/auth-button";
import ZConfiguration from "@/components/z-configuration";
import ZFilterDrawer from "@/components/z-filter-drawer";
import ZInfoRow from "@/components/z-info-row";
import ZTable from "@/components/z-table";
import ZContent from "@/layouts/z-content.vue";
import ZModal from "@/layouts/z-modal.vue";
import ZLoading from "@/components/z-loading";
import Vue from "vue";

Vue.component("z-content", ZContent);
Vue.component("z-modal", ZModal);
Vue.component("z-table", ZTable);
Vue.component("z-info-row", ZInfoRow);
Vue.component("z-filter-drawer", ZFilterDrawer);
Vue.component("z-configuration", ZConfiguration);
Vue.component("auth-button", AuthButton);
Vue.component("z-loading", ZLoading);
