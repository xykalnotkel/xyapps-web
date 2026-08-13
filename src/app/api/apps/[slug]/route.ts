import { NextResponse } from "next/server";
import { getApp, toPublicApp } from "@/lib/data";

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/apps/[slug]">,
) {
  const { slug } = await ctx.params;
  const app = getApp(slug);
  if (!app) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  return NextResponse.json({ app: toPublicApp(app) });
}
