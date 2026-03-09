import { NextRequest, NextResponse } from "next/server";
import { toolUsageLimiter } from "@/lib/rate-limit";
import { getToolBySlug } from "@/tools/_registry";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!getToolBySlug(slug)) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await toolUsageLimiter.limit(ip);

  if (!success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  try {
    if (process.env.DATABASE_URL) {
      const { db, toolUsage } = await import("@/db");
      const body = await req.json().catch(() => ({})) as { sessionId?: string };
      await db.insert(toolUsage).values({ slug, sessionId: body.sessionId });
    }
  } catch {
    // Non-critical, don't fail the request
  }

  return NextResponse.json({ success: true });
}
