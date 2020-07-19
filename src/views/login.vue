<template>
  <z-content class="page-login">
    <logo-box />
    <form-box :loading="loading" ref="form-box" @submit="login" />
    <modal-otp ref="modal-otp" @submit="login" @cancel="need2fa = false" />
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
  loading = false;

  $refs!: {
    "form-box": FormBox;
    "modal-otp": ModalOTP;
  };

  get email() {
    return this.$refs["form-box"].email;
  }

  get password() {
    return this.$refs["form-box"].password;
  }

  get captcha_response() {
    return this.$refs["form-box"].captcha_response;
  }

  get need2fa() {
    return store.state.user.need2fa;
  }

  set need2fa(value) {
    store.state.user.need2fa = value;
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
    this.$refs["modal-otp"].create();
  }
}
</script>

<style lang="less">
@import "~@styles/views/login.less";
</style>
