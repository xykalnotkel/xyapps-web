"use client";

import { useRef, useState } from "react";

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  function show(m: string) {
    setMsg(m);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMsg(null), 2400);
  }

  return { msg, show };
}

export function ToastView({ msg }: { msg: string | null }) {
  return (
    <div className={`toast ${msg ? "on" : ""}`} role="status" aria-live="polite">
      {msg}
    </div>
  );
}
