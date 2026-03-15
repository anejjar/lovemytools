"use client";

import { useState } from "react";
import { parseCron, PRESETS } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";

const FIELDS = ["Minute", "Hour", "Day", "Month", "Weekday"] as const;

export default function CronGeneratorTool() {
  const [expr, setExpr] = useState("0 9 * * 1-5");
  const result = parseCron(expr);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text2)]">Cron Expression</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            placeholder="* * * * *"
            className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm font-mono text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <CopyButton text={expr} />
        </div>
        <div className="flex gap-4 text-xs text-[var(--text3)] px-1">
          {FIELDS.map((f) => <span key={f}>{f}</span>)}
        </div>
      </div>

      {/* Error / Description */}
      {result.error ? (
        <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{result.error}</div>
      ) : (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text3)] mb-1">Description</p>
          <p className="text-sm text-[var(--text)]">{result.description}</p>
        </div>
      )}

      {/* Next runs */}
      {result.nextRuns.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--text2)]">Next 5 Run Times</p>
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            {result.nextRuns.map((dt, i) => (
              <div key={i} className={`flex items-center justify-between px-4 py-2.5 text-sm ${i > 0 ? "border-t border-[var(--border)]" : ""} ${i % 2 === 0 ? "" : "bg-[var(--surface2)]/40"}`}>
                <span className="text-[var(--text3)] w-6">{i + 1}.</span>
                <span className="flex-1 font-mono text-[var(--text)]">{dt.toLocaleString()}</span>
                <CopyButton text={dt.toISOString()} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Presets */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-[var(--text2)]">Common Presets</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {PRESETS.map((p) => (
            <button
              key={p.expr}
              onClick={() => setExpr(p.expr)}
              className={`rounded-xl border px-4 py-3 text-left transition-colors ${expr === p.expr ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-[var(--border)] bg-[var(--surface2)] hover:border-[var(--border2)]"}`}
            >
              <p className="text-sm font-medium text-[var(--text)]">{p.label}</p>
              <p className="font-mono text-xs text-[var(--text3)] mt-0.5">{p.expr}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
