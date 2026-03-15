"use client";

import { useState, useEffect } from "react";
import { minifyJs } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";

export default function JsMinifierTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState({ output: "", originalSize: 0, minifiedSize: 0, savings: 0, savingsPercent: 0, error: null as string | null });
  const debounced = useDebounce(input, 300);

  useEffect(() => { setResult(minifyJs(debounced)); }, [debounced]);

  return (
    <div className="space-y-4">
      {result.originalSize > 0 && (
        <div className="flex flex-wrap gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm">
          {[
            ["Original", `${result.originalSize} B`],
            ["Minified", `${result.minifiedSize} B`],
            ["Saved", `${result.savings} B`],
            ["Reduction", `${result.savingsPercent}%`],
          ].map(([label, val]) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[var(--text3)]">{label}:</span>
              <span className="font-semibold text-[var(--text)]">{val}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">JavaScript Input</label>
            <button onClick={() => setInput("")} className="text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors">Clear</button>
          </div>
          <CodeEditor value={input} onChange={setInput} placeholder={"function hello() {\n  // greeting\n  return 'Hello, world!';\n}"} rows={18} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Minified Output</label>
            {result.output && <CopyButton text={result.output} />}
          </div>
          <CodeEditor value={result.output} readOnly rows={18} placeholder="Minified JavaScript will appear here..." />
        </div>
      </div>
      {result.error && <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{result.error}</div>}
    </div>
  );
}
