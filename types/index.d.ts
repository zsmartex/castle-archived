import { RootState as ZRootState } from "@zsmartex/z-store";

declare namespace StoreTypes {
  interface RootState extends ZRootState {
    admin: AdminState;
  }
  interface AdminState {
    metrics: {
      signups: { [key: string]: number };
      sucessful_logins: { [key: string]: number };
      failed_logins: { [key: string]: number };
      pending_applications: number;
    };
  }
}
