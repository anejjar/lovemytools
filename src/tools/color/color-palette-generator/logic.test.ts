import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, generateComplementary, generateAnalogous, generateTriadic, generateShades } from "./logic";

describe("hexToRgb", () => {
  it("parses 6-char hex", () => expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 }));
  it("parses 3-char hex", () => expect(hexToRgb("#f00")).toEqual({ r: 255, g: 0, b: 0 }));
  it("returns null for invalid", () => expect(hexToRgb("zzz")).toBeNull());
  it("parses white", () => expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 }));
  it("parses black", () => expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 }));
});

describe("rgbToHex", () => {
  it("converts red", () => expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000"));
  it("converts black", () => expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000"));
  it("converts white", () => expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe("#ffffff"));
});

describe("rgbToHsl", () => {
  it("red has hue 0", () => expect(rgbToHsl({ r: 255, g: 0, b: 0 }).h).toBe(0));
  it("white has 100% lightness", () => expect(rgbToHsl({ r: 255, g: 255, b: 255 }).l).toBe(100));
  it("black has 0% lightness", () => expect(rgbToHsl({ r: 0, g: 0, b: 0 }).l).toBe(0));
  it("grey has 0% saturation", () => expect(rgbToHsl({ r: 128, g: 128, b: 128 }).s).toBe(0));
});

describe("hslToRgb round-trip", () => {
  it("red round-trips", () => {
    const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
    const rgb = hslToRgb(hsl);
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
  });
});

describe("generateComplementary", () => {
  it("returns 2 colors", () => expect(generateComplementary("#ff0000")).toHaveLength(2));
  it("first is input color", () => expect(generateComplementary("#ff0000")[0].hex).toBe("#ff0000"));
  it("returns empty for invalid", () => expect(generateComplementary("zzz")).toHaveLength(0));
});

describe("generateAnalogous", () => {
  it("returns 5 by default", () => expect(generateAnalogous("#6366f1")).toHaveLength(5));
  it("respects count param", () => expect(generateAnalogous("#6366f1", 3)).toHaveLength(3));
});

describe("generateTriadic", () => {
  it("returns 3 colors", () => expect(generateTriadic("#ff0000")).toHaveLength(3));
});

describe("generateShades", () => {
  it("returns 9 shades by default", () => expect(generateShades("#6366f1")).toHaveLength(9));
  it("shades have varying lightness", () => {
    const shades = generateShades("#6366f1");
    const lightnesses = shades.map((s) => s.hsl.l);
    const unique = new Set(lightnesses);
    expect(unique.size).toBeGreaterThan(1);
  });
});
