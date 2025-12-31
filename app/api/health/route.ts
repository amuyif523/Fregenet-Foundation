import { NextResponse } from "next/server";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: true, ts: new Date().toISOString() }, { status: 200, headers: { "Cache-Control": "no-store" } });
}
