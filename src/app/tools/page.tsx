import Link from "next/link";
import { toolRegistry, searchTools, getToolsByCategory } from "@/tools/_registry";
import type { ToolMeta, ToolCategory } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Developer Tools",
  description:
    "Browse 50+ free online developer tools. JSON formatters, encoders, color tools, security utilities, and more. No sign-up required.",
};

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

interface ToolsPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const { q, category } = await searchParams;

  let tools = q ? searchTools(q) : toolRegistry;
  if (category && category !== "all") {
    tools = tools.filter((t) => t.category === category);
  }

  const categories = Array.from(new Set(toolRegistry.map((t) => t.category)));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-[var(--text)]">Developer Tools</h1>
        <p className="text-[var(--text2)]">
          {toolRegistry.length} free tools. No sign-up required.
        </p>
      </div>

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
          All ({toolRegistry.length})
        </Link>
        {categories.map((cat) => {
          const count = getToolsByCategory(cat).length;
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

      {tools.length === 0 ? (
        <div className="py-16 text-center space-y-2">
          <p className="text-[var(--text2)]">No tools found for &quot;{q}&quot;</p>
          <Link href="/tools" className="text-sm text-[var(--primary)] hover:underline">
            Clear search
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}

function ToolCard({ tool }: { tool: ToolMeta }) {
  const color = CAT_COLORS[tool.category] ?? "#6366f1";
  return (
    <Link
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
}
