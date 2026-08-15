import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyClient } from "./VerifyClient";

export const metadata: Metadata = { title: "Verifikasi" };

export default function VerifyPage() {
  return (
    <Suspense fallback={<p className="sub">Memuat…</p>}>
      <VerifyClient />
    </Suspense>
  );
}
