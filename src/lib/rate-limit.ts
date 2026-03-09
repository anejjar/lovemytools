import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export function createRateLimiter(requests: number, window: string) {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    // No-op limiter when Redis not configured
    return {
      limit: async () => ({ success: true, limit: requests, remaining: requests, reset: 0 }),
    };
  }

  return new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(requests, window as Parameters<typeof Ratelimit.slidingWindow>[1]),
  });
}

export const toolUsageLimiter = createRateLimiter(10, "1 m");
export const feedbackLimiter = createRateLimiter(3, "1 h");
