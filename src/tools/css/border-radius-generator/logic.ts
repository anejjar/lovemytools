export interface BorderRadiusValues {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

export function generateBorderRadiusCss(values: BorderRadiusValues, unit: "px" | "%"): string {
  const { topLeft: tl, topRight: tr, bottomRight: br, bottomLeft: bl } = values;
  if (tl === tr && tr === br && br === bl) {
    return `border-radius: ${tl}${unit};`;
  }
  return `border-radius: ${tl}${unit} ${tr}${unit} ${br}${unit} ${bl}${unit};`;
}

export function isUniform(values: BorderRadiusValues): boolean {
  const { topLeft: tl, topRight: tr, bottomRight: br, bottomLeft: bl } = values;
  return tl === tr && tr === br && br === bl;
}

export function uniformValues(value: number): BorderRadiusValues {
  return { topLeft: value, topRight: value, bottomRight: value, bottomLeft: value };
}
