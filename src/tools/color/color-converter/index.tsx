"use client";

import { useState } from "react";
import { convertColor } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";

export default function ColorConverterTool() {
  const [input, setInput] = useState("#6366f1");
  const result = convertColor(input);

  const formats = result
    ? [
        { label: "HEX", value: result.hex },
        { label: "RGB", value: result.rgb },
        { label: "HSL", value: result.hsl },
        { label: "HSB", value: result.hsb },
        { label: "CMYK", value: result.cmyk },
      ]
    : [];

  return (
    <div className="max-w-xl space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text2)]">
          Enter any color value (HEX, RGB, HSL…)
        </label>
        <div className="flex gap-3">
          {result && (
            <div
              className="h-11 w-11 shrink-0 rounded-lg border border-[var(--border)]"
              style={{ background: result.hex }}
            />
          )}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="#6366f1 or rgb(99,102,241) or hsl(239,84%,67%)"
            className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-mono text-[var(--text)] placeholder:text-[var(--text3)] focus:border-[var(--primary)] focus:outline-none"
          />
        </div>
        {!result && input.trim() && (
          <p className="text-xs text-[var(--red)]">
            Could not detect color format. Try: #ff5733, rgb(255,87,51), or hsl(14,100%,60%)
          </p>
        )}
      </div>

      {formats.length > 0 && (
        <div className="space-y-2">
          {formats.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-xs font-bold uppercase tracking-wider text-[var(--text3)]">
                  {label}
                </span>
                <code className="text-sm text-[var(--text)]">{value}</code>
              </div>
              <CopyButton text={value} label="" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
