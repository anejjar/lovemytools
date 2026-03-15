"use client";

import { useState, useEffect } from "react";
import { formatCss } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";

type Indent = 2 | 4 | "tab";

export default function CssFormatterTool() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState<Indent>(2);
  const [result, setResult] = useState({ output: "", error: null as string | null });
  const debounced = useDebounce(input, 300);

  useEffect(() => { setResult(formatCss(debounced, indent)); }, [debounced, indent]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[var(--text2)]">Indentation:</span>
        {([2, 4, "tab"] as Indent[]).map((v) => (
          <button
            key={v}
            onClick={() => setIndent(v)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${indent === v ? "bg-[var(--primary)] text-white" : "bg-[var(--surface2)] text-[var(--text2)] hover:text-[var(--text)]"}`}
          >
            {v === "tab" ? "Tab" : `${v} spaces`}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Input CSS</label>
            <button onClick={() => setInput("")} className="text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors">Clear</button>
          </div>
          <CodeEditor value={input} onChange={setInput} placeholder={"body{color:red;margin:0}h1{font-size:2em}"} rows={18} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Formatted CSS</label>
            {result.output && <CopyButton text={result.output} />}
          </div>
          <CodeEditor value={result.output} readOnly rows={18} placeholder="Formatted CSS will appear here..." />
        </div>
      </div>
      {result.error && <div className="rounded-lg bg-[var(--red-dim,#fee2e2)] px-4 py-2 text-sm text-[var(--red,#ef4444)]">{result.error}</div>}
    </div>
  );
}
