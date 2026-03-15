"use client";

import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

function toHex(value: string): string {
  const clean = value.trim().startsWith("#") ? value.trim().slice(1) : value.trim();
  if (/^[0-9A-Fa-f]{6}$/.test(clean)) return `#${clean}`;
  return "#000000";
}

export interface ColorPickerFieldProps {
  value: string;
  onChange: (hex: string) => void;
  /** Optional class for the trigger swatch container */
  className?: string;
  /** Smaller swatch (e.g. h-8 w-12 vs h-10 w-14) */
  compact?: boolean;
}

export function ColorPickerField({ value, onChange, className = "", compact }: ColorPickerFieldProps) {
  const [open, setOpen] = useState(false);
  const [internalHex, setInternalHex] = useState(() => toHex(value));
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const hex = /^#[0-9A-Fa-f]{6}$/.test(value) ? value : toHex(value);

  useEffect(() => {
    setInternalHex(hex);
  }, [hex]);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (
        panelRef.current?.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const handleChange = (newHex: string) => {
    setInternalHex(newHex);
    onChange(newHex);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Choose color"
        className={`cursor-pointer rounded-lg border border-[var(--border)] bg-transparent p-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${compact ? "h-8 w-12" : "h-10 w-14"}`}
        style={{ background: internalHex }}
      />
      {open && (
        <div
          ref={panelRef}
          className="color-picker-wrapper absolute left-0 top-full z-50 mt-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg"
        >
          <HexColorPicker color={internalHex} onChange={handleChange} />
        </div>
      )}
    </div>
  );
}
