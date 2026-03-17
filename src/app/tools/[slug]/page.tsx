import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolBySlug, getAllSlugs, getRelatedTools } from "@/tools/_registry";
import { getToolComponent } from "@/tools/_components";
import { generateToolMetadata, generateStructuredData } from "@/lib/metadata";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FeedbackWidget } from "@/components/shared/FeedbackWidget";
import { ToolTracker } from "@/components/shared/ToolTracker";
import { ExtensionCTABanner } from "@/components/tool/ExtensionCTABanner";

export const revalidate = 86400;

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = getToolBySlug(slug);
  if (!meta) return {};
  return generateToolMetadata(meta);
}

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

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const meta = getToolBySlug(slug);
  if (!meta) notFound();

  const ToolComponent = getToolComponent(slug);
  const relatedTools = getRelatedTools(slug);
  const structuredData = generateStructuredData(meta);
  const categoryColor = CAT_COLORS[meta.category] ?? "#6366f1";

  return (
    <>
      {/* JSON-LD */}
      {structuredData.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <div className="mx-auto max-w-5xl px-4 py-10 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-[var(--text3)]">
          <Link href="/" className="hover:text-[var(--text2)] transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/tools" className="hover:text-[var(--text2)] transition-colors">Tools</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[var(--text2)]">{meta.name}</span>
        </nav>

        {/* Hero */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span
              className="rounded-lg px-2.5 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: `${categoryColor}22`, color: categoryColor }}
            >
              {meta.category}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-[var(--text)]">{meta.name}</h1>
          <p className="text-xl text-[var(--text2)]">{meta.tagline}</p>
        </div>

        {/* Tool workspace */}
        <section
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
          aria-label="Tool workspace"
        >
          {ToolComponent ? (
            <ToolComponent />
          ) : (
            <p className="text-[var(--text3)]">Tool component not found.</p>
          )}
        </section>

        {/* About */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">About {meta.name}</h2>
          <p className="text-[var(--text2)] leading-relaxed">{meta.description}</p>
        </section>

        {/* How to use */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">How to Use</h2>
          <ol className="space-y-3">
            {meta.howToSteps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ background: `${categoryColor}22`, color: categoryColor }}
                >
                  {i + 1}
                </span>
                <span className="text-[var(--text2)] pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {meta.faqs.map((faq, i) => (
              <details
                key={i}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 [&[open]>summary]:mb-3"
              >
                <summary className="cursor-pointer font-medium text-[var(--text)] list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-[var(--text3)] ml-3 text-lg">+</span>
                </summary>
                <p className="text-sm leading-relaxed text-[var(--text2)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related tools */}
        {relatedTools.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--text)]">Related Tools</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {relatedTools.map((related) => {
                const color = CAT_COLORS[related.category] ?? "#6366f1";
                return (
                  <Link
                    key={related.slug}
                    href={`/tools/${related.slug}`}
                    className="group flex flex-col gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--border2)] hover:-translate-y-0.5"
                  >
                    <span
                      className="self-start rounded-md px-2 py-0.5 text-xs font-medium"
                      style={{ background: `${color}22`, color }}
                    >
                      {related.category}
                    </span>
                    <span className="font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                      {related.name}
                    </span>
                    <span className="text-sm text-[var(--text2)]">{related.tagline}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Extension CTA */}
        <ExtensionCTABanner />

        {/* Feedback */}
        <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-6">
          <FeedbackWidget slug={slug} />
          <p className="text-xs text-[var(--text3)]">
            Last updated: {new Date(meta.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
          </p>
        </div>
      </div>

      {/* Usage tracker (fires once on mount, renders nothing) */}
      <ToolTracker slug={slug} />
    </>
  );
}
