import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

export async function getAuthTokenFromRequest(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return null;
}

export async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    const { userId } = await auth();
    if (!userId) return null;
    return { userId };
  } catch {
    return null;
  }
}

export { auth };
