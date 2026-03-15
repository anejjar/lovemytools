import { describe, it, expect } from "vitest";
import { formatHtml } from "./logic";

describe("formatHtml", () => {
  it("formats minified HTML", () => {
    const r = formatHtml("<div><p>Hello</p></div>");
    expect(r.error).toBeNull();
    expect(r.output).toContain("<div>");
    expect(r.output).toContain("<p>Hello</p>");
  });

  it("handles empty input", () => {
    const r = formatHtml("");
    expect(r.output).toBe("");
    expect(r.error).toBeNull();
  });

  it("respects 4-space indent", () => {
    const r = formatHtml("<div><p>text</p></div>", 4);
    expect(r.error).toBeNull();
    expect(r.output).toContain("    ");
  });

  it("respects tab indent", () => {
    const r = formatHtml("<div><p>text</p></div>", "tab");
    expect(r.error).toBeNull();
    expect(r.output).toContain("\t");
  });

  it("formats nested elements on separate lines", () => {
    const r = formatHtml("<ul><li>a</li><li>b</li></ul>");
    expect(r.error).toBeNull();
    const lines = r.output.split("\n").filter(Boolean);
    expect(lines.length).toBeGreaterThan(1);
  });

  it("formats full HTML document", () => {
    const r = formatHtml("<!DOCTYPE html><html><head><title>Test</title></head><body><h1>Hello</h1></body></html>");
    expect(r.error).toBeNull();
    expect(r.output).toContain("<!DOCTYPE html>");
    expect(r.output).toContain("<html>");
  });
});
