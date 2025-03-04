"use client";

import { Container } from "@/components/Container";
import LandingPage from "@/components/LandingPage";
import UserProfile from "@/components/UserProfile";
import { JazzAccount } from "@/schema";
import { useClerk } from "@clerk/clerk-react";
import { useAccount, useIsAuthenticated } from "jazz-react";
import { ID } from "jazz-tools";

export default function Home() {
  const { me } = useAccount();
  const { user, loaded } = useClerk();
  const isAuthenticated = useIsAuthenticated();

  if (!user && loaded) {
    return <LandingPage />;
  }

  return (
    <Container className="grid gap-12 py-12">
      <UserProfile id={me?.id as ID<JazzAccount>} />
    </Container>
  );
}
