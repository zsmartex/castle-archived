<template>
  <z-modal ref="modal" wrap-class-name="modal-otp" @cancel="onCancel">
    <div>
      <img src="@/assets/img/example_modal_logo.jpg" class="ant-modal-logo" />
      <div class="ant-modal-title">
        OTP Verification
      </div>
      <div class="ant-modal-desc">
        Enter the authentication code from the app below.
      </div>
      <form class="ant-modal-form" @submit.prevent="sendData">
        <auth-input
          v-model="otp_code"
          maxlength="6"
          type="number"
          ref="otp_code"
          placeholder="2FA Code"
        />
        <a-button type="primary" htmlType="submit">Submit</a-button>
      </form>
    </div>
  </z-modal>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import InputAuth from "@/components/auth-input.vue";
import ZModal from "@/layouts/z-modal.vue";

@Component({
  components: {
    "auth-input": InputAuth
  }
})
export default class App extends Vue {
  private otp_code: string;
  $refs!: {
    otp_code: InputAuth;
    modal: ZModal;
  };
  constructor() {
    super();
    this.otp_code = "";
  }

  public create() {
    this.$refs.modal.create();
  }

  public delete() {
    this.$refs.modal.delete();
  }

  public sendData() {
    this.$emit("submit", this.otp_code);
  }

  onCancel() {
    this.resetInput();
    this.delete();
    this.$emit("cancel");
  }

  resetInput() {
    this.otp_code = "";
    this.$refs.otp_code.clear();
  }

  @Watch("otp_code")
  onOtpCodeChanged(otp_code: string) {
    if (otp_code.length === 6) {
      this.sendData();
    }
  }
}
</script>
