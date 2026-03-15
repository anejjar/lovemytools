"use client";

import { useState } from "react";
import { generateBoxShadowCss, generateFullCss, defaultLayer } from "./logic";
import type { ShadowLayer } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { ColorPickerField } from "@/components/shared/ColorPickerField";

function Slider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-[var(--text3)]"><span>{label}</span><span>{value}px</span></div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(+e.target.value)} className="w-full accent-[var(--primary)]" />
    </div>
  );
}

export default function BoxShadowGeneratorTool() {
  const [layers, setLayers] = useState<ShadowLayer[]>([defaultLayer()]);
  const [selected, setSelected] = useState(0);

  const layer = layers[selected] ?? layers[0];
  const update = (patch: Partial<ShadowLayer>) => setLayers((ls) => ls.map((l, i) => (i === selected ? { ...l, ...patch } : l)));

  const fullCss = generateFullCss(layers);

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-12">
        <div
          className="h-32 w-48 rounded-xl bg-[var(--surface)] transition-shadow duration-200"
          style={{ boxShadow: generateBoxShadowCss(layers) }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Layer list */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--text2)]">Layers</span>
            <button onClick={() => { setLayers((ls) => [...ls, defaultLayer()]); setSelected(layers.length); }} className="text-xs text-[var(--primary)] hover:underline">+ Add layer</button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {layers.map((_, i) => (
              <button key={i} onClick={() => setSelected(i)} className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${i === selected ? "bg-[var(--primary)] text-white" : "bg-[var(--surface2)] text-[var(--text2)]"}`}>
                Layer {i + 1}
              </button>
            ))}
            {layers.length > 1 && <button onClick={() => { setLayers((ls) => ls.filter((_, i) => i !== selected)); setSelected(Math.max(0, selected - 1)); }} className="rounded-lg px-3 py-1.5 text-sm bg-[var(--surface2)] text-[var(--red)] hover:bg-[var(--red)]/10 transition-colors">Remove</button>}
          </div>

          <div className="space-y-3 rounded-xl border border-[var(--border)] p-4">
            <Slider label="Offset X" value={layer.offsetX} min={-50} max={50} onChange={(v) => update({ offsetX: v })} />
            <Slider label="Offset Y" value={layer.offsetY} min={-50} max={50} onChange={(v) => update({ offsetY: v })} />
            <Slider label="Blur" value={layer.blur} min={0} max={100} onChange={(v) => update({ blur: v })} />
            <Slider label="Spread" value={layer.spread} min={-50} max={50} onChange={(v) => update({ spread: v })} />
            <div className="flex items-center gap-3">
              <span className="text-xs text-[var(--text3)]">Color</span>
              <ColorPickerField value={layer.color.startsWith("rgba") ? "#000000" : layer.color} onChange={(c) => update({ color: c })} compact />
              <input type="text" value={layer.color} onChange={(e) => update({ color: e.target.value })} className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-2 py-1 text-sm font-mono text-[var(--text)]" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={layer.inset} onChange={(e) => update({ inset: e.target.checked })} className="rounded accent-[var(--primary)]" />
              <span className="text-sm text-[var(--text2)]">Inset shadow</span>
            </label>
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
