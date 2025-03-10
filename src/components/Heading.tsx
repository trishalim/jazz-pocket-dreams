import clsx from "clsx";

export function Heading({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <h1
      className={clsx(
        className,
        "font-serif text-2xl font-medium text-slate-900 sm:text-4xl dark:text-slate-200",
      )}
    >
      {children}
    </h1>
  );
}
