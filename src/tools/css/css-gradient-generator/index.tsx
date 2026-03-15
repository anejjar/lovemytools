"use client";

import { useState } from "react";
import { generateGradientCss, generateFullCss, defaultStops } from "./logic";
import type { GradientType, GradientStop, RadialOptions } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { ColorPickerField } from "@/components/shared/ColorPickerField";

export default function CssGradientGeneratorTool() {
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(135);
  const [shape, setShape] = useState<RadialOptions["shape"]>("circle");
  const [stops, setStops] = useState<GradientStop[]>(defaultStops());

  const opts =
    type === "linear"
      ? { type: "linear" as const, angle, stops }
      : type === "radial"
      ? { type: "radial" as const, shape, stops }
      : { type: "conic" as const, angle, stops };

  const gradient = generateGradientCss(opts);
  const fullCss = generateFullCss(opts);

  const updateStop = (i: number, patch: Partial<GradientStop>) => {
    setStops((s) => s.map((stop, idx) => (idx === i ? { ...stop, ...patch } : stop)));
  };
  const addStop = () => setStops((s) => [...s, { color: "#a78bfa", position: 50 }]);
  const removeStop = (i: number) => { if (stops.length > 2) setStops((s) => s.filter((_, idx) => idx !== i)); };

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div
        className="h-40 w-full rounded-xl border border-[var(--border)] shadow-inner"
        style={{ background: gradient }}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text2)]">Type</label>
            <div className="flex gap-2">
              {(["linear", "radial", "conic"] as GradientType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${type === t ? "bg-[var(--primary)] text-white" : "bg-[var(--surface2)] text-[var(--text2)] hover:text-[var(--text)]"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {type !== "radial" && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-[var(--text2)]">Angle: {angle}°</label>
              <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(+e.target.value)} className="w-full accent-[var(--primary)]" />
            </div>
          )}
          {type === "radial" && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-[var(--text2)]">Shape</label>
              <div className="flex gap-2">
                {(["circle", "ellipse"] as RadialOptions["shape"][]).map((s) => (
                  <button key={s} onClick={() => setShape(s)} className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${shape === s ? "bg-[var(--primary)] text-white" : "bg-[var(--surface2)] text-[var(--text2)]"}`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[var(--text2)]">Color Stops</label>
              <button onClick={addStop} className="text-xs text-[var(--primary)] hover:underline">+ Add stop</button>
            </div>
            {stops.map((stop, i) => (
              <div key={i} className="flex items-center gap-3">
                <ColorPickerField value={stop.color} onChange={(c) => updateStop(i, { color: c })} compact />
                <span className="text-sm text-[var(--text2)] w-8">{stop.position}%</span>
                <input type="range" min={0} max={100} value={stop.position} onChange={(e) => updateStop(i, { position: +e.target.value })} className="flex-1 accent-[var(--primary)]" />
                {stops.length > 2 && (
                  <button onClick={() => removeStop(i)} className="text-[var(--text3)] hover:text-[var(--red)] transition-colors text-lg leading-none">×</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">CSS Output</label>
            <CopyButton text={fullCss} />
          </div>
          <pre className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-4 text-sm font-mono text-[var(--text)] whitespace-pre-wrap break-all">{fullCss}</pre>
        </div>
      </div>
    </div>
  );
}
