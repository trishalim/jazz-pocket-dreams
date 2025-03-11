"use client";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import LogoIcon from "@/components/icons/LogoIcon";
import { useClerk } from "@clerk/clerk-react";
import { useAccount, useIsAuthenticated } from "jazz-react";
import Link from "next/link";

export function Nav() {
  const { me, logOut } = useAccount();
  const isAuthenticated = useIsAuthenticated();
  const { redirectToSignIn } = useClerk();

  return (
    <nav className="border-b py-3">
      <Container className="flex items-center justify-between gap-12 text-sm">
        <Link href="/">
          <LogoIcon className="h-12 w-auto" />
          <span className="sr-only">Home</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          {isAuthenticated ? (
            <>
              <Link href="/settings">{me?.profile?.name}</Link>
              <Button variant="secondary" onClick={logOut} size="sm">
                Log out
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              onClick={() => redirectToSignIn()}
              size="sm"
            >
              Log in
            </Button>
          )}
        </div>
      </Container>
    </nav>
  );
}
