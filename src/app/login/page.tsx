"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/Session";

export default function LoginPage() {
  const { login } = useSession();
  const router = useRouter();
  const [name, setName] = useState("Studio");
  const [email, setEmail] = useState("kamu@xystudio.my.id");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    login(name.trim() || "User", email.trim() || "user@local");
    router.push("/me");
  }

  return (
    <div className="wrap">
      <form className="form" onSubmit={onSubmit}>
        <p className="kicker">Akun</p>
        <h2>Masuk (mock)</h2>
        <p className="sub">Belum ada Auth.js. Tersimpan di localStorage.</p>
        <label className="field">
          Nama tampilan
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="field">
          Email (hanya untuk dirimu)
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button className="btn solid" type="submit">
          Masuk
        </button>
        <p className="note">Google OAuth menyusul. Sengaja tidak dipalsu.</p>
      </form>
    </div>
  );
}
