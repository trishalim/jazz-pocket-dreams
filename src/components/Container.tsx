import clsx from "clsx";

export function Container({
  children,
  className,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      className={clsx(
        "mx-auto px-4",
        {
          "sm:max-w-xl": size === "sm",
          "max-w-4xl": size === "md",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
