"use client";

import { useState } from "react";
import { convertBytes, SI_BYTE_UNITS, BINARY_BYTE_UNITS, type ByteUnit } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { useDebounce } from "@/hooks/use-debounce";

const ALL_UNITS = [...SI_BYTE_UNITS.slice(1), ...BINARY_BYTE_UNITS.slice(1), "B" as ByteUnit];
const DISPLAY_UNITS: ByteUnit[] = ["B", "KB", "KiB", "MB", "MiB", "GB", "GiB", "TB", "TiB", "PB"];

export default function ByteConverterTool() {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState<ByteUnit>("MB");
  const debounced = useDebounce(value, 200);
  const { results, error } = convertBytes(debounced, unit);

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap items-end">
        <div className="space-y-1.5 flex-1 min-w-48">
          <label className="text-sm font-medium text-[var(--text2)]">Value</label>
          <input type="number" min={0} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter size..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--primary)] transition-colors" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[var(--text2)]">Unit</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value as ByteUnit)}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)]">
            {DISPLAY_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>

      {error && <div className="rounded-lg bg-[var(--red-dim,#fee2e2)] px-4 py-2 text-sm text-[var(--red,#ef4444)]">{error}</div>}

      {!error && results.B && (
        <>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text3)]">SI Units (powers of 1000)</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {SI_BYTE_UNITS.map((u) => (
                <div key={u} className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                  <div>
                    <div className="text-xs text-[var(--text3)]">{u}</div>
                    <div className="font-mono text-sm text-[var(--text)]">{results[u]}</div>
                  </div>
                  {results[u] && <CopyButton text={results[u]} label="" />}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text3)]">Binary Units (powers of 1024)</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {BINARY_BYTE_UNITS.map((u) => (
                <div key={u} className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                  <div>
                    <div className="text-xs text-[var(--text3)]">{u}</div>
                    <div className="font-mono text-sm text-[var(--text)]">{results[u]}</div>
                  </div>
                  {results[u] && <CopyButton text={results[u]} label="" />}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
