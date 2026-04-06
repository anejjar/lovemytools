import { NextResponse } from "next/server";

const START_TIME = Date.now();

export async function GET() {
  const checks: Record<string, string> = {
    status: "ok",
    uptime_ms: String(Date.now() - START_TIME),
    db: process.env.DATABASE_URL ? "configured" : "missing",
    redis: process.env.UPSTASH_REDIS_REST_URL ? "configured" : "missing",
    node_env: process.env.NODE_ENV ?? "unknown",
  };

  // Quick DB ping
  if (process.env.DATABASE_URL) {
    const t = Date.now();
    try {
      const { db } = await import("@/db");
      await db.execute("SELECT 1" as unknown as Parameters<typeof db.execute>[0]);
      checks.db_ping_ms = String(Date.now() - t);
    } catch (e) {
      checks.db_ping_ms = `ERROR: ${Date.now() - t}ms`;
      checks.db_error = String(e);
    }
  }

  // Quick Redis ping
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const t = Date.now();
    try {
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      await redis.ping();
      checks.redis_ping_ms = String(Date.now() - t);
    } catch (e) {
      checks.redis_ping_ms = `ERROR: ${Date.now() - t}ms`;
      checks.redis_error = String(e);
    }
  }

  return NextResponse.json(checks);
}
