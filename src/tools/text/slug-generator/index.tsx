"use client";

import { useState } from "react";
import { generateSlug, isValidSlug } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { useDebounce } from "@/hooks/use-debounce";

export default function SlugGeneratorTool() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState<"-" | "_">("-");
  const [maxLength, setMaxLength] = useState(0);

  const debounced = useDebounce(input, 200);
  const slug = generateSlug(debounced, { separator, maxLength: maxLength || undefined });
  const valid = slug ? isValidSlug(slug) : null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text2)]">Page title or phrase</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="My Amazing Blog Post Title!"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--primary)] transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--text2)]">Separator:</span>
          {(["-", "_"] as const).map((s) => (
            <button key={s} onClick={() => setSeparator(s)}
              className="rounded-lg border px-3 py-1 text-sm font-mono transition-all"
              style={{ borderColor: separator === s ? "var(--primary)" : "var(--border)", background: separator === s ? "var(--primary-dim,#e0e7ff)" : "var(--surface)", color: separator === s ? "var(--primary)" : "var(--text2)" }}>
              {s === "-" ? "Hyphen (-)" : "Underscore (_)"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--text2)]">Max length:</span>
          <input type="number" min={0} max={200} value={maxLength || ""} onChange={(e) => setMaxLength(Number(e.target.value))}
            placeholder="None"
            className="w-20 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)]" />
        </div>
      </div>

      {slug && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-[var(--text2)]">Generated slug</label>
              {valid !== null && (
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: valid ? "var(--green-dim,#dcfce7)" : "var(--red-dim,#fee2e2)", color: valid ? "var(--green,#22c55e)" : "var(--red,#ef4444)" }}>
                  {valid ? "Valid" : "Invalid"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--text3)]">{slug.length} chars</span>
              <CopyButton text={slug} />
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-mono text-sm text-[var(--text)] break-all">
            {slug}
          </div>
        </div>
      )}
    </div>
  );
}
