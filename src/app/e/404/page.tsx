import type { Metadata } from "next";
import { ErrorState } from "@/components/ui/ErrorState";

export const metadata: Metadata = { title: "404 — Tidak ditemukan" };

export default function NotFoundDemoPage() {
  return <ErrorState code="404" />;
}
