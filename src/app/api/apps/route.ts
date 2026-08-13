import { NextResponse } from "next/server";
import { APPS, toPublicApp } from "@/lib/data";

export function GET() {
  return NextResponse.json({
    apps: APPS.map(toPublicApp),
  });
}
