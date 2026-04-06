import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __db: ReturnType<typeof drizzle> | undefined;
}

function createDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "[DB] DATABASE_URL is not set — database features are unavailable."
    );
  }
  const t = Date.now();
  const client = postgres(process.env.DATABASE_URL, {
    max: 10,
    idle_timeout: 30,
    connect_timeout: 10,
  });
  const db = drizzle(client, { schema });
  console.log(`[PERF] DB client created: ${Date.now() - t}ms`);
  return db;
}

export const db = global.__db ?? createDb();

if (process.env.NODE_ENV !== "production") {
  global.__db = db;
}

export * from "./schema";
