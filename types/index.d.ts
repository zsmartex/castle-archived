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
    id: number;
    side: string;
    ord_type: string;
    price: string;
    avg_price: string;
    state: string;
    market: string;
    origin_volume: string;
    remaining_volume: string;
    executed_volume: string;
    trades_count: number;
    email: string;
    uid: string;
    created_at: Date;
    updated_at: Date;
  }

  interface UserTrade {
    id: number;
    price: string;
    amount: string;
    total: string;
    market: string;
    created_at: Date;
    taker_type: "buy" | "sell";
    maker_order_email: string;
    maker_uid: string;
    maker_fee_amount: string;
    maker_fee_currency: string;
    taker_order_email: string;
    taker_uid: string;
    taker_fee_currency: string;
    taker_fee_amount: string;
  }

  interface UserDeposit {
    id: number;
    currency: string;
    amount: string;
    fee: string;
    txid: null | string;
    state: string;
    created_at: Date;
    completed_at: Date;
    tid: string;
    member: number;
    uid: string;
    email: string;
    type: string;
    updated_at: Date;
    confirmations?: number;
    address?: string;
    txout?: number;
    block_number?: number;
    spread?: {
      to_address: string;
      amount: string;
      currency_id: string;
      status: string;
      hash: string;
    }[];
  }

  interface Operator {
    user_ip: string;
    user_agent: string;
    topic: string;
    action: string;
    result: string;
    data: string;
    admin: {
      email: string;
      uid: string;
      role: string;
      level: number;
      otp: boolean;
      state: string;
      referral_uid: null;
      data: null;
    };
    target: null;
    created_at: Date;
  }

  interface Currency {
    name: string;
    symbol: string;
    explorer_transaction?: string;
    explorer_address?: string;
    type: string;
    deposit_enabled: boolean;
    withdrawal_enabled: boolean;
    deposit_fee: string;
    min_deposit_amount: string;
    withdraw_fee: string;
    min_withdraw_amount: string;
    withdraw_limit_24h: string;
    withdraw_limit_72h: string;
    base_factor: number;
    precision: number;
    position: number;
    min_confirmations?: number;
    code: string;
    blockchain_key?: string;
    min_collection_amount: string;
    visible: boolean;
    subunits: number;
    options?: {
      [key: string]: any;
    };
    created_at: Date;
    updated_at: Date;
  }

  interface Market {
    id:               string;
    name:             string;
    base_unit:        string;
    quote_unit:       string;
    min_price:        string;
    max_price:        string;
    min_amount:       string;
    amount_precision: number;
    price_precision:  number;
    total_precision:  number;
    state:            string;
    position:         number;
    created_at:       Date;
    updated_at:       Date;
  }

  interface AdminState {
    role: string[];
    metrics: Metrics;
    member_info: MemberInfo | null;
    user_info: UserInfo | null;
  }
}
