"use client";

import { useState, useCallback } from "react";
import { HexColorPicker } from "react-colorful";
import { parseColor, generateShades, rgbToHex, hslToRgb } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";

const DEFAULT_HEX = "#6366f1";

export default function ColorPickerTool() {
  const [hex, setHex] = useState(DEFAULT_HEX);
  const [inputVal, setInputVal] = useState(DEFAULT_HEX);

  const color = parseColor(hex);
  const shades = generateShades(hex);

  const handleHexInput = useCallback((val: string) => {
    setInputVal(val);
    const clean = val.startsWith("#") ? val : `#${val}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(clean)) {
      setHex(clean);
    }
  }, []);

  const handlePickerChange = useCallback((val: string) => {
    setHex(val);
    setInputVal(val);
  }, []);

  const handleHslChange = (h: number, s: number, l: number) => {
    const { r, g, b } = hslToRgb(h, s, l);
    const newHex = rgbToHex(r, g, b);
    setHex(newHex);
    setInputVal(newHex);
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Main picker */}
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-start gap-4">
          <div className="color-picker-wrapper rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2">
            <HexColorPicker color={hex} onChange={handlePickerChange} />
          </div>
          <div
            className="h-12 w-full min-w-[12rem] rounded-xl border border-[var(--border)]"
            style={{ background: hex }}
          />
        </div>
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text3)] uppercase tracking-wider">HEX</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => handleHexInput(e.target.value)}
                className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 font-mono text-sm text-[var(--text)] focus:border-[var(--primary)] focus:outline-none"
                placeholder="#000000"
              />
              <CopyButton text={hex} />
            </div>
          </div>
          {color && (
            <>
              <ColorRow
                label="RGB"
                value={`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`}
              />
              <ColorRow
                label="HSL"
                value={`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`}
              />
              <ColorRow
                label="HSB"
                value={`hsb(${color.hsb.h}, ${color.hsb.s}%, ${color.hsb.b}%)`}
              />
            </>
          )}
        </div>
      </div>

      {/* Sliders */}
      {color && (
        <div className="space-y-4 rounded-xl border border-[var(--border)] p-4">
          <h3 className="text-sm font-medium text-[var(--text2)]">Adjust HSL</h3>
          <SliderRow
            label="H"
            value={color.hsl.h}
            max={360}
            onChange={(v) => handleHslChange(v, color.hsl.s, color.hsl.l)}
            unit="°"
          />
          <SliderRow
            label="S"
            value={color.hsl.s}
            max={100}
            onChange={(v) => handleHslChange(color.hsl.h, v, color.hsl.l)}
            unit="%"
          />
          <SliderRow
            label="L"
            value={color.hsl.l}
            max={100}
            onChange={(v) => handleHslChange(color.hsl.h, color.hsl.s, v)}
            unit="%"
          />
        </div>
      )}

      {/* Shades */}
      {shades.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-[var(--text2)]">Color Shades</h3>
          <div className="grid grid-cols-10 gap-1">
            {shades.map((shade, i) => (
              <button
                key={i}
                onClick={() => { setHex(shade); setInputVal(shade); }}
                className="group relative flex flex-col items-center gap-1"
                title={shade}
              >
                <div
                  className="h-10 w-full rounded-lg border border-black/10 transition-transform hover:scale-105"
                  style={{ background: shade }}
                />
                <span className="text-[9px] font-mono text-[var(--text3)] opacity-0 group-hover:opacity-100 transition-opacity">
                  {shade}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ColorRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-10 text-xs font-medium text-[var(--text3)] uppercase">{label}</span>
      <code className="flex-1 text-sm text-[var(--text)]">{value}</code>
      <CopyButton text={value} label="" />
    </div>
  );
}

function SliderRow({
  label,
  value,
  max,
  onChange,
  unit,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (v: number) => void;
  unit: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-4 text-xs font-medium text-[var(--text3)]">{label}</span>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-[#6366f1]"
      />
      <span className="w-12 text-right text-xs font-mono text-[var(--text2)]">
        {value}{unit}
      </span>
    </div>
  );
}
