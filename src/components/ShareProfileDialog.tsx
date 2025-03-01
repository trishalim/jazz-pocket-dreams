"use client";

import { Button } from "@/components/Button";
import {
  Dialog,
  DialogBody,
  DialogProps,
  DialogTitle,
} from "@/components/Dialog";
import { Icon } from "@/components/Icon";
import { useAccount } from "jazz-react";
import { useEffect, useState } from "react";

export function ShareProfileDialog(props: Omit<DialogProps, "children">) {
  const { me } = useAccount();

  const [copyCount, setCopyCount] = useState(0);
  const copied = copyCount > 0;
  const link = `${window.location.origin}/user/${me?.id}`;

  useEffect(() => {
    if (copyCount > 0) {
      const timeout = setTimeout(() => setCopyCount(0), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copyCount]);

  if (!me) return;

  return (
    <Dialog {...props}>
      <DialogTitle>Share your profile</DialogTitle>
      <DialogBody>
        <label className="sr-only">Profile link</label>
        <input
          type="text"
          className="w-full rounded border p-1"
          value={link}
          readOnly
        />

        <Button
          variant="primary"
          onClick={() => {
            window.navigator.clipboard.writeText(link).then(() => {
              setCopyCount((count) => count + 1);
            });
          }}
        >
          {copied ? (
            <Icon name="check" size="sm" />
          ) : (
            <Icon name="copy" size="sm" />
          )}
          Copy link to clipboard
        </Button>
      </DialogBody>
    </Dialog>
  );
}
