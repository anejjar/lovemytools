import { NextRequest, NextResponse } from "next/server";
import { feedbackLimiter } from "@/lib/rate-limit";
import { getToolBySlug } from "@/tools/_registry";
import { z } from "zod";

const FeedbackSchema = z.object({
  slug: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await feedbackLimiter.limit(ip);

  if (!success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = FeedbackSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { slug, rating, comment } = parsed.data;

  if (!getToolBySlug(slug)) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  try {
    if (process.env.DATABASE_URL) {
      const { db, toolFeedback } = await import("@/db");
      await db.insert(toolFeedback).values({ slug, rating, comment });
    }
  } catch {
    // Non-critical
  }

  return NextResponse.json({ success: true });
}
