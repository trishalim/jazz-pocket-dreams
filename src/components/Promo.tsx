"use client";

import { Button } from "@/components/Button";
import { useClerk } from "@clerk/clerk-react";
import clsx from "clsx";
import { useIsAuthenticated } from "jazz-react";

export function Promo({ className }: { className?: string }) {
  const { redirectToSignUp } = useClerk();
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) return;

  return (
    <div
      className={clsx(
        className,
        "flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-8 bg-slate-50 rounded-lg md:rounded-2xl",
      )}
    >
      <h2 className="font-medium font-serif text-xl text-slate-900 dark:text-white  lg:text-2xl">
        Create your own shareable book shelf
      </h2>

      <Button variant="primary" onClick={() => redirectToSignUp()}>
        Sign up
      </Button>
    </div>
  );
}
