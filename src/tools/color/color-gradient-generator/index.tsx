"use client";

import { useState } from "react";
import { generateCssGradient, generateFullCss, defaultStops } from "./logic";
import type { GradientStop } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { ColorPickerField } from "@/components/shared/ColorPickerField";

export default function ColorGradientGeneratorTool() {
  const [stops, setStops] = useState<GradientStop[]>(defaultStops());
  const [angle, setAngle] = useState(135);

  const gradient = generateCssGradient(angle, stops);
  const fullCss = generateFullCss(angle, stops);

  const updateStop = (i: number, patch: Partial<GradientStop>) =>
    setStops((s) => s.map((stop, idx) => (idx === i ? { ...stop, ...patch } : stop)));
  const addStop = () => setStops((s) => [...s, { color: "#a78bfa", position: 50 }]);
  const removeStop = (i: number) => { if (stops.length > 2) setStops((s) => s.filter((_, idx) => idx !== i)); };

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="h-36 w-full rounded-xl border border-[var(--border)] shadow-inner transition-all duration-300" style={{ background: gradient }} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-[var(--text3)]"><span>Angle</span><span>{angle}°</span></div>
            <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(+e.target.value)} className="w-full accent-[var(--primary)]" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--text2)]">Color Stops</span>
              <button onClick={addStop} className="text-xs text-[var(--primary)] hover:underline">+ Add stop</button>
            </div>
            {stops.map((stop, i) => (
              <div key={i} className="flex items-center gap-3">
                <ColorPickerField value={stop.color} onChange={(c) => updateStop(i, { color: c })} compact />
                <input type="text" value={stop.color} onChange={(e) => updateStop(i, { color: e.target.value })} className="w-24 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-2 py-1 text-sm font-mono text-[var(--text)]" />
                <span className="text-xs text-[var(--text3)] w-8 text-right">{stop.position}%</span>
                <input type="range" min={0} max={100} value={stop.position} onChange={(e) => updateStop(i, { position: +e.target.value })} className="flex-1 accent-[var(--primary)]" />
                {stops.length > 2 && (
                  <button onClick={() => removeStop(i)} className="text-[var(--text3)] hover:text-[var(--red)] text-lg leading-none transition-colors">×</button>
                )}
              </div>
            ))}
          </div>
        </div>

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
