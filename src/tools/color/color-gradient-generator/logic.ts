export interface GradientStop { color: string; position: number }

export function generateCssGradient(angle: number, stops: GradientStop[]): string {
  const stopStr = stops.map((s) => `${s.color} ${s.position}%`).join(", ");
  return `linear-gradient(${angle}deg, ${stopStr})`;
}

export function generateFullCss(angle: number, stops: GradientStop[]): string {
  return `background: ${generateCssGradient(angle, stops)};`;
}

export function generateSwatchStops(colors: string[]): GradientStop[] {
  if (colors.length === 0) return [];
  if (colors.length === 1) return [{ color: colors[0], position: 0 }];
  return colors.map((color, i) => ({ color, position: Math.round((i / (colors.length - 1)) * 100) }));
}

export function interpolateHex(hex1: string, hex2: string, t: number): string {
  const parse = (h: string) => {
    const c = h.replace("#", "");
    const n = parseInt(c.length === 3 ? c.split("").map((x) => x + x).join("") : c, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const [r1, g1, b1] = parse(hex1);
  const [r2, g2, b2] = parse(hex2);
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * t);
  return "#" + [lerp(r1, r2), lerp(g1, g2), lerp(b1, b2)].map((v) => v.toString(16).padStart(2, "0")).join("");
}

export function defaultStops(): GradientStop[] {
  return [{ color: "#6366f1", position: 0 }, { color: "#ec4899", position: 100 }];
}
