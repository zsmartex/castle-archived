import { StoreTypes } from "types";

const state: StoreTypes.AdminState = {
  metrics: {
    signups: {},
    sucessful_logins: {},
    failed_logins: {},
    pending_applications: 0
  }
};

export default state;
