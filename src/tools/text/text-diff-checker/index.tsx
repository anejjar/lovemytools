"use client";

import { useState, useMemo } from "react";
import { diffText } from "./logic";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";

type DiffMode = "lines" | "words";

export default function TextDiffCheckerTool() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [mode, setMode] = useState<DiffMode>("lines");

  const dLeft = useDebounce(left, 400);
  const dRight = useDebounce(right, 400);
  const result = useMemo(() => diffText(dLeft, dRight, mode), [dLeft, dRight, mode]);
  const showDiff = dLeft || dRight;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
          {(["lines", "words"] as DiffMode[]).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-all capitalize"
              style={{ background: mode === m ? "var(--primary)" : "transparent", color: mode === m ? "white" : "var(--text2)" }}>
              {m === "lines" ? "Line diff" : "Word diff"}
            </button>
          ))}
        </div>
        <button onClick={() => { setLeft(""); setRight(""); }} className="ml-auto text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors">Clear both</button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Original text</label>
          <CodeEditor value={left} onChange={setLeft} placeholder={"The quick brown fox\njumps over the lazy dog"} rows={12} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Modified text</label>
          <CodeEditor value={right} onChange={setRight} placeholder={"The quick red fox\njumps over the lazy cat"} rows={12} />
        </div>
      </div>

      {showDiff && (
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm">
            <span className="font-medium text-[var(--text)]">Diff</span>
            {result.additions > 0 && <span className="text-[var(--green,#22c55e)]">+{result.additions} added</span>}
            {result.deletions > 0 && <span className="text-[var(--red,#ef4444)]">−{result.deletions} removed</span>}
            {result.additions === 0 && result.deletions === 0 && <span className="text-[var(--text3)]">No differences</span>}
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-auto font-mono text-xs leading-6 max-h-80">
            {result.lines.map((line, i) => (
              <div key={i} className="px-4 whitespace-pre-wrap"
                style={{
                  background: line.added ? "rgba(34,197,94,0.1)" : line.removed ? "rgba(239,68,68,0.1)" : "transparent",
                  color: line.added ? "var(--green,#22c55e)" : line.removed ? "var(--red,#ef4444)" : "var(--text2)",
                }}>
                {line.added ? "+ " : line.removed ? "- " : "  "}{line.value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
