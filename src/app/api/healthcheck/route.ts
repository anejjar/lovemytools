import { NextResponse } from "next/server";

const START_TIME = Date.now();

export async function GET() {
  const checks: Record<string, string> = {
    status: "ok",
    uptime_ms: String(Date.now() - START_TIME),
    db: process.env.DATABASE_URL ? "configured" : "missing",
    redis: process.env.REDIS_URL ? "configured" : "missing",
    node_env: process.env.NODE_ENV ?? "unknown",
  };

  // DB ping
  if (process.env.DATABASE_URL) {
    const t = Date.now();
    try {
      const { db, tools } = await import("@/db");
      await db.select().from(tools).limit(1);
      checks.db_ping_ms = String(Date.now() - t);
    } catch (e) {
      checks.db_ping_ms = `ERROR ${Date.now() - t}ms`;
      checks.db_error = (e as Error).message;
    }
  }

  // Redis ping
  if (process.env.REDIS_URL) {
    const t = Date.now();
    try {
      const { getRedis } = await import("@/lib/redis");
      const redis = getRedis()!;
      await redis.ping();
      checks.redis_ping_ms = String(Date.now() - t);
    } catch (e) {
      checks.redis_ping_ms = `ERROR ${Date.now() - t}ms`;
      checks.redis_error = (e as Error).message;
    }
  }

  return NextResponse.json(checks);
}
