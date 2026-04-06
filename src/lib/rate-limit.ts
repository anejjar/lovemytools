import { getRedis } from "./redis";

function parseWindowMs(window: string): number {
  const match = window.match(/^(\d+)\s*(s|m|h|d)$/);
  if (!match) return 60_000;
  const num = parseInt(match[1]);
  const units: Record<string, number> = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
  return num * units[match[2]];
}

export function createRateLimiter(requests: number, window: string) {
  const windowMs = parseWindowMs(window);
  const windowSec = Math.ceil(windowMs / 1000);

  return {
    async limit(identifier: string) {
      const redis = getRedis();

      if (!redis) {
        // No Redis configured — allow everything
        return { success: true, limit: requests, remaining: requests };
      }

      try {
        // Fixed-window counter: key per (identifier, window bucket)
        const bucket = Math.floor(Date.now() / windowMs);
        const key = `rl:${identifier}:${bucket}`;

        const count = await redis.incr(key);
        if (count === 1) {
          await redis.expire(key, windowSec);
        }

        const success = count <= requests;
        return {
          success,
          limit: requests,
          remaining: Math.max(0, requests - count),
        };
      } catch (err) {
        // Redis error — fail open (allow the request) so users aren't blocked
        console.error("[RateLimit] Redis error, failing open:", (err as Error).message);
        return { success: true, limit: requests, remaining: requests };
      }
    },
  };
}

export const toolUsageLimiter = createRateLimiter(10, "1 m");
export const feedbackLimiter = createRateLimiter(3, "1 h");
