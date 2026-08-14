import type { Metadata } from "next";
import { ErrorState } from "@/components/ui/ErrorState";

export const metadata: Metadata = { title: "503 — Pemeliharaan" };

export default function MaintenanceDemoPage() {
  return <ErrorState code="503" />;
}
