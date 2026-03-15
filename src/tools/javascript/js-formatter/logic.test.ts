import { describe, it, expect } from "vitest";
import { formatJs } from "./logic";

describe("formatJs", () => {
  it("formats minified JS", () => {
    const r = formatJs("function hello(){return 42;}");
    expect(r.error).toBeNull();
    expect(r.output).toContain("function hello()");
    expect(r.output).toContain("return 42;");
  });

  it("handles empty input", () => {
    const r = formatJs("");
    expect(r.output).toBe("");
    expect(r.error).toBeNull();
  });

  it("respects 4-space indent", () => {
    const r = formatJs("function f(){if(true){return 1;}}", 4);
    expect(r.error).toBeNull();
    expect(r.output).toContain("    ");
  });

  it("respects tab indent", () => {
    const r = formatJs("function f(){return 1;}", "tab");
    expect(r.error).toBeNull();
    expect(r.output).toContain("\t");
  });

  it("formats object literals", () => {
    const r = formatJs('const x={a:1,b:2};');
    expect(r.error).toBeNull();
    expect(r.output).toContain("const x");
  });

  it("formats arrow functions", () => {
    const r = formatJs("const fn=(x)=>x*2;");
    expect(r.error).toBeNull();
    expect(r.output).toContain("const fn");
  });
});
