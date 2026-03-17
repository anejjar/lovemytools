"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { ToolMeta } from "@/types";

const CATEGORY_LABELS: Record<string, string> = {
  json: "JSON",
  encoding: "Encoding",
  css: "CSS",
  color: "Color",
  text: "Text",
  security: "Security",
  numbers: "Numbers",
  javascript: "JavaScript",
  html: "HTML",
  network: "Network / API",
};

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

export function ToolsClient({ tools }: { tools: ToolMeta[] }) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  const categories = useMemo(
    () => Array.from(new Set(tools.map((t) => t.category))),
    [tools]
  );

  const filtered = useMemo(() => {
    let result = tools;
    if (q) {
      const lower = q.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(lower) ||
          t.tagline.toLowerCase().includes(lower) ||
          t.keywords.some((k) => k.toLowerCase().includes(lower))
      );
    }
    if (category && category !== "all") {
      result = result.filter((t) => t.category === category);
    }
    return result;
  }, [tools, q, category]);

  return (
    <>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/tools"
          className="rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors"
          style={{
            borderColor: !category ? "var(--primary)" : "var(--border)",
            background: !category ? "var(--primary-dim)" : "var(--surface)",
            color: !category ? "var(--primary)" : "var(--text2)",
          }}
        >
          All ({tools.length})
        </Link>
        {categories.map((cat) => {
          const count = tools.filter((t) => t.category === cat).length;
          const active = category === cat;
          const color = CAT_COLORS[cat] ?? "#6366f1";
          return (
            <Link
              key={cat}
              href={`/tools?category=${cat}`}
              className="rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors"
              style={{
                borderColor: active ? color : "var(--border)",
                background: active ? `${color}22` : "var(--surface)",
                color: active ? color : "var(--text2)",
              }}
            >
              {CATEGORY_LABELS[cat] ?? cat} ({count})
            </Link>
          );
        })}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center space-y-2">
          <p className="text-[var(--text2)]">No tools found for &quot;{q}&quot;</p>
          <Link href="/tools" className="text-sm text-[var(--primary)] hover:underline">
            Clear search
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((tool) => {
            const color = CAT_COLORS[tool.category] ?? "#6366f1";
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--border2)] hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-md px-2 py-0.5 text-xs font-medium"
                    style={{ background: `${color}22`, color }}
                  >
                    {CATEGORY_LABELS[tool.category] ?? tool.category}
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                    {tool.name}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--text2)] line-clamp-2">{tool.tagline}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
