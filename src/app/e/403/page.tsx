import type { Metadata } from "next";
import { ErrorState } from "@/components/ui/ErrorState";

export const metadata: Metadata = { title: "403 — Akses ditolak" };

export default function ForbiddenDemoPage() {
  return <ErrorState code="403" />;
}
