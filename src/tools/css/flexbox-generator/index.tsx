"use client";

import { useState } from "react";
import { generateContainerCss, defaultContainerOptions } from "./logic";
import type { FlexContainerOptions } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";

function Select<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: T[]; onChange: (v: T) => void }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-[var(--text3)]">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value as T)} className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

const COLORS = ["bg-[var(--primary)]", "bg-purple-500", "bg-pink-500", "bg-amber-500", "bg-emerald-500"];

export default function FlexboxGeneratorTool() {
  const [opts, setOpts] = useState<FlexContainerOptions>(defaultContainerOptions());
  const [itemCount, setItemCount] = useState(4);

  const set = <K extends keyof FlexContainerOptions>(key: K, val: FlexContainerOptions[K]) => setOpts((o) => ({ ...o, [key]: val }));

  const css = generateContainerCss(opts);

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-4">
        <div
          style={{
            display: "flex",
            flexDirection: opts.flexDirection,
            flexWrap: opts.flexWrap,
            justifyContent: opts.justifyContent,
            alignItems: opts.alignItems,
            gap: `${opts.gap}px`,
            minHeight: "120px",
          }}
        >
          {Array.from({ length: itemCount }).map((_, i) => (
            <div key={i} className={`rounded-lg ${COLORS[i % COLORS.length]} flex h-12 w-12 flex-shrink-0 items-center justify-center text-sm font-bold text-white`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-3">
          <Select label="flex-direction" value={opts.flexDirection} options={["row", "row-reverse", "column", "column-reverse"]} onChange={(v) => set("flexDirection", v)} />
          <Select label="flex-wrap" value={opts.flexWrap} options={["nowrap", "wrap", "wrap-reverse"]} onChange={(v) => set("flexWrap", v)} />
          <Select label="justify-content" value={opts.justifyContent} options={["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]} onChange={(v) => set("justifyContent", v)} />
          <Select label="align-items" value={opts.alignItems} options={["stretch", "flex-start", "flex-end", "center", "baseline"]} onChange={(v) => set("alignItems", v)} />
          <Select label="align-content" value={opts.alignContent} options={["stretch", "flex-start", "flex-end", "center", "space-between", "space-around"]} onChange={(v) => set("alignContent", v)} />
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-[var(--text3)]"><span>gap</span><span>{opts.gap}px</span></div>
            <input type="range" min={0} max={48} value={opts.gap} onChange={(e) => set("gap", +e.target.value)} className="w-full accent-[var(--primary)]" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-[var(--text3)]"><span>Items in preview</span><span>{itemCount}</span></div>
            <input type="range" min={1} max={8} value={itemCount} onChange={(e) => setItemCount(+e.target.value)} className="w-full accent-[var(--primary)]" />
          </div>
        </div>

        {/* Output */}
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
