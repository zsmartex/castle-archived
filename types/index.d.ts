import { RootState as ZRootState } from "@zsmartex/z-store";

declare namespace StoreTypes {
  interface RootState extends ZRootState {
    admin: AdminState;
  }

  interface Metrics {
    signups: { [key: string]: number };
    sucessful_logins: { [key: string]: number };
    failed_logins: { [key: string]: number };
    pending_applications: number;
  }

  interface Label {
    key: string;
    value: string;
    scope: string;
    description: null;
    created_at: Date;
    updated_at: Date;
  }

  export interface MemberInfo {
    id: number;
    uid: string;
    email: string;
    level: number;
    role: string;
    group: string;
    state: string;
    accounts: Account[];
    created_at: Date;
    updated_at: Date;
  }

  export interface Account {
    currency: string;
    balance: string;
    locked: string;
  }

  interface UserInfo {
    email: string;
    uid: string;
    role: string;
    level: number;
    otp: boolean;
    state: string;
    labels: Label[];
    phones: any[];
    documents: any[];
    data_storages: any[];
    referral_uid: string | null;
    created_at: Date;
    updated_at: Date;
  }

  interface User {
    email: string;
    uid: string;
    role: string;
    level: number;
    otp: boolean;
    state: string;
    phone: any;
  }

  interface UserOrder {
    id:               number;
    side:             string;
    ord_type:         string;
    price:            string;
    avg_price:        string;
    state:            string;
    market:           string;
    origin_volume:    string;
    remaining_volume: string;
    executed_volume:  string;
    trades_count:     number;
    email:            string;
    uid:              string;
    created_at:       Date;
    updated_at:       Date;
  }

  interface AdminState {
    role: string[];
    metrics: Metrics;
    users: {
      data: User[];
      page: number;
      total: number;
    };
    member_info: MemberInfo | null;
    user_info: UserInfo | null;
    user_orders: {
      page: number;
      total: number;
      "per-page": number;
      data: UserOrder[]
    };
  }
}
