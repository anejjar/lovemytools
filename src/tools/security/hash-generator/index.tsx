"use client";

import { useState } from "react";
import { generateHash, ALGORITHMS, HASH_LENGTHS, type HashAlgorithm } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { useDebounce } from "@/hooks/use-debounce";

export default function HashGeneratorTool() {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<HashAlgorithm>("SHA256");
  const debounced = useDebounce(input, 200);
  const result = generateHash(debounced, selected);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-[var(--text2)]">Input text</label>
          {input && <button onClick={() => setInput("")} className="text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors">Clear</button>}
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text to hash..." rows={5}
          className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--primary)] transition-colors" />
      </div>

      <div className="flex flex-wrap gap-2">
        {ALGORITHMS.map((alg) => (
          <button key={alg} onClick={() => setSelected(alg)}
            className="rounded-lg border px-3 py-1.5 text-sm font-mono font-medium transition-all"
            style={{ borderColor: selected === alg ? "var(--primary)" : "var(--border)", background: selected === alg ? "var(--primary-dim,#e0e7ff)" : "var(--surface)", color: selected === alg ? "var(--primary)" : "var(--text2)" }}>
            {alg}
          </button>
        ))}
      </div>

      {result.hash && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">{selected} hash <span className="text-[var(--text3)] font-normal">({HASH_LENGTHS[selected]} chars)</span></label>
            <CopyButton text={result.hash} />
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm text-[var(--text)] break-all">{result.hash}</div>
        </div>
      )}

      {!input && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center text-sm text-[var(--text3)]">
          Type something above to generate its hash
        </div>
      )}
    </div>
  );
}
