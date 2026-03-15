"use client";

import { useState } from "react";
import { convertBase, formatBinary, BASE_LABELS, type Base } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { useDebounce } from "@/hooks/use-debounce";

const BASES: Base[] = [10, 2, 16, 8];

export default function NumberBaseConverterTool() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState<Base>(10);
  const debounced = useDebounce(input, 200);
  const result = convertBase(debounced, fromBase);

  const outputs = [
    { label: "Binary (Base 2)", value: result.binary, formatted: result.binary ? formatBinary(result.binary) : "" },
    { label: "Octal (Base 8)", value: result.octal, formatted: result.octal },
    { label: "Decimal (Base 10)", value: result.decimal, formatted: result.decimal },
    { label: "Hexadecimal (Base 16)", value: result.hex, formatted: result.hex },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1.5 flex-1 min-w-48">
          <label className="text-sm font-medium text-[var(--text2)]">Input number</label>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={fromBase === 2 ? "1010" : fromBase === 16 ? "FF" : fromBase === 8 ? "17" : "255"}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-mono text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--primary)] transition-colors" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[var(--text2)]">Input base</label>
          <div className="flex gap-1">
            {BASES.map((b) => (
              <button key={b} onClick={() => { setFromBase(b); setInput(""); }}
                className="rounded-lg border px-3 py-2.5 text-sm font-medium transition-all"
                style={{ borderColor: fromBase === b ? "var(--primary)" : "var(--border)", background: fromBase === b ? "var(--primary-dim,#e0e7ff)" : "var(--surface)", color: fromBase === b ? "var(--primary)" : "var(--text2)" }}>
                {b === 2 ? "Bin" : b === 8 ? "Oct" : b === 10 ? "Dec" : "Hex"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {result.error && <div className="rounded-lg bg-[var(--red-dim,#fee2e2)] px-4 py-2 text-sm text-[var(--red,#ef4444)]">{result.error}</div>}

      {!result.error && result.decimal && (
        <div className="grid gap-3 sm:grid-cols-2">
          {outputs.map(({ label, value, formatted }) => (
            <div key={label} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--text3)]">{label}</span>
                {value && <CopyButton text={value} label="Copy" />}
              </div>
              <p className="font-mono text-sm text-[var(--text)] break-all">{formatted || value || "—"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
