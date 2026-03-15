import { describe, it, expect } from "vitest";
import { generateBorderRadiusCss, isUniform, uniformValues } from "./logic";

describe("generateBorderRadiusCss", () => {
  it("shorthand for uniform values", () => {
    const css = generateBorderRadiusCss(uniformValues(8), "px");
    expect(css).toBe("border-radius: 8px;");
  });

  it("full four-value form for non-uniform", () => {
    const css = generateBorderRadiusCss({ topLeft: 4, topRight: 8, bottomRight: 12, bottomLeft: 0 }, "px");
    expect(css).toBe("border-radius: 4px 8px 12px 0px;");
  });

  it("supports % unit", () => {
    const css = generateBorderRadiusCss(uniformValues(50), "%");
    expect(css).toBe("border-radius: 50%;");
  });

  it("zero radius", () => {
    const css = generateBorderRadiusCss(uniformValues(0), "px");
    expect(css).toBe("border-radius: 0px;");
  });
});

describe("isUniform", () => {
  it("true when all equal", () => expect(isUniform(uniformValues(8))).toBe(true));
  it("false when not equal", () => expect(isUniform({ topLeft: 4, topRight: 8, bottomRight: 4, bottomLeft: 4 })).toBe(false));
});

describe("uniformValues", () => {
  it("all four corners equal", () => {
    const v = uniformValues(16);
    expect(v.topLeft).toBe(16);
    expect(v.topRight).toBe(16);
    expect(v.bottomRight).toBe(16);
    expect(v.bottomLeft).toBe(16);
  });
});
