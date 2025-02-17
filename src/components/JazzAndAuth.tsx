"use client";

import { JazzAccount } from "@/schema";
import { DemoAuthBasicUI, useDemoAuth, JazzProvider } from "jazz-react";

declare module "jazz-react" {
  interface Register {
    Account: JazzAccount;
  }
}


export function JazzAndAuth({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JazzProvider
        sync={{
          peer: `wss://cloud.jazz.tools/?key=$book-shelf-app@example.com`,
        }}
        AccountSchema={JazzAccount}
      >
        {children}
      </JazzProvider>
    </>
  );
}
