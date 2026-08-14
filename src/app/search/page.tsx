import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchClient } from "./SearchClient";
import { ListSkeleton } from "@/components/ui/Skeleton";

export const metadata: Metadata = { title: "Telusuri" };

export default function SearchPage() {
  return (
    <div className="wrap page-inner stack-16">
      <Suspense fallback={<ListSkeleton />}>
        <SearchClient />
      </Suspense>
    </div>
  );
}
