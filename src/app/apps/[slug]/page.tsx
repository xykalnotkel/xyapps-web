import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { APPS, getApp } from "@/lib/data";
import { DetailClient } from "./DetailClient";

export function generateStaticParams() {
  return APPS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return { title: "Tidak ditemukan" };
  return { title: app.title, description: app.tagline };
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();
  return <DetailClient app={app} />;
}
