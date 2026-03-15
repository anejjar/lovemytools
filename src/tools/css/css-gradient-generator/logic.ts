export type GradientType = "linear" | "radial" | "conic";
export type GradientStop = { color: string; position: number };

export interface LinearOptions {
  type: "linear";
  angle: number;
  stops: GradientStop[];
}

export interface RadialOptions {
  type: "radial";
  shape: "circle" | "ellipse";
  stops: GradientStop[];
}

export interface ConicOptions {
  type: "conic";
  angle: number;
  stops: GradientStop[];
}

export type GradientOptions = LinearOptions | RadialOptions | ConicOptions;

export function generateGradientCss(opts: GradientOptions): string {
  const stopStr = opts.stops
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");

  switch (opts.type) {
    case "linear":
      return `linear-gradient(${opts.angle}deg, ${stopStr})`;
    case "radial":
      return `radial-gradient(${opts.shape} at center, ${stopStr})`;
    case "conic":
      return `conic-gradient(from ${opts.angle}deg, ${stopStr})`;
  }
}

export function generateFullCss(opts: GradientOptions): string {
  const gradient = generateGradientCss(opts);
  return `background: ${gradient};`;
}

export function defaultStops(): GradientStop[] {
  return [
    { color: "#6366f1", position: 0 },
    { color: "#8b5cf6", position: 100 },
  ];
}
