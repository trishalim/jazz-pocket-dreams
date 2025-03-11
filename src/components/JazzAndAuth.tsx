"use client";

import { JazzAccount } from "@/schema";
import { ClerkProvider, useClerk } from "@clerk/clerk-react";
import { JazzProviderWithClerk } from "jazz-react-auth-clerk";
import { type ReactNode } from "react";

function JazzAndAuth({ children }: { children: ReactNode }) {
  const clerk = useClerk();

  if (clerk.loaded === false) {
    return null;
  }

  return (
    <JazzProviderWithClerk
      clerk={clerk}
      sync={{ peer: "wss://cloud.jazz.tools/?key=pocketdreams@trishalim.com" }}
      AccountSchema={JazzAccount}
    >
      {children}
    </JazzProviderWithClerk>
  );
}

export function Auth({ children }: { children: ReactNode }) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    throw new Error("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set");
  }

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <JazzAndAuth>{children}</JazzAndAuth>
    </ClerkProvider>
  );
}

declare module "jazz-react" {
  interface Register {
    Account: JazzAccount;
  }
}
