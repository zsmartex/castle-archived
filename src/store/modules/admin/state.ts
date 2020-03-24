import { StoreTypes } from "types";

const state: StoreTypes.AdminState = {
  role: [
    "superadmin",
    "admin",
    "accountant",
    "compliance",
    "technical",
    "support",
    "trader",
    "member",
    "broker",
    "manager",
    "partner"
  ],
  metrics: {
    signups: {},
    sucessful_logins: {},
    failed_logins: {},
    pending_applications: 0
  },
  users: {
    data: [],
    page: 0,
    total: 0
  },
  member_info: null,
  user_info: null,
  user_orders: {
    data: [],
    page: 0,
    "per-page": 0,
    total: 0
  }
};

export default state;
