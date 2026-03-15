export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 3 && clean.length !== 6) return null;
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const n = parseInt(full, 16);
  if (isNaN(n)) return null;
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function linearize(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const r = linearize(rgb.r);
  const g = linearize(rgb.g);
  const b = linearize(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(hex1: string, hex2: string): number | null {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  if (l1 === null || l2 === null) return null;
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export type WcagLevel = "AAA" | "AA" | "AA Large" | "Fail";

export interface WcagResult {
  ratio: number;
  normalText: WcagLevel;
  largeText: WcagLevel;
  uiComponents: WcagLevel;
}

export function evaluateContrast(hex1: string, hex2: string): WcagResult | null {
  const ratio = contrastRatio(hex1, hex2);
  if (ratio === null) return null;

  const r = parseFloat(ratio.toFixed(2));

  const normalText: WcagLevel = r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "AA Large" : "Fail";
  const largeText: WcagLevel = r >= 4.5 ? "AAA" : r >= 3 ? "AA" : "Fail";
  const uiComponents: WcagLevel = r >= 3 ? "AA" : "Fail";

  return { ratio: r, normalText, largeText, uiComponents };
}
