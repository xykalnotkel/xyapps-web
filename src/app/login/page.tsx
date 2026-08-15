"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/Session";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Sym } from "@/components/Icon";

type Method = "email" | "google" | "id";

export default function LoginPage() {
  const { login } = useSession();
  const router = useRouter();
  const [method, setMethod] = useState<Method>("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [xyId, setXyId] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);

    if (method === "google") {
      setErr("Masuk dengan Google segera hadir.");
      return;
    }

    if (method === "id") {
      if (xyId.trim().length < 4) {
        setErr("ID XySpace minimal 4 karakter.");
        return;
      }
      setLoading(true);
      window.setTimeout(() => {
        login(xyId.trim(), `${xyId.trim().toLowerCase()}@xyspace.id`);
        router.push("/me");
      }, 700);
      return;
    }

    if (!name.trim()) {
      setErr("Nama tampilan tidak boleh kosong.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErr("Email tidak valid. Contoh: kamu@xystudio.my.id");
      return;
    }
    // Multi-login: email -> halaman verifikasi OTP
    router.push(
      `/verify?name=${encodeURIComponent(name.trim())}&email=${encodeURIComponent(email.trim())}`,
    );
  }

  return (
    <div className="wrap">
      <div className="login-wrap">
        <div className="login-brand">
          <span className="login-mark">
            <b>Xy</b>
          </span>
          <h1 className="page-title">Masuk ke XyApps</h1>
          <p className="sub">
            Simpan library, wishlist, dan ulasan di semua perangkatmu.
          </p>
        </div>

        {/* PEMILIH METODE — multi login */}
        <div className="tabs" role="tablist" aria-label="Metode masuk">
          <button
            type="button"
            role="tab"
            aria-selected={method === "email"}
            className={method === "email" ? "on" : ""}
            onClick={() => {
              setMethod("email");
              setErr(null);
            }}
          >
            <Sym name="mail" size={17} /> Email
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={method === "google"}
            className={method === "google" ? "on" : ""}
            onClick={() => {
              setMethod("google");
              setErr(null);
            }}
          >
            <Sym name="account_circle" size={17} /> Google
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={method === "id"}
            className={method === "id" ? "on" : ""}
            onClick={() => {
              setMethod("id");
              setErr(null);
            }}
          >
            <Sym name="badge" size={17} /> XySpace ID
          </button>
        </div>

        {method === "google" ? (
          <div className="stack-12">
            <button
              type="button"
              className="google-btn"
              onClick={() => setErr("Masuk dengan Google segera hadir.")}
            >
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
                <path
                  fill="#FFC107"
                  d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C41.4 34.9 44 29.9 44 24c0-1.3-.1-2.6-.4-3.9z"
                />
              </svg>
              Lanjutkan dengan Google
            </button>
            <p className="note">
              Pilihan ini tersedia setelah integrasi akun resmi.
            </p>
          </div>
        ) : (
          <form className="login-form" onSubmit={onSubmit}>
            {method === "email" && (
              <>
                <label className="field">
                  <span className="field-label">
                    <Sym name="person" size={15} /> Nama tampilan
                  </span>
                  <div className={`field-input ${err && !name.trim() ? "bad" : ""}`}>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="cth: Kall"
                      autoComplete="name"
                    />
                  </div>
                </label>
                <label className="field">
                  <span className="field-label">
                    <Sym name="mail" size={15} /> Email
                  </span>
                  <div
                    className={`field-input ${err && !/^\S+@\S+\.\S+$/.test(email.trim()) ? "bad" : ""}`}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kamu@xystudio.my.id"
                      autoComplete="email"
                    />
                  </div>
                </label>
                <p className="note">
                  Kode verifikasi 6 digit akan dikirim ke emailmu.
                </p>
              </>
            )}
            {method === "id" && (
              <label className="field">
                <span className="field-label">
                  <Sym name="badge" size={15} /> ID XySpace
                </span>
                <div className={`field-input ${err && xyId.trim().length < 4 ? "bad" : ""}`}>
                  <input
                    value={xyId}
                    onChange={(e) => setXyId(e.target.value)}
                    placeholder="ID resmi dari tim XySpace"
                    autoComplete="username"
                  />
                </div>
              </label>
            )}
            {err && (
              <p className="form-err" role="alert">
                <Sym name="error" size={15} /> {err}
              </p>
            )}
            <LoadingButton type="submit" loading={loading} block>
              <Sym name="key" size={16} />
              {method === "email" ? "Kirim kode verifikasi" : "Masuk"}
            </LoadingButton>
          </form>
        )}

        <p className="note">
          Akun kamu tersimpan aman. Ingin jadi developer? Baca syaratnya di
          halaman program developer.
        </p>
      </div>
    </div>
  );
}
