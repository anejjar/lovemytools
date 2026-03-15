export interface ShadowLayer {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

export function shadowLayerToCss(layer: ShadowLayer): string {
  const parts: string[] = [];
  if (layer.inset) parts.push("inset");
  parts.push(`${layer.offsetX}px`);
  parts.push(`${layer.offsetY}px`);
  parts.push(`${layer.blur}px`);
  parts.push(`${layer.spread}px`);
  parts.push(layer.color);
  return parts.join(" ");
}

export function generateBoxShadowCss(layers: ShadowLayer[]): string {
  if (layers.length === 0) return "none";
  return layers.map(shadowLayerToCss).join(", ");
}

export function generateFullCss(layers: ShadowLayer[]): string {
  return `box-shadow: ${generateBoxShadowCss(layers)};`;
}

export function defaultLayer(): ShadowLayer {
  return { offsetX: 0, offsetY: 4, blur: 16, spread: 0, color: "rgba(0,0,0,0.25)", inset: false };
}
