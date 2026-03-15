import { describe, it, expect } from "vitest";
import { generateCssGradient, generateFullCss, generateSwatchStops, interpolateHex, defaultStops } from "./logic";

describe("generateCssGradient", () => {
  it("produces valid linear-gradient", () => {
    const css = generateCssGradient(90, [{ color: "#fff", position: 0 }, { color: "#000", position: 100 }]);
    expect(css).toBe("linear-gradient(90deg, #fff 0%, #000 100%)");
  });

  it("supports multiple stops", () => {
    const css = generateCssGradient(0, [{ color: "#f00", position: 0 }, { color: "#0f0", position: 50 }, { color: "#00f", position: 100 }]);
    expect(css).toContain("#0f0 50%");
  });
});

describe("generateFullCss", () => {
  it("wraps in background property", () => {
    const css = generateFullCss(45, defaultStops());
    expect(css).toMatch(/^background: linear-gradient/);
    expect(css).toMatch(/;$/);
  });
});

describe("generateSwatchStops", () => {
  it("handles empty", () => expect(generateSwatchStops([])).toHaveLength(0));
  it("single color at position 0", () => {
    const stops = generateSwatchStops(["#fff"]);
    expect(stops).toHaveLength(1);
    expect(stops[0].position).toBe(0);
  });
  it("two colors at 0 and 100", () => {
    const stops = generateSwatchStops(["#fff", "#000"]);
    expect(stops[0].position).toBe(0);
    expect(stops[1].position).toBe(100);
  });
  it("three colors evenly spaced", () => {
    const stops = generateSwatchStops(["#f00", "#0f0", "#00f"]);
    expect(stops[1].position).toBe(50);
  });
});

describe("interpolateHex", () => {
  it("t=0 returns first color", () => expect(interpolateHex("#000000", "#ffffff", 0)).toBe("#000000"));
  it("t=1 returns second color", () => expect(interpolateHex("#000000", "#ffffff", 1)).toBe("#ffffff"));
  it("t=0.5 returns midpoint", () => {
    const mid = interpolateHex("#000000", "#ffffff", 0.5);
    expect(mid).toMatch(/^#[0-9a-f]{6}$/);
  });
});
