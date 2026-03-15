"use client";

import { useState } from "react";
import { generateMetaTags, descriptionLength, defaultOptions } from "./logic";
import type { MetaTagOptions } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { CodeEditor } from "@/components/shared/CodeEditor";

function Field({ label, value, onChange, placeholder, hint }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-[var(--text2)]">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
      {hint && <p className="text-xs text-[var(--text3)]">{hint}</p>}
    </div>
  );
}

export default function MetaTagGeneratorTool() {
  const [opts, setOpts] = useState<MetaTagOptions>(defaultOptions());
  const set = <K extends keyof MetaTagOptions>(k: K, v: MetaTagOptions[K]) => setOpts((o) => ({ ...o, [k]: v }));

  const output = generateMetaTags(opts);
  const descStatus = descriptionLength(opts.description);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text3)]">Basic SEO</p>
          <Field label="Title" value={opts.title} onChange={(v) => set("title", v)} placeholder="My Awesome Page" hint="50–60 characters recommended" />
          <div className="space-y-1">
            <label className="text-sm font-medium text-[var(--text2)]">Description</label>
            <textarea value={opts.description} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="A brief description of the page content..." className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none" />
            <p className={`text-xs ${descStatus.status === "good" ? "text-green-600" : descStatus.status === "long" ? "text-red-500" : "text-[var(--text3)]"}`}>
              {descStatus.length} chars — {descStatus.status === "good" ? "Good length" : descStatus.status === "long" ? "Too long (> 160)" : "Too short (< 120)"}
            </p>
          </div>
          <Field label="Keywords" value={opts.keywords} onChange={(v) => set("keywords", v)} placeholder="seo, tools, web" />
          <Field label="Author" value={opts.author} onChange={(v) => set("author", v)} placeholder="Jane Doe" />
          <Field label="Canonical URL" value={opts.canonical} onChange={(v) => set("canonical", v)} placeholder="https://example.com/page" />
          <Field label="Robots" value={opts.robots} onChange={(v) => set("robots", v)} placeholder="index, follow" />
          <Field label="Theme Color" value={opts.themeColor} onChange={(v) => set("themeColor", v)} placeholder="#6366f1" />

          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text3)] pt-2">Open Graph</p>
          <Field label="OG Title" value={opts.ogTitle} onChange={(v) => set("ogTitle", v)} placeholder="Page title for social sharing" />
          <Field label="OG Description" value={opts.ogDescription} onChange={(v) => set("ogDescription", v)} placeholder="Description for social sharing" />
          <Field label="OG Image URL" value={opts.ogImage} onChange={(v) => set("ogImage", v)} placeholder="https://example.com/image.png" />
          <Field label="OG URL" value={opts.ogUrl} onChange={(v) => set("ogUrl", v)} placeholder="https://example.com/page" />

          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text3)] pt-2">Twitter Card</p>
          <Field label="Twitter Site (@handle)" value={opts.twitterSite} onChange={(v) => set("twitterSite", v)} placeholder="@mysite" />
          <Field label="Twitter Creator (@handle)" value={opts.twitterCreator} onChange={(v) => set("twitterCreator", v)} placeholder="@author" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Generated Tags</label>
            {output && <CopyButton text={output} />}
          </div>
          <CodeEditor value={output} readOnly rows={32} placeholder="Fill in the fields to generate meta tags..." />
        </div>
      </div>
    </div>
  );
}
