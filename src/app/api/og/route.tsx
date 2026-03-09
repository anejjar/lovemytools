import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { getToolBySlug } from "@/tools/_registry";

export const runtime = "edge";

const CAT_COLORS: Record<string, string> = {
  json: "#f59e0b",
  encoding: "#06b6d4",
  css: "#3b82f6",
  color: "#ec4899",
  text: "#a855f7",
  security: "#22c55e",
  numbers: "#6366f1",
  javascript: "#f97316",
  html: "#ef4444",
  network: "#14b8a6",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const meta = slug ? getToolBySlug(slug) : null;

  const name = meta?.name ?? "DevTools";
  const tagline = meta?.tagline ?? "Free developer tools for everyone";
  const category = meta?.category ?? "";
  const color = CAT_COLORS[category] ?? "#6366f1";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
          background: "#0a0a0f",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(ellipse at top left, ${color}20 0%, transparent 60%)`,
          }}
        />

        {/* Category badge */}
        {category && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                background: `${color}22`,
                color,
                padding: "6px 16px",
                borderRadius: 8,
                fontSize: 18,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {category}
            </div>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#e8e8f0",
            lineHeight: 1.1,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          {name}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#9090b0",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {tagline}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 60,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              background: "#6366f1",
              width: 40,
              height: 40,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            ⚡
          </div>
          <div
            style={{ fontSize: 22, fontWeight: 700, color: "#e8e8f0" }}
          >
            DevTools
          </div>
          <div style={{ fontSize: 18, color: "#5a5a7a", marginLeft: 8 }}>
            · Free · No sign-up · Browser-based
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
