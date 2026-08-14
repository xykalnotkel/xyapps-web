import type { Metadata } from "next";
import { DeveloperProfileView } from "@/components/ProfileViews";
import { DEVELOPERS } from "@/lib/data";

export function generateStaticParams() {
  return DEVELOPERS.map((d) => ({ id: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const d = DEVELOPERS.find((x) => x.id === id);
  return { title: d ? d.name : "Developer tidak ditemukan" };
}

export default async function DeveloperUserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DeveloperProfileView id={id} />;
}
