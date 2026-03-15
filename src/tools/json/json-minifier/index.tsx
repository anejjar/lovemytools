"use client";

import { useState, useEffect } from "react";
import { minifyJson, minifyJsonStats } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";

export default function JsonMinifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const debounced = useDebounce(input, 300);

  useEffect(() => {
    if (!debounced.trim()) { setOutput(""); setError(null); return; }
    const r = minifyJson(debounced);
    setOutput(r.output);
    setError(r.error);
  }, [debounced]);

  const stats = output ? minifyJsonStats(input, output) : null;

  const fmt = (n: number) =>
    n >= 1024 ? `${(n / 1024).toFixed(1)} KB` : `${n} B`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-[var(--text2)]">Paste JSON to minify</h2>
        <button
          onClick={() => { setInput(""); setOutput(""); setError(null); }}
          className="text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Input JSON</label>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder={'{\n  "example": "value"\n}'}
            rows={18}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Minified Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <CodeEditor
            value={output}
            readOnly
            rows={18}
            placeholder="Minified JSON will appear here..."
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-[var(--red-dim,#fee2e2)] px-4 py-2 text-sm text-[var(--red,#ef4444)]">
          {error}
        </div>
      )}

      {stats && !error && (
        <div className="flex flex-wrap gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm">
          <span className="text-[var(--text3)]">Original: <strong className="text-[var(--text)]">{fmt(stats.originalSize)}</strong></span>
          <span className="text-[var(--text3)]">Minified: <strong className="text-[var(--text)]">{fmt(stats.minifiedSize)}</strong></span>
          <span className="text-[var(--text3)]">Saved: <strong className="text-[var(--green,#22c55e)]">{fmt(stats.savings)} ({stats.savingsPercent}%)</strong></span>
        </div>
      )}
    </div>
  );
}
