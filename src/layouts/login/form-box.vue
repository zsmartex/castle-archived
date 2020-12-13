<template>
  <form class="page-login-form-box" @submit.prevent="login">
    <auth-input v-model="email" placeholder="Email" :is-error="email_error">
      <template v-slot:prefix>
        <a-icon type="user" />
      </template>
    </auth-input>
    <auth-input
      v-model="password"
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
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "auth-input": () => import("@/components/auth-input.vue")
  }
})
export default class App extends Vue {
  @Prop() readonly loading!: boolean;

  email = "";
  password = "";
  captcha_response = "";

  get email_error() {
    const { email } = this;

    return !this.email;
  }

  get password_error() {
    const { password } = this;

    return !this.password;
  }

  login() {
    this.$emit("submit");
  }
}
</script>
