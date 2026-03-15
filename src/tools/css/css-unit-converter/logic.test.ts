import { describe, it, expect } from "vitest";
import { toPx, fromPx, convertUnit, DEFAULT_CONTEXT } from "./logic";

describe("toPx", () => {
  const ctx = DEFAULT_CONTEXT;

  it("px stays the same", () => {
    expect(toPx(16, "px", ctx)).toBe(16);
  });

  it("1rem = baseFontSize px", () => {
    expect(toPx(1, "rem", ctx)).toBe(16);
  });

  it("1em = parentFontSize px", () => {
    expect(toPx(1, "em", ctx)).toBe(16);
  });

  it("100vw = viewportWidth px", () => {
    expect(toPx(100, "vw", ctx)).toBe(1440);
  });

  it("100vh = viewportHeight px", () => {
    expect(toPx(100, "vh", ctx)).toBe(900);
  });

  it("1in = 96px", () => {
    expect(toPx(1, "in", ctx)).toBe(96);
  });

  it("72pt = 96px", () => {
    expect(toPx(72, "pt", ctx)).toBeCloseTo(96);
  });

  it("2.54cm = 96px", () => {
    expect(toPx(2.54, "cm", ctx)).toBeCloseTo(96);
  });

  it("25.4mm = 96px", () => {
    expect(toPx(25.4, "mm", ctx)).toBeCloseTo(96);
  });

  it("1pc = 16px", () => {
    expect(toPx(1, "pc", ctx)).toBe(16);
  });
});

describe("fromPx", () => {
  const ctx = DEFAULT_CONTEXT;

  it("96px → 1in", () => {
    expect(fromPx(96, "in", ctx)).toBe(1);
  });

  it("16px → 1rem", () => {
    expect(fromPx(16, "rem", ctx)).toBe(1);
  });
});

describe("convertUnit", () => {
  it("returns all units", () => {
    const results = convertUnit(16, "px");
    expect(results.length).toBe(11);
    const units = results.map((r) => r.unit);
    expect(units).toContain("rem");
    expect(units).toContain("em");
    expect(units).toContain("vw");
  });

  it("16px → 1rem", () => {
    const results = convertUnit(16, "px");
    const rem = results.find((r) => r.unit === "rem");
    expect(rem?.value).toBe(1);
  });

  it("1rem → 16px", () => {
    const results = convertUnit(1, "rem");
    const px = results.find((r) => r.unit === "px");
    expect(px?.value).toBe(16);
  });

  it("formatted includes unit suffix", () => {
    const results = convertUnit(1, "rem");
    const px = results.find((r) => r.unit === "px");
    expect(px?.formatted).toContain("px");
  });
});
