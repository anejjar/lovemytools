import Redis from "ioredis";

declare global {
  // eslint-disable-next-line no-var
  var __redis: Redis | undefined;
}

export function getRedis(): Redis | null {
  if (!process.env.REDIS_URL) return null;

  if (!global.__redis) {
    global.__redis = new Redis(process.env.REDIS_URL, {
      // Fail fast rather than hanging for 20+ seconds
      connectTimeout: 3000,
      commandTimeout: 2000,
      maxRetriesPerRequest: 1,
      lazyConnect: true,
      enableOfflineQueue: false,
    });

    global.__redis.on("error", (err) => {
      console.error("[Redis] connection error:", err.message);
    });
  }

  return global.__redis;
}
