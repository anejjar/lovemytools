"use client";

import { useState } from "react";
import { evaluateContrast } from "./logic";
import type { WcagLevel } from "./logic";
import { ColorPickerField } from "@/components/shared/ColorPickerField";

function Badge({ level }: { level: WcagLevel }) {
  const pass = level !== "Fail";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${pass ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
      {pass ? "✓" : "✗"} {level}
    </span>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const hex = /^#[0-9A-Fa-f]{6}$/.test(value) ? value : /^[0-9A-Fa-f]{6}$/.test(value) ? `#${value}` : "#000000";
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-[var(--text2)]">{label}</label>
      <div className="flex items-center gap-3">
        <ColorPickerField value={hex} onChange={onChange} />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} maxLength={7} placeholder="#000000" className="w-32 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-sm font-mono text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
      </div>
    </div>
  );
}

export default function ContrastCheckerTool() {
  const [fg, setFg] = useState("#1e1e2e");
  const [bg, setBg] = useState("#ffffff");

  const result = evaluateContrast(fg, bg);

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="rounded-xl border border-[var(--border)] overflow-hidden">
        <div className="p-8 space-y-3" style={{ background: bg, color: fg }}>
          <p className="text-2xl font-bold">The quick brown fox jumps over the lazy dog</p>
          <p className="text-base">Normal text (18px) — used for WCAG AA/AAA normal text evaluation.</p>
          <p className="text-sm">Small text sample for readability reference.</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="flex flex-wrap gap-6">
        <ColorInput label="Foreground (text)" value={fg} onChange={setFg} />
        <ColorInput label="Background" value={bg} onChange={setBg} />
      </div>

      {/* Results */}
      {result ? (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <div className="bg-[var(--surface2)] px-4 py-3 flex items-center gap-3">
            <span className="text-3xl font-bold text-[var(--text)]">{result.ratio}:1</span>
            <span className="text-sm text-[var(--text3)]">contrast ratio</span>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-[var(--surface2)]/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-[var(--text2)]">Context</th>
                <th className="px-4 py-2 text-left font-medium text-[var(--text2)]">Required</th>
                <th className="px-4 py-2 text-left font-medium text-[var(--text2)]">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--border)]">
                <td className="px-4 py-3 text-[var(--text)]">Normal text (&lt;18px)</td>
                <td className="px-4 py-3 text-[var(--text3)]">4.5:1 (AA) / 7:1 (AAA)</td>
                <td className="px-4 py-3"><Badge level={result.normalText} /></td>
              </tr>
              <tr className="border-t border-[var(--border)]">
                <td className="px-4 py-3 text-[var(--text)]">Large text (18px+ or 14px bold)</td>
                <td className="px-4 py-3 text-[var(--text3)]">3:1 (AA) / 4.5:1 (AAA)</td>
                <td className="px-4 py-3"><Badge level={result.largeText} /></td>
              </tr>
              <tr className="border-t border-[var(--border)]">
                <td className="px-4 py-3 text-[var(--text)]">UI components & graphics</td>
                <td className="px-4 py-3 text-[var(--text3)]">3:1 (AA)</td>
                <td className="px-4 py-3"><Badge level={result.uiComponents} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">Enter valid hex colors to check contrast.</div>
      )}
    </div>
  );
}
