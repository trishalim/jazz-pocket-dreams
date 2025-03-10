"use client";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Input } from "@/components/Input";
import { useAccount } from "jazz-react";

export default function Settings() {
  const { me } = useAccount({ profile: {} });

  if (!me) return;

  return (
    <Container className="py-12">
      <Heading className="mb-4">Settings</Heading>

      <div className="max-w-lg">
        <Input
          label="Name"
          placeholder="Your name"
          value={me.profile.name}
          onChange={(e) => (me.profile.name = e.target.value)}
        />
      </div>
    </Container>
  );
}
