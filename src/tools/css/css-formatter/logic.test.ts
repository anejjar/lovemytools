import { describe, it, expect } from "vitest";
import { formatCss } from "./logic";

describe("formatCss", () => {
  it("formats minified CSS", () => {
    const r = formatCss("body{color:red;margin:0}");
    expect(r.error).toBeNull();
    expect(r.output).toContain("body {");
    expect(r.output).toContain("color: red;");
  });

  it("uses 2-space indent by default", () => {
    const r = formatCss("h1{color:blue}");
    expect(r.output).toContain("  color:");
  });

  it("uses 4-space indent when specified", () => {
    const r = formatCss("h1{color:blue}", 4);
    expect(r.output).toContain("    color:");
  });

  it("uses tab indent when specified", () => {
    const r = formatCss("h1{color:blue}", "tab");
    expect(r.output).toContain("\tcolor:");
  });

  it("returns empty for empty input", () => {
    expect(formatCss("   ").output).toBe("");
    expect(formatCss("   ").error).toBeNull();
  });

  it("handles multiple rules", () => {
    const r = formatCss("h1{color:red}p{margin:0}");
    expect(r.output).toContain("h1 {");
    expect(r.output).toContain("p {");
  });

  it("handles media queries", () => {
    const r = formatCss("@media(max-width:768px){body{display:none}}");
    expect(r.error).toBeNull();
    expect(r.output).toContain("@media");
  });
});
