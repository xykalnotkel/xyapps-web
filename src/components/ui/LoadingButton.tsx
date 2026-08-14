"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  block?: boolean;
  variant?: "solid" | "ghost" | "soft";
  children: ReactNode;
};

export function LoadingButton({
  loading,
  block,
  variant = "solid",
  children,
  disabled,
  className = "",
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={`lbtn ${variant} ${block ? "block" : ""} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading && <span className="spin" aria-hidden />}
      <span className={loading ? "lbtn-label dim" : "lbtn-label"}>{children}</span>
    </button>
  );
}
