import type { Metadata } from "next";
import { UserProfileView } from "@/components/ProfileViews";
import { USERS } from "@/lib/data";

export function generateStaticParams() {
  return USERS.map((u) => ({ id: u.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const u = USERS.find((x) => x.id === id);
  return { title: u ? u.name : "Profil tidak ditemukan" };
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <UserProfileView id={id} />;
}
