import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const t = Date.now();
  const res = NextResponse.next();
  // Log slow requests server-side so you can see them in `docker logs`
  const duration = Date.now() - t;
  if (duration > 100) {
    console.log(`[PERF] middleware ${req.method} ${req.nextUrl.pathname}: ${duration}ms`);
  }
  return res;
}

export const config = {
  // Only run on page routes — skip static assets and API routes
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
