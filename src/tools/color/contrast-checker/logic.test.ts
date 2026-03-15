import { describe, it, expect } from "vitest";
import { hexToRgb, relativeLuminance, contrastRatio, evaluateContrast } from "./logic";

describe("hexToRgb", () => {
  it("parses black", () => expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 }));
  it("parses white", () => expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 }));
  it("parses short hex", () => expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 }));
  it("returns null for invalid", () => expect(hexToRgb("zzz")).toBeNull());
});

describe("relativeLuminance", () => {
  it("white has luminance 1", () => expect(relativeLuminance("#ffffff")).toBeCloseTo(1, 2));
  it("black has luminance 0", () => expect(relativeLuminance("#000000")).toBeCloseTo(0, 2));
  it("returns null for invalid hex", () => expect(relativeLuminance("gggggg")).toBeNull());
});

describe("contrastRatio", () => {
  it("black on white = 21:1", () => {
    const ratio = contrastRatio("#000000", "#ffffff");
    expect(ratio).toBeCloseTo(21, 0);
  });

  it("white on white = 1:1", () => {
    const ratio = contrastRatio("#ffffff", "#ffffff");
    expect(ratio).toBeCloseTo(1, 1);
  });

  it("returns null for invalid hex", () => {
    expect(contrastRatio("#000000", "gggggg")).toBeNull();
  });
});

describe("evaluateContrast", () => {
  it("black/white passes AAA for normal text", () => {
    const result = evaluateContrast("#000000", "#ffffff");
    expect(result?.normalText).toBe("AAA");
    expect(result?.largeText).toBe("AAA");
  });

  it("ratio is approximately 21 for black/white", () => {
    const result = evaluateContrast("#000000", "#ffffff");
    expect(result?.ratio).toBeGreaterThanOrEqual(20);
  });

  it("same color fails", () => {
    const result = evaluateContrast("#777777", "#777777");
    expect(result?.normalText).toBe("Fail");
  });

  it("returns null for invalid hex", () => {
    expect(evaluateContrast("gggggg", "#fff")).toBeNull();
  });

  it("low contrast fails normal text but may pass large text", () => {
    // ~3:1 contrast
    const result = evaluateContrast("#767676", "#ffffff");
    expect(result).not.toBeNull();
  });
});
