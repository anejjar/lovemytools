export interface FlexContainerOptions {
  flexDirection: "row" | "row-reverse" | "column" | "column-reverse";
  flexWrap: "nowrap" | "wrap" | "wrap-reverse";
  justifyContent: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  alignItems: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  alignContent: "stretch" | "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
  gap: number;
}

export interface FlexItemOptions {
  flexGrow: number;
  flexShrink: number;
  flexBasis: string;
  alignSelf: "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  order: number;
}

export function generateContainerCss(opts: FlexContainerOptions): string {
  const lines: string[] = [
    "display: flex;",
    `flex-direction: ${opts.flexDirection};`,
    `flex-wrap: ${opts.flexWrap};`,
    `justify-content: ${opts.justifyContent};`,
    `align-items: ${opts.alignItems};`,
    `align-content: ${opts.alignContent};`,
  ];
  if (opts.gap > 0) lines.push(`gap: ${opts.gap}px;`);
  return lines.join("\n");
}

export function generateItemCss(opts: FlexItemOptions): string {
  const lines: string[] = [
    `flex-grow: ${opts.flexGrow};`,
    `flex-shrink: ${opts.flexShrink};`,
    `flex-basis: ${opts.flexBasis};`,
  ];
  if (opts.alignSelf !== "auto") lines.push(`align-self: ${opts.alignSelf};`);
  if (opts.order !== 0) lines.push(`order: ${opts.order};`);
  return lines.join("\n");
}

export function defaultContainerOptions(): FlexContainerOptions {
  return {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignContent: "stretch",
    gap: 8,
  };
}
