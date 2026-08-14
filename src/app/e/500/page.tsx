import type { Metadata } from "next";
import { ErrorState } from "@/components/ui/ErrorState";

export const metadata: Metadata = { title: "500 — Kesalahan server" };

export default function ServerErrorDemoPage() {
  return <ErrorState code="500" />;
}
