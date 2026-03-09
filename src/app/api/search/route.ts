import { NextRequest, NextResponse } from "next/server";
import { searchTools } from "@/tools/_registry";

export async function GET(req: NextRequest) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  const results = searchTools(q).slice(0, 10);
  return NextResponse.json({ results });
}
