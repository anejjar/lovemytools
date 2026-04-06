export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const start = Date.now();
    console.log("[PERF] Server starting up...");

    // Test DB connectivity
    if (process.env.DATABASE_URL) {
      const t = Date.now();
      try {
        const { neon } = await import("@neondatabase/serverless");
        neon(process.env.DATABASE_URL);
        console.log(`[PERF] DB client ready: ${Date.now() - t}ms`);
      } catch (e) {
        console.error(`[PERF] DB client FAILED (${Date.now() - t}ms):`, e);
      }
    } else {
      console.warn("[PERF] DATABASE_URL not set — DB features disabled");
    }

    // Test Redis connectivity
    if (process.env.REDIS_URL) {
      const t = Date.now();
      try {
        const { getRedis } = await import("./lib/redis");
        const redis = getRedis()!;
        await redis.connect();
        await redis.ping();
        console.log(`[PERF] Redis ping OK: ${Date.now() - t}ms`);
      } catch (e) {
        console.error(`[PERF] Redis FAILED (${Date.now() - t}ms):`, (e as Error).message);
      }
    } else {
      console.warn("[PERF] REDIS_URL not set — rate limiting disabled");
    }

    console.log(`[PERF] Server startup complete: ${Date.now() - start}ms`);
  }
}
