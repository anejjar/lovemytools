export interface HslColor { h: number; s: number; l: number }
export interface RgbColor { r: number; g: number; b: number }
export interface PaletteColor { hex: string; rgb: RgbColor; hsl: HslColor }

export function hexToRgb(hex: string): RgbColor | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 3 && clean.length !== 6) return null;
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const n = parseInt(full, 16);
  if (isNaN(n)) return null;
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgbToHex({ r, g, b }: RgbColor): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

export function rgbToHsl({ r, g, b }: RgbColor): HslColor {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToRgb({ h, s, l }: HslColor): RgbColor {
  const sn = s / 100, ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; } else if (h < 180) { g = c; b = x; } else if (h < 240) { g = x; b = c; } else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

function makeColor(rgb: RgbColor): PaletteColor {
  return { hex: rgbToHex(rgb), rgb, hsl: rgbToHsl(rgb) };
}

export function generateComplementary(hex: string): PaletteColor[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  const hsl = rgbToHsl(rgb);
  return [hex, rgbToHex(hslToRgb({ ...hsl, h: (hsl.h + 180) % 360 }))].map((h) => makeColor(hexToRgb(h)!));
}

export function generateAnalogous(hex: string, count = 5): PaletteColor[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  const hsl = rgbToHsl(rgb);
  const step = 30;
  return Array.from({ length: count }, (_, i) => {
    const offset = (i - Math.floor(count / 2)) * step;
    return makeColor(hslToRgb({ ...hsl, h: ((hsl.h + offset) % 360 + 360) % 360 }));
  });
}

export function generateTriadic(hex: string): PaletteColor[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  const hsl = rgbToHsl(rgb);
  return [0, 120, 240].map((offset) => makeColor(hslToRgb({ ...hsl, h: (hsl.h + offset) % 360 })));
}

export function generateShades(hex: string, count = 9): PaletteColor[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  const hsl = rgbToHsl(rgb);
  return Array.from({ length: count }, (_, i) => {
    const l = Math.round(((count - i) / (count + 1)) * 100);
    return makeColor(hslToRgb({ ...hsl, l }));
  });
}
