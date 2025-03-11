import clsx from "clsx";

export function Divider({
  className,
  ...props
}: { soft?: boolean } & React.ComponentPropsWithoutRef<"hr">) {
  return (
    <hr
      role="presentation"
      {...props}
      className={clsx(className, "w-full border-t")}
    />
  );
}
