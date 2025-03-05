"use client";

import { Container } from "@/components/Container";
import UserProfile from "@/components/UserProfile";
import { JazzAccount } from "@/schema";
import { ID } from "jazz-tools";
import { use } from "react";

export default function Page({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <Container className="py-12">
      <UserProfile id={slug as ID<JazzAccount>} />
    </Container>
  );
}
