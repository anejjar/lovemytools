"use client";

import { useState } from "react";
import { convertCase, CASE_TYPES, type CaseType } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";

export default function CaseConverterTool() {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<CaseType>("camel");

  const output = convertCase(input, selected);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-[var(--text2)]">Input text</label>
          {input && <button onClick={() => setInput("")} className="text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors">Clear</button>}
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="hello world, helloWorld, hello_world..."
          rows={4}
          className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--primary)] transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {CASE_TYPES.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => setSelected(type)}
            className="rounded-lg border px-3 py-1.5 text-sm font-mono transition-all"
            style={{
              borderColor: selected === type ? "var(--primary)" : "var(--border)",
              background: selected === type ? "var(--primary-dim,#e0e7ff)" : "var(--surface)",
              color: selected === type ? "var(--primary)" : "var(--text2)",
              fontWeight: selected === type ? 600 : 400,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Output</label>
            <CopyButton text={output} />
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm text-[var(--text)] break-all">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
