"use client";

import { useState } from "react";
import { toRoman, fromRoman } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { useDebounce } from "@/hooks/use-debounce";

type Mode = "to-roman" | "from-roman";

export default function RomanNumeralTool() {
  const [mode, setMode] = useState<Mode>("to-roman");
  const [input, setInput] = useState("");
  const debounced = useDebounce(input, 200);

  const result = mode === "to-roman"
    ? toRoman(parseInt(debounced, 10))
    : fromRoman(debounced);

  const showResult = debounced.trim() && result.output;

  return (
    <div className="space-y-4">
      <div className="flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
        {(["to-roman", "from-roman"] as Mode[]).map((m) => (
          <button key={m} onClick={() => { setMode(m); setInput(""); }}
            className="flex-1 rounded-lg py-1.5 text-sm font-medium transition-all"
            style={{ background: mode === m ? "var(--primary)" : "transparent", color: mode === m ? "white" : "var(--text2)" }}>
            {m === "to-roman" ? "Arabic → Roman" : "Roman → Arabic"}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text2)]">
          {mode === "to-roman" ? "Arabic number (1–3999)" : "Roman numeral"}
        </label>
        <input
          type={mode === "to-roman" ? "number" : "text"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          min={mode === "to-roman" ? 1 : undefined}
          max={mode === "to-roman" ? 3999 : undefined}
          placeholder={mode === "to-roman" ? "2024" : "MMXXIV"}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-mono text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--primary)] transition-colors"
        />
      </div>

      {result.error && (
        <div className="rounded-lg bg-[var(--red-dim,#fee2e2)] px-4 py-2 text-sm text-[var(--red,#ef4444)]">{result.error}</div>
      )}

      {showResult && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center space-y-3">
          <p className="text-4xl font-bold tracking-widest text-[var(--text)]">{result.output}</p>
          <CopyButton text={result.output} />
        </div>
      )}

      {!debounced && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-medium text-[var(--text3)] mb-2">Quick reference</p>
          <div className="grid grid-cols-4 gap-1 text-xs font-mono">
            {[["I","1"],["V","5"],["X","10"],["L","50"],["C","100"],["D","500"],["M","1000"],["IV","4"],["IX","9"],["XL","40"],["XC","90"],["CD","400"]].map(([r, a]) => (
              <div key={r} className="flex justify-between px-2 py-1 rounded bg-[var(--surface2)]">
                <span className="text-[var(--primary)]">{r}</span>
                <span className="text-[var(--text3)]">{a}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
