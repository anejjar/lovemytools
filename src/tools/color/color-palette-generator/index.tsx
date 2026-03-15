"use client";

import { useState } from "react";
import { generateComplementary, generateAnalogous, generateTriadic, generateShades } from "./logic";
import { ColorPickerField } from "@/components/shared/ColorPickerField";
import type { PaletteColor } from "./logic";

function Swatch({ color }: { color: PaletteColor }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy} title={`Copy ${color.hex}`} className="group flex flex-col items-center gap-1">
      <div className="h-12 w-12 rounded-xl border border-black/10 shadow-sm transition-transform group-hover:scale-110" style={{ background: color.hex }} />
      <span className="text-xs font-mono text-[var(--text3)] group-hover:text-[var(--text2)]">{copied ? "Copied!" : color.hex}</span>
    </button>
  );
}

function PaletteRow({ label, colors }: { label: string; colors: PaletteColor[] }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-[var(--text2)]">{label}</p>
      <div className="flex flex-wrap gap-3">
        {colors.map((c) => <Swatch key={c.hex} color={c} />)}
      </div>
    </div>
  );
}

export default function ColorPaletteGeneratorTool() {
  const [hex, setHex] = useState("#6366f1");

  const complementary = generateComplementary(hex);
  const analogous = generateAnalogous(hex);
  const triadic = generateTriadic(hex);
  const shades = generateShades(hex);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-[var(--text2)]">Base Color</label>
          <div className="flex items-center gap-3">
            <ColorPickerField value={hex} onChange={setHex} />
            <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} maxLength={7} className="w-28 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-sm font-mono text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {complementary.length > 0 && <PaletteRow label="Complementary" colors={complementary} />}
        {analogous.length > 0 && <PaletteRow label="Analogous (5 colors)" colors={analogous} />}
        {triadic.length > 0 && <PaletteRow label="Triadic" colors={triadic} />}
        {shades.length > 0 && <PaletteRow label="Shades (100–900)" colors={shades} />}
      </div>
    </div>
  );
}
