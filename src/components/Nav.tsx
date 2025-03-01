"use client";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import {useAccount, useIsAuthenticated} from "jazz-react";
import Link from "next/link";
import LogoIcon from "@/components/icons/LogoIcon";

export function Nav() {
  const { me, logOut } = useAccount();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) return;

  return (
    <nav className="border-b py-3">
      <Container className="flex items-center justify-between gap-12 text-sm">
        <Link href="/" >
        <LogoIcon className="h-12 w-auto" />
          <span className="sr-only">Home</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <p>{me?.profile?.name}</p>
          <Button variant="secondary" onClick={logOut}>
            Log out
          </Button>
        </div>
      </Container>
    </nav>
  );
}
