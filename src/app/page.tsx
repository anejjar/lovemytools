import Link from "next/link";
import { toolRegistry, getToolsByCategory } from "@/tools/_registry";
import type { ToolMeta, ToolCategory } from "@/types";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Free Developer Tools`,
  description: siteConfig.description,
};

const CATEGORY_META: Record<ToolCategory, { label: string; color: string; icon: string }> = {
  json: { label: "JSON", color: "#f59e0b", icon: "{ }" },
  encoding: { label: "Encoding", color: "#06b6d4", icon: "⇄" },
  css: { label: "CSS", color: "#3b82f6", icon: "✦" },
  color: { label: "Color", color: "#ec4899", icon: "◉" },
  text: { label: "Text", color: "#a855f7", icon: "T" },
  security: { label: "Security", color: "#22c55e", icon: "⚿" },
  numbers: { label: "Numbers", color: "#6366f1", icon: "#" },
  javascript: { label: "JavaScript", color: "#f97316", icon: "JS" },
  html: { label: "HTML", color: "#ef4444", icon: "<>" },
  network: { label: "Network", color: "#14b8a6", icon: "⬡" },
};

export default function HomePage() {
  const featured = toolRegistry.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 space-y-24">
      {/* Hero */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight text-[var(--text)] sm:text-6xl">
          Developer Tools,{" "}
          <span style={{ color: "var(--primary)" }}>Instant & Free</span>
        </h1>
        <p className="text-xl text-[var(--text2)]">
          50+ browser-based utilities. No sign-up, no ads, no data sent to servers.
          Format, convert, generate, and debug — all client-side.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/tools"
            className="rounded-xl px-6 py-3 text-base font-semibold text-white transition-colors"
            style={{ background: "var(--primary)" }}
          >
            Browse All Tools
          </Link>
          <Link
            href="/tools/json-formatter"
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-base font-medium text-[var(--text2)] transition-colors hover:text-[var(--text)]"
          >
            JSON Formatter
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text3)]">
          <span>✓ {toolRegistry.length} tools</span>
          <span>✓ No sign-up required</span>
          <span>✓ Works offline</span>
          <span>✓ Open source</span>
        </div>
      </section>

      {/* Featured tools */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-[var(--text)]">Most Popular Tools</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/tools"
            className="inline-block rounded-xl border border-[var(--border)] px-6 py-2.5 text-sm font-medium text-[var(--text2)] hover:text-[var(--text)] transition-colors"
          >
            View all {toolRegistry.length} tools →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-[var(--text)]">Browse by Category</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {(Object.entries(CATEGORY_META) as [ToolCategory, typeof CATEGORY_META[ToolCategory]][]).map(
            ([cat, meta]) => {
              const count = getToolsByCategory(cat).length;
              if (count === 0) return null;
              return (
                <Link
                  key={cat}
                  href={`/tools?category=${cat}`}
                  className="flex flex-col gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--border2)]"
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold"
                    style={{ background: `${meta.color}22`, color: meta.color }}
                  >
                    {meta.icon}
                  </span>
                  <span className="font-medium text-[var(--text)]">{meta.label}</span>
                  <span className="text-xs text-[var(--text3)]">{count} tool{count !== 1 ? "s" : ""}</span>
                </Link>
              );
            }
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-[var(--text)]">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {HOME_FAQS.map((faq, i) => (
            <details
              key={i}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 [&[open]>summary]:mb-3"
            >
              <summary className="cursor-pointer font-medium text-[var(--text)] list-none flex justify-between items-center">
                {faq.q}
                <span className="text-[var(--text3)] ml-3">+</span>
              </summary>
              <p className="text-sm leading-relaxed text-[var(--text2)]">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: HOME_FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}

function ToolCard({ tool }: { tool: ToolMeta }) {
  const catMeta = CATEGORY_META[tool.category];
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--border2)] hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold"
          style={{ background: `${catMeta?.color ?? "#6366f1"}22`, color: catMeta?.color ?? "#6366f1" }}
        >
          {catMeta?.icon ?? "#"}
        </span>
        <span
          className="rounded-md px-2 py-0.5 text-xs font-medium"
          style={{ background: `${catMeta?.color ?? "#6366f1"}22`, color: catMeta?.color ?? "#6366f1" }}
        >
          {catMeta?.label ?? tool.category}
        </span>
      </div>
      <div>
        <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
          {tool.name}
        </h3>
        <p className="mt-1 text-sm text-[var(--text2)] line-clamp-2">{tool.tagline}</p>
      </div>
    </Link>
  );
}

const HOME_FAQS = [
  {
    q: "Are these developer tools really free?",
    a: "Yes, completely free. No sign-up, no subscription, no ads. All tools run entirely in your browser.",
  },
  {
    q: "Is my data private when using these tools?",
    a: "Absolutely. All processing happens client-side in your browser. No data is sent to any server. Your input never leaves your device.",
  },
  {
    q: "Do these tools work offline?",
    a: "Once the page is loaded, most tools work offline since they don't need a server to process your data.",
  },
  {
    q: "How many developer tools are available?",
    a: `Currently ${toolRegistry.length} tools across 10 categories including JSON, encoding, color, security, text, and more. New tools are added regularly.`,
  },
  {
    q: "Can I use these tools on mobile?",
    a: "Yes, all tools are mobile-responsive and work on smartphones and tablets.",
  },
];
