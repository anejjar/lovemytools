import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __db: ReturnType<typeof drizzle> | undefined;
}

function createDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "[DB] DATABASE_URL is not set — database features are unavailable. " +
      "Set DATABASE_URL in your environment to enable DB functionality."
    );
  }
  const t = Date.now();
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });
  console.log(`[PERF] DB client created: ${Date.now() - t}ms`);
  return db;
}

export const db = global.__db ?? createDb();

if (process.env.NODE_ENV !== "production") {
  global.__db = db;
}

export * from "./schema";
