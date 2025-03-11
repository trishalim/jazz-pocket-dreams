import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps } from "react";

interface Props {
  variant?: "primary" | "secondary" | "tertiary" | "destructive";
  className?: string;
  size?: "sm" | "md" | "lg";
}

interface AnchorProps
  extends Props,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export type ButtonProps = ComponentProps<"button"> & Props;

export function Button(props: AnchorProps | ButtonProps) {
  const {
    className: customClassName = "",
    variant = "primary",
    children,
    size = "md",
  } = props;

  const variantClassNames = {
    base: "border inline-flex items-center justify-center rounded-full overflow-hidden transition-colors",
    primary:
      "border-purple-300 bg-purple-300 font-medium text-purple-950 rounded-full hover:bg-purple-200 hover:border-purple-200",
    secondary:
      "rounded-full border font-medium text-slate-600 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800 dark:border-slate-700",
    tertiary: "rounded-full bg-white text-purple-950 font-medium",
    destructive: "rounded-full bg-red-600 text-white font-medium",
  };

  const sizeClassNames = {
    sm: "py-1.5 px-3 text-sm gap-1.5",
    md: "py-2 px-5 gap-2",
    lg: "py-2 md:py-2.5 px-6 md:text-lg gap-2",
  };

  const className = clsx(
    customClassName,
    variantClassNames.base,
    variantClassNames[variant],
    sizeClassNames[size],
  );

  if (!!(props as AnchorProps).href) {
    const anchorProps = props as AnchorProps;
    return (
      <Link href={anchorProps.href} className={className}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonProps;

  return (
    <button {...buttonProps} className={className}>
      {children}
    </button>
  );
}
