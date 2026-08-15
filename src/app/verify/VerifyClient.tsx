"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/components/Session";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Sym } from "@/components/Icon";

const LEN = 6;
const RESEND_SECS = 60;

/**
 * Verifikasi OTP 6 digit — mock.
 * Setiap 6 digit diterima; backend asli tinggal mengganti pengecekan
 * di fungsi verify() dengan endpoint tiket OTP.
 */
export function VerifyClient() {
  const params = useSearchParams();
  const router = useRouter();
  const { login } = useSession();

  const name = params.get("name") ?? "";
  const email = params.get("email") ?? "";

  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(""));
  const [seconds, setSeconds] = useState(RESEND_SECS);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // hitung mundur resend
  useEffect(() => {
    const id = window.setInterval(
      () => setSeconds((s) => (s > 0 ? s - 1 : 0)),
      1000,
    );
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  function setAt(i: number, v: string) {
    const d = v.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = d;
      return next;
    });
    if (d && i < LEN - 1) inputs.current[i + 1]?.focus();
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  }

  function onPaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LEN);
    if (!text) return;
    e.preventDefault();
    const next = Array(LEN).fill("");
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    inputs.current[Math.min(text.length, LEN - 1)]?.focus();
  }

  function verify() {
    setErr(null);
    setLoading(true);
    window.setTimeout(() => {
      login(
        name || email.split("@")[0] || "User",
        email || "user@local",
      );
      router.push("/me");
    }, 600);
  }

  const filled = digits.every((d) => d !== "");

  function resend() {
    if (seconds > 0) return;
    setSeconds(RESEND_SECS);
    setDigits(Array(LEN).fill(""));
    setErr(null);
    inputs.current[0]?.focus();
  }

  if (!email && !name) {
    return (
      <div className="wrap page-inner stack-16">
        <div className="err-wrap">
          <span className="err-ic mute">
            <Sym name="question_mark" size={44} />
          </span>
          <h1 className="page-title">Tidak ada yang bisa diverifikasi</h1>
          <p className="sub">Mulai dari halaman masuk terlebih dahulu.</p>
          <a className="lbtn solid" href="/login">
            Ke halaman masuk
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap">
      <div className="login-wrap">
        <div className="login-brand">
          <span className="verify-mark">
            <Sym name="lock" size={28} />
          </span>
          <h1 className="page-title">Kode verifikasi</h1>
          <p className="sub">
            Kode 6 digit dikirim ke <strong>{email}</strong>. Masukkan untuk
            melanjutkan.
          </p>
        </div>

        <div className="otp-row" onPaste={onPaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              className={`otp-box ${err ? "bad" : ""}`}
              inputMode="numeric"
              maxLength={2}
              value={d}
              aria-label={`Digit ${i + 1}`}
              onChange={(e) => setAt(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>

        {err && (
          <p className="form-err" role="alert">
            <Sym name="error" size={15} /> {err}
          </p>
        )}

        <LoadingButton block onClick={verify} loading={loading} disabled={!filled}>
          Verifikasi
        </LoadingButton>

        <p className="note otp-note">
          {seconds > 0 ? (
            <>Kirim ulang dalam {seconds}s</>
          ) : (
            <button type="button" className="text-btn" onClick={resend}>
              Kirim ulang kode
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
