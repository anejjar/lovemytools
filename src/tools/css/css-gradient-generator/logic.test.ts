import { describe, it, expect } from "vitest";
import { generateGradientCss, generateFullCss, defaultStops } from "./logic";

describe("generateGradientCss", () => {
  it("generates linear gradient", () => {
    const css = generateGradientCss({ type: "linear", angle: 90, stops: [{ color: "#fff", position: 0 }, { color: "#000", position: 100 }] });
    expect(css).toBe("linear-gradient(90deg, #fff 0%, #000 100%)");
  });

  it("generates radial gradient", () => {
    const css = generateGradientCss({ type: "radial", shape: "circle", stops: [{ color: "red", position: 0 }, { color: "blue", position: 100 }] });
    expect(css).toContain("radial-gradient");
    expect(css).toContain("circle");
  });

  it("generates conic gradient", () => {
    const css = generateGradientCss({ type: "conic", angle: 0, stops: [{ color: "red", position: 0 }, { color: "blue", position: 100 }] });
    expect(css).toContain("conic-gradient");
    expect(css).toContain("from 0deg");
  });

  it("includes all stops", () => {
    const css = generateGradientCss({
      type: "linear",
      angle: 45,
      stops: [{ color: "#f00", position: 0 }, { color: "#0f0", position: 50 }, { color: "#00f", position: 100 }],
    });
    expect(css).toContain("#f00 0%");
    expect(css).toContain("#0f0 50%");
    expect(css).toContain("#00f 100%");
  });
});

describe("generateFullCss", () => {
  it("wraps in background property", () => {
    const css = generateFullCss({ type: "linear", angle: 90, stops: defaultStops() });
    expect(css).toMatch(/^background:/);
  });
});

describe("defaultStops", () => {
  it("returns 2 stops", () => {
    expect(defaultStops()).toHaveLength(2);
  });

  it("first stop at 0, last at 100", () => {
    const stops = defaultStops();
    expect(stops[0].position).toBe(0);
    expect(stops[stops.length - 1].position).toBe(100);
  });
});
