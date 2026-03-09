import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, rgbToHsb } from "../color-picker/logic";

export interface ConvertedColor {
  hex: string;
  rgb: string;
  hsl: string;
  hsb: string;
  cmyk: string;
  r: number;
  g: number;
  b: number;
}

export function rgbToCmyk(
  r: number,
  g: number,
  b: number
): { c: number; m: number; y: number; k: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - rn - k) / (1 - k)) * 100),
    m: Math.round(((1 - gn - k) / (1 - k)) * 100),
    y: Math.round(((1 - bn - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

export function detectFormat(input: string): "hex" | "rgb" | "hsl" | "hsb" | null {
  const s = input.trim().toLowerCase();
  if (/^#?[0-9a-f]{6}$/i.test(s)) return "hex";
  if (/^rgb/.test(s)) return "rgb";
  if (/^hsl/.test(s)) return "hsl";
  if (/^hsb|^hsv/.test(s)) return "hsb";
  return null;
}

export function parseRgbString(s: string): { r: number; g: number; b: number } | null {
  const m = s.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (!m) return null;
  return { r: parseInt(m[1]), g: parseInt(m[2]), b: parseInt(m[3]) };
}

export function parseHslString(s: string): { h: number; s: number; l: number } | null {
  const m = s.match(/([\d.]+)[,\s]+([\d.]+)%?[,\s]+([\d.]+)%?/);
  if (!m) return null;
  return { h: parseFloat(m[1]), s: parseFloat(m[2]), l: parseFloat(m[3]) };
}

export function convertColor(input: string): ConvertedColor | null {
  const format = detectFormat(input);
  if (!format) return null;

  let r: number, g: number, b: number;

  if (format === "hex") {
    const hex = input.trim().startsWith("#") ? input.trim() : `#${input.trim()}`;
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    ({ r, g, b } = rgb);
  } else if (format === "rgb") {
    const rgb = parseRgbString(input);
    if (!rgb) return null;
    ({ r, g, b } = rgb);
  } else if (format === "hsl") {
    const hsl = parseHslString(input);
    if (!hsl) return null;
    ({ r, g, b } = hslToRgb(hsl.h, hsl.s, hsl.l));
  } else {
    return null;
  }

  const hex = rgbToHex(r, g, b);
  const hsl = rgbToHsl(r, g, b);
  const hsb = rgbToHsb(r, g, b);
  const cmyk = rgbToCmyk(r, g, b);

  return {
    hex,
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    hsb: `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)`,
    cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
    r, g, b,
  };
}
