"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/Session";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Sym } from "@/components/Icon";

export default function LoginPage() {
  const { login } = useSession();
  const router = useRouter();
  const [name, setName] = useState("Studio");
  const [email, setEmail] = useState("kamu@xystudio.my.id");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      login(name.trim() || "User", email.trim() || "user@local");
      router.push("/me");
    }, 700);
  }

  return (
    <div className="wrap">
      <form className="form" onSubmit={onSubmit}>
        <p className="kicker">Akun</p>
        <h1 className="page-title">Masuk</h1>
        <p className="sub">
          Mock. Tersimpan di localStorage, bukan server. Google OAuth menyusul —
          sengaja tidak dipalsu.
        </p>
        <label className="field">
          Nama tampilan
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="field">
          Email (hanya untuk dirimu)
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <LoadingButton type="submit" loading={loading} block>
          <Sym name="key" size={16} /> Masuk
        </LoadingButton>
        <p className="note">
          Dengan masuk, ulasan yang kamu tulis akan memakai nama ini (mock lokal).
        </p>
      </form>
    </div>
  );
}
