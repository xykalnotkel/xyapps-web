"use client";

import { ErrorState } from "@/components/ui/ErrorState";
import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body>
        <ErrorState code="503" onRetry={reset} />
      </body>
    </html>
  );
}
