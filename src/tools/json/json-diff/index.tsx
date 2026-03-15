"use client";

import { useState, useMemo } from "react";
import { diffJson } from "./logic";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";

export default function JsonDiffTool() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const dLeft = useDebounce(left, 400);
  const dRight = useDebounce(right, 400);

  const result = useMemo(() => diffJson(dLeft, dRight), [dLeft, dRight]);

  const showDiff = dLeft.trim() || dRight.trim();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Original JSON (left)</label>
          <CodeEditor value={left} onChange={setLeft} placeholder={'{\n  "name": "Alice",\n  "age": 30\n}'} rows={14} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Modified JSON (right)</label>
          <CodeEditor value={right} onChange={setRight} placeholder={'{\n  "name": "Alice",\n  "age": 31\n}'} rows={14} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => { setLeft(""); setRight(""); }}
          className="text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors"
        >
          Clear both
        </button>
      </div>

      {showDiff && (
        <div className="space-y-3">
          {result.error ? (
            <div className="rounded-lg bg-[var(--red-dim,#fee2e2)] px-4 py-2 text-sm text-[var(--red,#ef4444)]">
              {result.error}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium text-[var(--text)]">Diff Result</span>
                {result.additions > 0 && (
                  <span className="text-[var(--green,#22c55e)]">+{result.additions} additions</span>
                )}
                {result.deletions > 0 && (
                  <span className="text-[var(--red,#ef4444)]">−{result.deletions} deletions</span>
                )}
                {result.additions === 0 && result.deletions === 0 && (
                  <span className="text-[var(--text3)]">No differences</span>
                )}
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-auto font-mono text-xs leading-5 max-h-96">
                {result.diff.map((line, i) => (
                  <div
                    key={i}
                    className="px-4 py-0.5 whitespace-pre"
                    style={{
                      background: line.added
                        ? "rgba(34,197,94,0.1)"
                        : line.removed
                        ? "rgba(239,68,68,0.1)"
                        : "transparent",
                      color: line.added
                        ? "var(--green,#22c55e)"
                        : line.removed
                        ? "var(--red,#ef4444)"
                        : "var(--text2)",
                    }}
                  >
                    {line.added ? "+ " : line.removed ? "- " : "  "}
                    {line.value}
                  </div>
                ))}
                {result.diff.length === 0 && (
                  <div className="px-4 py-4 text-center text-[var(--text3)]">JSONs are identical</div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
