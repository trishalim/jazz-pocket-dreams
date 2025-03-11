import { Icon } from "@/components/Icon";
import { JazzAccount, JazzProfile } from "@/schema";
import { useCoState } from "jazz-react";
import { ID } from "jazz-tools";
import Link from "next/link";

export function BackToProfileButton({ accountId }: { accountId: string }) {
  const user = useCoState(JazzAccount, accountId as ID<JazzAccount>, {
    profile: {},
  });

  console.log(user?.profile);

  if (!user?.profile) return null;

  return (
    <Link
      href={`/user/${accountId}`}
      className="text-sm inline-flex gap-1 items-center hover:text-slate-800 dark:hover:text-slate-300"
    >
      <Icon name="chevronLeft" size="xs" />

      {user.isMe
        ? "Back to book shelf"
        : `Back to ${user?.profile?.name}'s book shelf`}
    </Link>
  );
}
