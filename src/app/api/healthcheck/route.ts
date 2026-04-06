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

  // DB ping — raw SELECT 1, no table dependency
  if (process.env.DATABASE_URL) {
    const t = Date.now();
    try {
      const { default: postgres } = await import("postgres");
      const sql = postgres(process.env.DATABASE_URL, { max: 1 });
      await sql`SELECT 1`;
      await sql.end();
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
