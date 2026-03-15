export type CssUnit = "px" | "rem" | "em" | "%" | "vw" | "vh" | "pt" | "pc" | "cm" | "mm" | "in";

export interface ConversionContext {
  baseFontSize: number; // px — default 16
  parentFontSize: number; // px — for em
  viewportWidth: number; // px — for vw
  viewportHeight: number; // px — for vh
  parentSize: number; // px — for %
}

export const DEFAULT_CONTEXT: ConversionContext = {
  baseFontSize: 16,
  parentFontSize: 16,
  viewportWidth: 1440,
  viewportHeight: 900,
  parentSize: 1440,
};

/** Convert any CSS unit value to px */
export function toPx(value: number, unit: CssUnit, ctx: ConversionContext): number {
  switch (unit) {
    case "px": return value;
    case "rem": return value * ctx.baseFontSize;
    case "em": return value * ctx.parentFontSize;
    case "%": return (value / 100) * ctx.parentSize;
    case "vw": return (value / 100) * ctx.viewportWidth;
    case "vh": return (value / 100) * ctx.viewportHeight;
    case "pt": return value * (96 / 72);
    case "pc": return value * 16;
    case "cm": return value * (96 / 2.54);
    case "mm": return value * (96 / 25.4);
    case "in": return value * 96;
  }
}

/** Convert from px to a target unit */
export function fromPx(px: number, unit: CssUnit, ctx: ConversionContext): number {
  switch (unit) {
    case "px": return px;
    case "rem": return px / ctx.baseFontSize;
    case "em": return px / ctx.parentFontSize;
    case "%": return (px / ctx.parentSize) * 100;
    case "vw": return (px / ctx.viewportWidth) * 100;
    case "vh": return (px / ctx.viewportHeight) * 100;
    case "pt": return px * (72 / 96);
    case "pc": return px / 16;
    case "cm": return px * (2.54 / 96);
    case "mm": return px * (25.4 / 96);
    case "in": return px / 96;
  }
}

export interface ConversionResult {
  unit: CssUnit;
  value: number;
  formatted: string;
}

const ALL_UNITS: CssUnit[] = ["px", "rem", "em", "%", "vw", "vh", "pt", "pc", "cm", "mm", "in"];

export function convertUnit(
  value: number,
  fromUnit: CssUnit,
  ctx: ConversionContext = DEFAULT_CONTEXT
): ConversionResult[] {
  const px = toPx(value, fromUnit, ctx);
  return ALL_UNITS.map((unit) => {
    const v = fromPx(px, unit, ctx);
    const decimals = ["cm", "mm", "in", "pc"].includes(unit) ? 4 : 4;
    const formatted = `${parseFloat(v.toFixed(decimals))}${unit}`;
    return { unit, value: v, formatted };
  });
}
