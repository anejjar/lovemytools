"use client";

import { useState } from "react";
import { convertUnit, DEFAULT_CONTEXT } from "./logic";
import type { CssUnit, ConversionContext } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";

const UNITS: CssUnit[] = ["px", "rem", "em", "%", "vw", "vh", "pt", "pc", "cm", "mm", "in"];

export default function CssUnitConverterTool() {
  const [value, setValue] = useState("16");
  const [fromUnit, setFromUnit] = useState<CssUnit>("px");
  const [ctx, setCtx] = useState<ConversionContext>(DEFAULT_CONTEXT);

  const num = parseFloat(value) || 0;
  const results = convertUnit(num, fromUnit, ctx);

  const updateCtx = (key: keyof ConversionContext, val: string) => {
    const n = parseFloat(val);
    if (!isNaN(n) && n > 0) setCtx((c) => ({ ...c, [key]: n }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--text3)]">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-32 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--text3)]">From unit</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as CssUnit)}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-4 space-y-2">
        <p className="text-xs font-semibold text-[var(--text3)] uppercase tracking-wider mb-3">Context Settings</p>
        <div className="flex flex-wrap gap-4">
          {([["baseFontSize", "Base font size (px)"], ["parentFontSize", "Parent font size (px)"], ["viewportWidth", "Viewport width (px)"], ["viewportHeight", "Viewport height (px)"], ["parentSize", "Parent element size (px)"]] as [keyof ConversionContext, string][]).map(([key, label]) => (
            <div key={key} className="space-y-1">
              <label className="text-xs text-[var(--text3)]">{label}</label>
              <input
                type="number"
                defaultValue={ctx[key]}
                onChange={(e) => updateCtx(key, e.target.value)}
                className="w-36 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--surface2)]">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-[var(--text2)]">Unit</th>
              <th className="px-4 py-2 text-left font-medium text-[var(--text2)]">Value</th>
              <th className="px-4 py-2 text-right font-medium text-[var(--text2)]">CSS</th>
              <th className="px-4 py-2 w-12" />
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={r.unit} className={`border-t border-[var(--border)] ${r.unit === fromUnit ? "bg-[var(--primary)]/5" : i % 2 === 0 ? "" : "bg-[var(--surface2)]/40"}`}>
                <td className="px-4 py-2.5 font-mono font-semibold text-[var(--primary)]">{r.unit}</td>
                <td className="px-4 py-2.5 text-[var(--text)]">{parseFloat(r.value.toFixed(4))}</td>
                <td className="px-4 py-2.5 font-mono text-[var(--text2)] text-right">{r.formatted}</td>
                <td className="px-4 py-2.5 text-right"><CopyButton text={r.formatted} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
