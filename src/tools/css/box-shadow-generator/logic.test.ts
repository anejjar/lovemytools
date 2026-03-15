import { describe, it, expect } from "vitest";
import { shadowLayerToCss, generateBoxShadowCss, generateFullCss, defaultLayer } from "./logic";

describe("shadowLayerToCss", () => {
  it("generates basic shadow", () => {
    const css = shadowLayerToCss({ offsetX: 0, offsetY: 4, blur: 16, spread: 0, color: "#000", inset: false });
    expect(css).toBe("0px 4px 16px 0px #000");
  });

  it("adds inset keyword", () => {
    const css = shadowLayerToCss({ offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: "#000", inset: true });
    expect(css).toMatch(/^inset /);
  });

  it("handles negative offsets", () => {
    const css = shadowLayerToCss({ offsetX: -5, offsetY: -5, blur: 10, spread: 0, color: "red", inset: false });
    expect(css).toContain("-5px");
  });
});

describe("generateBoxShadowCss", () => {
  it("returns none for empty", () => {
    expect(generateBoxShadowCss([])).toBe("none");
  });

  it("joins multiple layers with comma", () => {
    const layers = [defaultLayer(), { ...defaultLayer(), offsetY: 8 }];
    const css = generateBoxShadowCss(layers);
    expect(css).toContain(",");
  });
});

describe("generateFullCss", () => {
  it("wraps in box-shadow property", () => {
    const css = generateFullCss([defaultLayer()]);
    expect(css).toMatch(/^box-shadow:/);
    expect(css).toMatch(/;$/);
  });
});

describe("defaultLayer", () => {
  it("is not inset", () => expect(defaultLayer().inset).toBe(false));
  it("has positive blur", () => expect(defaultLayer().blur).toBeGreaterThan(0));
});
