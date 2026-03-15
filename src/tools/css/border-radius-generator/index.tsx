"use client";

import { useState } from "react";
import { generateBorderRadiusCss, uniformValues } from "./logic";
import type { BorderRadiusValues } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";

const CORNERS = [
  { key: "topLeft", label: "Top Left" },
  { key: "topRight", label: "Top Right" },
  { key: "bottomRight", label: "Bottom Right" },
  { key: "bottomLeft", label: "Bottom Left" },
] as const;

export default function BorderRadiusGeneratorTool() {
  const [values, setValues] = useState<BorderRadiusValues>(uniformValues(12));
  const [unit, setUnit] = useState<"px" | "%">("px");
  const [linked, setLinked] = useState(true);

  const max = unit === "%" ? 50 : 100;

  const update = (key: keyof BorderRadiusValues, val: number) => {
    if (linked) setValues(uniformValues(val));
    else setValues((v) => ({ ...v, [key]: val }));
  };

  const css = generateBorderRadiusCss(values, unit);
  const { topLeft: tl, topRight: tr, bottomRight: br, bottomLeft: bl } = values;
  const previewRadius = `${tl}${unit} ${tr}${unit} ${br}${unit} ${bl}${unit}`;

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-12">
        <div
          className="h-32 w-48 bg-gradient-to-br from-[var(--primary)] to-purple-500 transition-all duration-200"
          style={{ borderRadius: previewRadius }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {(["px", "%"] as const).map((u) => (
                <button key={u} onClick={() => setUnit(u)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${unit === u ? "bg-[var(--primary)] text-white" : "bg-[var(--surface2)] text-[var(--text2)]"}`}>{u}</button>
              ))}
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-[var(--text2)]">
              <input type="checkbox" checked={linked} onChange={(e) => setLinked(e.target.checked)} className="rounded accent-[var(--primary)]" />
              Link all corners
            </label>
          </div>

          {CORNERS.map(({ key, label }) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-xs text-[var(--text3)]"><span>{label}</span><span>{values[key]}{unit}</span></div>
              <input type="range" min={0} max={max} value={values[key]} onChange={(e) => update(key, +e.target.value)} className="w-full accent-[var(--primary)]" />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">CSS Output</label>
            <CopyButton text={css} />
          </div>
          <pre className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-4 text-sm font-mono text-[var(--text)] whitespace-pre-wrap">{css}</pre>
        </div>
      </div>
    </div>
  );
}
