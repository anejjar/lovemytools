import { describe, it, expect } from "vitest";
import { minifyJs } from "./logic";

describe("minifyJs", () => {
  it("removes single-line comments", () => {
    const r = minifyJs("const x = 1; // this is a comment\nconst y = 2;");
    expect(r.output).not.toContain("//");
    expect(r.error).toBeNull();
  });

  it("removes multi-line comments", () => {
    const r = minifyJs("/* header */\nconst x = 1;");
    expect(r.output).not.toContain("/*");
    expect(r.error).toBeNull();
  });

  it("collapses whitespace", () => {
    const r = minifyJs("const   x   =   1;");
    expect(r.output).not.toContain("  ");
  });

  it("calculates size stats", () => {
    const r = minifyJs("const x = 1; // comment\nconst y = 2;");
    expect(r.originalSize).toBeGreaterThan(0);
    expect(r.minifiedSize).toBeGreaterThan(0);
    expect(r.minifiedSize).toBeLessThanOrEqual(r.originalSize);
    expect(r.savings).toBeGreaterThanOrEqual(0);
    expect(r.savingsPercent).toBeGreaterThanOrEqual(0);
  });

  it("handles empty input", () => {
    const r = minifyJs("");
    expect(r.output).toBe("");
    expect(r.originalSize).toBe(0);
    expect(r.error).toBeNull();
  });

  it("preserves function structure", () => {
    const r = minifyJs("function hello() {\n  return 42;\n}");
    expect(r.output).toContain("function");
    expect(r.output).toContain("return");
    expect(r.error).toBeNull();
  });

  it("savings percent between 0 and 100", () => {
    const r = minifyJs("// lots of comments\n/* more */\nconst x = 1;");
    expect(r.savingsPercent).toBeGreaterThanOrEqual(0);
    expect(r.savingsPercent).toBeLessThanOrEqual(100);
  });
});
