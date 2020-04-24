<template>
  <z-content class="page-login">
    <logo-box />
    <form-box
      :email="email"
      :password="password"
      :captcha_response="captcha_response"
      :loading="loading"
      @on-changed="onFormValueChanged"
      @on-login="login"
    />
    <modal-otp ref="ModalOTP" @submit="login" @cancel="need2fa = false" />
  </z-content>
</template>

<script lang="ts">
import store from "@/store";
import ModalOTP from "@/layouts/modal/modal-otp.vue";
import { FormBox, LogoBox } from "@/layouts/login";
import { Vue, Component, Watch } from "vue-property-decorator";

@Component({
  components: {
    "form-box": FormBox,
    "logo-box": LogoBox,
    "modal-otp": ModalOTP
  }
})
export default class App extends Vue {
  protected email: string;
  protected password: string;
  protected captcha_response: string;
  protected loading: boolean;
  $refs!: {
    ModalOTP: ModalOTP;
  };
  constructor() {
    super();

    this.email = "demo@zsmart.tech";
    this.password = "J" + "\\" + "=v<Sfn7>8%W6S6";
    this.captcha_response = "";
    this.loading = true;
  }

  get need2fa() {
    return store.state.user.need2fa;
  }

  set need2fa(value) {
    store.state.user.need2fa = value;
  }

  onFormValueChanged(type, value) {
    this[type] = value;
  }

  async login(otp_code = "") {
    const payload = {
      email: this.email,
      password: this.password,
      otp_code: otp_code,
      captcha_response: this.captcha_response
    };

    this.loading = true;
    await store.dispatch("user/LOGIN", {
      payload,
      url_callback: "/dashboard/analysis"
    });
    this.loading = false;
  }

  @Watch("need2fa")
  onNeed2FAChanged(need2fa: boolean) {
    if (!need2fa) return;
    this.$refs.ModalOTP.create();
  }
}
</script>

<style lang="less">
@import "~@styles/views/login.less";
</style>
