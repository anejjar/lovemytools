import { describe, it, expect } from "vitest";
import { minifyCss } from "./logic";

describe("minifyCss", () => {
  it("removes whitespace", () => {
    const r = minifyCss("  body  {  color:  red;  }  ");
    expect(r.error).toBeNull();
    expect(r.output).toBe("body{color:red}");
  });

  it("removes comments", () => {
    const r = minifyCss("/* comment */ body { color: red; }");
    expect(r.output).not.toContain("comment");
  });

  it("calculates savings", () => {
    const r = minifyCss("body {\n  color: red;\n  margin: 0;\n}");
    expect(r.savingsPercent).toBeGreaterThan(0);
    expect(r.originalSize).toBeGreaterThan(r.minifiedSize);
  });

  it("returns empty for empty input", () => {
    const r = minifyCss("   ");
    expect(r.output).toBe("");
    expect(r.error).toBeNull();
  });

  it("handles multiple rules", () => {
    const r = minifyCss("h1 { color: red; } p { margin: 0; }");
    expect(r.error).toBeNull();
    expect(r.output).toContain("h1{");
    expect(r.output).toContain("p{");
  });

  it("removes trailing semicolons before closing brace", () => {
    const r = minifyCss("body { color: red; }");
    expect(r.output).toBe("body{color:red}");
  });
});
