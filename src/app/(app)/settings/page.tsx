"use client";

import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { useAccount } from "jazz-react";

export default function Settings() {
  const { me } = useAccount({ profile: {} });

  if (!me) return;

  return (
    <Container className="py-8">
      <h1 className="font-serif text-lg font-medium sm:text-2xl mb-4">
        Settings
      </h1>

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
