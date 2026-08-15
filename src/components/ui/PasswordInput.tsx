"use client";

import { useState } from "react";
import { Sym } from "@/components/Icon";

/** Input password dengan tombol tampilkan/sembunyikan. */
export function PasswordInput({
  value,
  onChange,
  placeholder = "••••••••",
  autoComplete = "current-password",
  ariaLabel = "Kata sandi",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  ariaLabel?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="field-input pw-wrap">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-label={ariaLabel}
      />
      <button
        type="button"
        className="pw-toggle"
        aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
        aria-pressed={show}
        onClick={() => setShow((v) => !v)}
      >
        <Sym name={show ? "visibility_off" : "visibility"} size={18} />
      </button>
    </div>
  );
}
