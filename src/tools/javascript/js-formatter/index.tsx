"use client";

import { useState, useEffect } from "react";
import { formatJs } from "./logic";
import type { IndentStyle } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";

export default function JsFormatterTool() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState<IndentStyle>(2);
  const [result, setResult] = useState({ output: "", error: null as string | null });
  const debounced = useDebounce(input, 300);

  useEffect(() => { setResult(formatJs(debounced, indent)); }, [debounced, indent]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[var(--text2)]">Indentation:</span>
        {([2, 4, "tab"] as IndentStyle[]).map((v) => (
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
            <label className="text-sm font-medium text-[var(--text2)]">Input JS</label>
            <button onClick={() => setInput("")} className="text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors">Clear</button>
          </div>
          <CodeEditor value={input} onChange={setInput} placeholder={"function hello(){return 'world';}"} rows={18} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Formatted JS</label>
            {result.output && <CopyButton text={result.output} />}
          </div>
          <CodeEditor value={result.output} readOnly rows={18} placeholder="Formatted JavaScript will appear here..." />
        </div>
      </div>
      {result.error && <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{result.error}</div>}
    </div>
  );
}
