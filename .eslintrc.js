module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    User: true,
    Member: true,
    Blockchain: true,
    Metrics: true,
    Label: true,
    UserLabel: true,
    UserProfile: true,
    Account: true,
    UserOrder: true,
    UserTrade: true,
    UserDeposit: true,
    Operator: true,
    Market: true,
    Currency: true,
    BlockchainCurrency: true,
    WalletSettings: true,
    Wallet: true,
    TradingFee: true,
    Permission: true,
    Restriction: true,
    Operation: true,
    Deposit: true,
    Withdraw: true,
    Adjustment: true,
    SmartContract: true,
    Banner: true,
    BroadCast: true,
    AdminState: true,
    RootState: true,
    Quantex: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/class-name-casing": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "no-console": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  }
};
