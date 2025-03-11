"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { clsx } from "clsx";
import { Icon } from "./Icon";

export type ToastProps = {
  title?: string;
  description: string;
  variant?: "success" | "error" | "info";
};

const ICONS = {
  success: "check",
  error: "close",
  info: "check",
} as const;

type ToastComponentProps = ToastProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ICON_CLASSES = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
} as const;

export function Toast({
  title,
  description,
  variant = "info",
  open,
  onOpenChange,
}: ToastComponentProps) {
  return (
    <ToastPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      className={clsx(
        // Container
        "rounded-lg py-2 px-3 bg-white shadow-lg ring-1 ring-slate-950/10 dark:ring-inset dark:ring-white/10",
        "bg-white/75 backdrop-blur-xl dark:bg-slate-800",
        // Children
        "flex items-start",
        // Sizing and positioning
        "max-w-lg",
        // Typography
        "text-sm leading-relaxed text-slate-900 dark:text-white",
        // Transitions
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full",
      )}
    >
      <Icon
        name={ICONS[variant]}
        size="sm"
        rounded
        className={clsx(ICON_CLASSES[variant], "mt-[5px] text-white shrink-0")}
      />
      <div className="flex-1 mt-[5px] ml-2">
        {title && (
          <ToastPrimitive.Title className="mb-1 font-semibold">
            {title}
          </ToastPrimitive.Title>
        )}
        <ToastPrimitive.Description>{description}</ToastPrimitive.Description>
      </div>
      <ToastPrimitive.Close
        className="ml-4 shrink-0 opacity-50 hover:opacity-100 p-2 -mr-2 mt-px"
        aria-label="Close"
      >
        <Icon name="close" size="xs" />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
}
