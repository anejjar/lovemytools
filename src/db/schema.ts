import {
  pgTable,
  text,
  uuid,
  timestamp,
  smallint,
} from "drizzle-orm/pg-core";

export const tools = pgTable("tools", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const toolUsage = pgTable("tool_usage", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull(),
  sessionId: text("session_id"),
  usedAt: timestamp("used_at").defaultNow(),
});

export const toolFeedback = pgTable("tool_feedback", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull(),
  rating: smallint("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pageViews = pgTable("page_views", {
  id: uuid("id").primaryKey().defaultRandom(),
  path: text("path").notNull(),
  referrer: text("referrer"),
  viewedAt: timestamp("viewed_at").defaultNow(),
});
