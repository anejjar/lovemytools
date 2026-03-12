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
    <div className="space-y-24">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg2)] px-6 py-10 sm:px-10 sm:py-14">
        {/* <div className="pointer-events-none absolute inset-y-0 right-[-10%] w-1/2 bg-[radial-gradient(circle_at_top,_rgba(226,60,60,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(37,99,235,0.12),_transparent_55%)]" /> */}
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="max-w-xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface2)] px-3 py-1 text-xs font-medium text-[var(--text2)]">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              {toolRegistry.length}+ free, browser-based developer tools
            </span>
            <div className="space-y-3">
              <h1 className="font-semibold tracking-tight text-[var(--text)] text-4xl sm:text-5xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                Ship faster with calm,
                <br />
                clutter-free developer tools.
              </h1>
              <p className="text-base sm:text-lg text-[var(--text2)] leading-relaxed">
                Format, convert, debug, and generate without tabs of noisy UIs. Lovemytools brings
                50+ focused utilities into a single, clean workspace — no accounts, no ads, and no
                data ever leaves your browser.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--primary-light)]"
              >
                Browse all tools
              </Link>
              <Link
                href="/tools/json-formatter"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text2)] hover:text-[var(--text)]"
              >
                Try JSON formatter
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[var(--text3)]">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--primary-dim)] text-[10px] text-[var(--primary)]">
                  ✓
                </span>
                <span>No sign-up, no ads</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--primary-dim)] text-[10px] text-[var(--primary)]">
                  ✓
                </span>
                <span>All tools run in your browser</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--primary-dim)] text-[10px] text-[var(--primary)]">
                  ✓
                </span>
                <span>Open source & offline friendly</span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm lg:ml-auto">
            <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text3)]">
                    Lovemytools · Snapshot
                  </p>
                  <p className="mt-1 text-xs text-[var(--text2)]">A calm list of everyday tools.</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-[var(--primary-dim)] px-2 py-1 text-[10px] font-medium text-[var(--primary)]">
                  All tools
                </span>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-[var(--bg3)] px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[var(--primary-dim)] text-[11px] text-[var(--primary)]">
                      {`{}`}
                    </span>
                    <div>
                      <p className="text-xs font-medium text-[var(--text)]">JSON Formatter</p>
                      <p className="text-[11px] text-[var(--text3)]">Format & validate safely.</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] text-[var(--text3)]">
                    JSON
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[var(--green-dim)] text-[11px] text-[var(--green)]">
                      ●
                    </span>
                    <div>
                      <p className="text-xs font-medium text-[var(--text)]">Password Generator</p>
                      <p className="text-[11px] text-[var(--text3)]">Strong, shareable passwords.</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] text-[var(--text3)]">
                    Security
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[var(--blue-dim)] text-[11px] text-[var(--blue)]">
                      ◯
                    </span>
                    <div>
                      <p className="text-xs font-medium text-[var(--text)]">Color Converter</p>
                      <p className="text-[11px] text-[var(--text3)]">HEX, RGB, HSL in sync.</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] text-[var(--text3)]">
                    Color
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[var(--amber-dim)] text-[11px] text-[var(--amber)]">
                      #
                    </span>
                    <div>
                      <p className="text-xs font-medium text-[var(--text)]">Unix Timestamp</p>
                      <p className="text-[11px] text-[var(--text3)]">Human time, one click away.</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] text-[var(--text3)]">
                    Numbers
                  </span>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-[var(--text3)]">
                Runs entirely in your browser. No data ever leaves this page.
              </p>

              <span className="pointer-events-none absolute -right-2 top-6 inline-flex items-center rounded-full bg-[var(--primary)] px-3 py-1 text-[10px] font-medium text-white shadow-sm">
                No sign-up needed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured tools */}
      <section className="space-y-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
            Most-used developer tools
          </h2>
          <p className="text-sm text-[var(--text2)] max-w-2xl">
            A curated set of everyday utilities your team reaches for first — all fast, focused, and
            distraction-free.
          </p>
        </div>
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
      <section className="space-y-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
            Browse by category
          </h2>
          <p className="text-sm text-[var(--text2)] max-w-2xl">
            Move from JSON to color to security helpers without switching context. Each category
            stays small and purposeful.
          </p>
        </div>
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
                  <span className="font-medium text-[var(--text)] text-sm">{meta.label}</span>
                  <span className="text-xs text-[var(--text3)]">
                    {count} tool{count !== 1 ? "s" : ""}
                  </span>
                </Link>
              );
            }
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
            Frequently asked questions
          </h2>
          <p className="text-sm text-[var(--text2)]">
            A quick overview of how Lovemytools works, how we treat your data, and what to expect.
          </p>
        </div>
        <div className="space-y-3">
          {HOME_FAQS.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 open:bg-[var(--bg2)]"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-[var(--text)] font-medium">
                <span>{faq.q}</span>
                <span className="text-[var(--text3)] text-xs">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text2)]">{faq.a}</p>
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
      className="group flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-[var(--border2)]"
    >
      <div className="flex items-start justify-between">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold"
          style={{ background: `${catMeta?.color ?? "#6366f1"}22`, color: catMeta?.color ?? "#6366f1" }}
        >
          {catMeta?.icon ?? "#"}
        </span>
        <span
          className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
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
