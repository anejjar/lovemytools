"use client";

import { useState, useEffect } from "react";
import { minifyCss } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";

export default function CssMinifierTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState({ output: "", error: null as string | null, originalSize: 0, minifiedSize: 0, savingsPercent: 0 });
  const debounced = useDebounce(input, 300);

  useEffect(() => { setResult(minifyCss(debounced)); }, [debounced]);

  const fmt = (n: number) => n >= 1024 ? `${(n / 1024).toFixed(1)} KB` : `${n} B`;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Input CSS</label>
            <button onClick={() => setInput("")} className="text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors">Clear</button>
          </div>
          <CodeEditor value={input} onChange={setInput} placeholder={"body {\n  margin: 0;\n  /* reset */\n  padding: 0;\n}"} rows={18} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Minified CSS</label>
            {result.output && <CopyButton text={result.output} />}
          </div>
          <CodeEditor value={result.output} readOnly rows={18} placeholder="Minified CSS will appear here..." />
        </div>
      </div>
      {result.error && <div className="rounded-lg bg-[var(--red-dim,#fee2e2)] px-4 py-2 text-sm text-[var(--red,#ef4444)]">{result.error}</div>}
      {result.output && !result.error && (
        <div className="flex flex-wrap gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm">
          <span className="text-[var(--text3)]">Original: <strong className="text-[var(--text)]">{fmt(result.originalSize)}</strong></span>
          <span className="text-[var(--text3)]">Minified: <strong className="text-[var(--text)]">{fmt(result.minifiedSize)}</strong></span>
          <span className="text-[var(--text3)]">Saved: <strong className="text-[var(--green,#22c55e)]">{result.savingsPercent}%</strong></span>
        </div>
      )}
    </div>
  );
}
