<template>
  <form class="page-login-form-box" @submit.prevent="login">
    <auth-input
      v-model="email_input"
      placeholder="Email"
      :is-error="email_error"
    >
      <template v-slot:prefix>
        <a-icon type="user" />
      </template>
    </auth-input>
    <auth-input
      v-model="password_input"
      type="password"
      placeholder="Password"
      :is-error="password_error"
    >
      <template v-slot:prefix>
        <a-icon type="lock" />
      </template>
    </auth-input>

    <a-button type="primary" htmlType="submit">Login</a-button>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import * as helpers from "@zsmartex/z-helpers";

@Component({
  components: {
    "auth-input": () => import("@/components/auth-input.vue")
  }
})
export default class App extends Vue {
  @Prop() readonly email!: string;
  @Prop() readonly password!: string;
  @Prop() readonly captcha_response!: string;
  @Prop() readonly loading!: boolean;
  email_input: string;
  password_input: string;

  constructor() {
    super();

    this.email_input = this.email;
    this.password_input = this.password;
  }

  get email_error() {
    const { email } = this;
    const valid_email = helpers.validEmail(email);

    return !email ? false : !valid_email;
  }

  get password_error() {
    const { password } = this;
    const valid_password = helpers.validPassword(password);

    return !password ? false : !valid_password;
  }

  login() {
    this.$emit("on-login");
  }

  @Watch("email_input")
  onEmailChanged(email: string) {
    this.$emit("on-changed", "email", email);
  }

  @Watch("password_input")
  onPasswordChanged(password: string) {
    this.$emit("on-changed", "password", password);
  }
}
</script>
