"use client";

import { type ToastProps } from "@/components/Toast";
import { Toast } from "@/components/Toast";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { createContext, useCallback, useContext, useState } from "react";

type ToastContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: ToastProps | null;
  show: (props: ToastProps) => void;
  success: (description: string, title?: string) => void;
  error: (description: string, title?: string) => void;
  info: (description: string, title?: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<ToastProps | null>(null);

  const show = useCallback(
    ({ title, description, variant = "info" }: ToastProps) => {
      setData({ title, description, variant });
      setOpen(true);
    },
    [],
  );

  const value = {
    open,
    setOpen,
    data,
    show,
    success: (description: string, title?: string) =>
      show({ description, title, variant: "success" }),
    error: (description: string, title?: string) =>
      show({ description, title, variant: "error" }),
    info: (description: string, title?: string) =>
      show({ description, title, variant: "info" }),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastPrimitive.Provider swipeDirection="right">
        <ToastPrimitive.Viewport className="fixed bottom-5 right-5 z-50 m-6 flex flex-col gap-3 w-[390px]" />
        {data && <Toast {...data} open={open} onOpenChange={setOpen} />}
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
