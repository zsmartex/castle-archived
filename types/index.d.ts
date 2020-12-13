declare global {
  interface Metrics {
    signups:                { [key: string]: number };
    sucessful_logins:       { [key: string]: number };
    failed_logins:          { [key: string]: number };
    pending_applications:   number;
  }

  interface Label {
    key:                    string;
    value:                  string;
    scope:                  string;
    description:            null;
    created_at?:            Date;
    updated_at?:            Date;
  }

  export interface Member {
    id:                     number;
    uid:                    string;
    email:                  string;
    level:                  number;
    role:                   string;
    group:                  string;
    state:                  string;
    accounts:               Account[];
    created_at:             Date;
    updated_at?:            Date;
  }

  export interface Account {
    currency:               string;
    balance:                string;
    locked:                 string;
    deposit_address:        string | null;
  }

  interface User {
    email:                  string;
    uid:                    string;
    role:                   string;
    level:                  number;
    otp:                    boolean;
    state:                  string;
    labels:                 Label[];
    phones:                 any[];
    documents:              any[];
    data_storages:          any[];
    referral_uid:           string | null;
    created_at?:            Date;
    updated_at?:            Date;
  }

  interface User {
    email:                  string;
    uid:                    string;
    role:                   string;
    level:                  number;
    otp:                    boolean;
    state:                  string;
    phone:                  any;
  }

  interface UserOrder {
    id:                     number;
    side:                   string;
    ord_type:               string;
    price:                  string;
    avg_price:              string;
    state:                  string;
    market:                 string;
    origin_volume:          string;
    remaining_volume:       string;
    executed_volume:        string;
    trades_count:           number;
    email:                  string;
    uid:                    string;
    created_at?:            Date;
    updated_at?:            Date;
  }

  interface UserTrade {
    id:                     number;
    price:                  string;
    amount:                 string;
    total:                  string;
    market:                 string;
    created_at?:            Date;
    taker_type:             "buy" | "sell";
    maker_order_email:      string;
    maker_uid:              string;
    maker_fee_amount:       string;
    maker_fee_currency:     string;
    taker_order_email:      string;
    taker_uid:              string;
    taker_fee_currency:     string;
    taker_fee_amount:       string;
  }

  interface UserDeposit {
    id:                     number;
    currency:               string;
    amount:                 string;
    fee:                    string;
    txid:                   null | string;
    state:                  string;
    tid:                    string;
    member:                 number;
    uid:                    string;
    email:                  string;
    type:                   string;
    confirmations?:         number;
    address?:               string;
    txout?:                 number;
    block_number?:          number;
    spread?: {
      to_address:           string;
      amount:               string;
      currency_id:          string;
      status:               string;
      hash:                 string;
    };
    completed_at:           Date;
    created_at?:            Date;
    updated_at?:            Date;
  }

  interface Operator {
    user_ip:                string;
    user_agent:             string;
    topic:                  string;
    action:                 string;
    result:                 string;
    data:                   string;
    admin: {
      email:                string;
      uid:                  string;
      role:                 string;
      level:                number;
      otp:                  boolean;
      state:                string;
      referral_uid:         null;
      data:                 null;
    };
    target:                 null;
    created_at?:            Date;
  }

  interface Currency {
    name:                   string;
    symbol:                 string;
    explorer_transaction?:  string;
    explorer_address?:      string;
    type:                   string;
    deposit_enabled:        boolean;
    withdrawal_enabled:     boolean;
    deposit_fee:            string;
    min_deposit_amount:     string;
    withdraw_fee:           string;
    min_withdraw_amount:    string;
    withdraw_limit_24h:     string;
    withdraw_limit_72h:     string;
    base_factor:            number;
    precision:              number;
    position:               number;
    min_confirmations?:     number;
    code:                   string;
    blockchain_key?:        string;
    min_collection_amount:  string;
    visible:                boolean;
    subunits:               number;
    icon_url:               string;
    options?: {
      [key: string]:        any;
    };
    created_at?:            Date;
    updated_at?:            Date;
  }

  interface Market {
    id:                     string;
    name:                   string;
    base_unit:              string;
    quote_unit:             string;
    min_price:              string;
    max_price:              string;
    min_amount:             string;
    amount_precision:       number;
    price_precision:        number;
    total_precision:        number;
    state:                  string;
    position:               number;
    created_at?:            Date;
    updated_at?:            Date;
  }

  interface Blockchain {
    id?:                     number;
    key:                    string;
    name:                   string;
    client:                 string;
    server:                 string;
    height:                 number;
    explorer_address:       string;
    explorer_transaction:   string;
    min_confirmations:      number;
    status:                 string;
    created_at?:            Date;
    updated_at?:            Date;
  }

  interface WalletSettings {
    uri:                  string;
    secret:              string;
  }

  interface Wallet {
    id?:                    number;
    name:                   string;
    kind:                   string;
    currency:               string;
    address:                string;
    gateway:                string;
    max_balance:            string;
    blockchain_key:         string;
    balance?:               string;
    status:                 "active" | "disabled";
    settings?:              WalletSettings;
    created_at?:            Date;
    updated_at?:            Date;
  }

  interface TradingFee {
    id:                     number;
    group:                  string;
    market_id:              string;
    maker:                  string;
    taker:                  string;
    created_at:             Date;
    updated_at:             Date;
  }

  interface Permission {
    id:                     number;
    action:                 "ACCEPT" | "AUDIT" | "DROP";
    role:                   "accountant" | "admin" | "compliance" | "superadmin" | "technical";
    verb:                   "ALL" | "DELETE" | "GET" | "POST" | "PUT";
    path:                   string;
    topic:                  null;
    created_at?:            Date;
    updated_at?:            Date;
  }

  interface Restriction {
    id?:                    number;
    category:               string;
    scope:                  string;
    value:                  string;
    code:                   number | string;
    state:                  string;
    created_at?:            Date;
    updated_at?:            Date;
  }

  namespace Operation {
    type AccountKind =      "main" | "locked";
    type ReferenceType =    "order" | "trade"
    interface Asset {
      id:                   number;
      code:                 number;
      currency:             string;
      credit:               string;
      debit:                string;
      account_kind:         AccountKind;
      rid:                  number;
      reference_type:       "adjustment" | "deposit";
      created_at:           Date;
    }

    interface Liability {
      id:                   number;
      code:                 number;
      currency:             string;
      credit:               string;
      debit:                string;
      uid:                  string;
      account_kind:         AccountKind;
      rid:                  number;
      reference_type:       ReferenceType;
      created_at:           Date;
    }

    interface Revenue {
      id:                   number;
      code:                 number;
      currency:             string;
      credit:               string;
      debit:                string;
      uid:                  string;
      account_kind:         AccountKind;
      rid:                  number;
      reference_type:       ReferenceType;
      created_at:           Date;
    }

    interface Expense {
      
    }
  }

  interface Deposit {
    id:                     number;
    member:                 number;
    uid:                    string;
    email:                  string;
    currency:               string;
    type:                   string;
    amount:                 string;
    fee:                    string;
    state:                  string;
    tid:                    string;
    txout?:                 string;
    block_number?:          number;
    address?:               string;
    txid?:                  string;
    confirmations?:         string;
    created_at:             Date;
    updated_at?:            Date;
    completed_at?:          Date;
  }

  interface Withdraw {
    id:                     number;
    currency:               string;
    type:                   string;
    amount:                 string;
    fee:                    string;
    blockchain_txid?:       string;
    rid?:                   string;
    state:                  string;
    confirmations?:         string;
    note?:                  string;
    member:                 number;
    uid:                    string;
    email:                  string;
    account:                number;
    block_number?:          number;
    sum:                    string;
    tid:                    string;
    created_at:             Date;
    updated_at?:            Date;
    completed_at?:          Date;
    done_at?:               Date;
  }

  interface Adjustment {
    id?:                    number;
    reason:                 string;
    description?:           string;
    category:               string;
    amount:                 string;
    creator_uid:            string;
    currency:               string;
    asset?:                 Operation.Asset;
    liability?:             Operation.Asset;
    state?:                 "pending" | "accepted" | "rejected";
    asset_account_code:     number;
    receiving_account_code: string;
    receiving_member_uid:   string;
    validator_uid?:         string;
    created_at?:            Date;
    updated_at?:            Date;
  }

  interface Banner extends ZTypes.Banner {
    id:                     number;
    state:                  "active" | "deleted";
    created_at:             Date;
    updated_at:             Date;
  }

  interface BroadCast extends ZTypes.BroadCast {
    id:                     number;
    state:                  "active" | "deleted";
    created_at:             Date;
    updated_at:             Date;
  }

  interface AdminState {
    role:                   string[];
    metrics:                Metrics;
    user_info?:             User;
    clients:                string[];
    kinds:                  string[];
    gateways:               string[];
    markets:                Market[];
    currencies:             Currency[];
    blockchains:            Blockchain[];
  }

  interface RootState {
    admin:                  AdminState;
  }
}

export { };
