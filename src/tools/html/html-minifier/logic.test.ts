import { describe, it, expect } from "vitest";
import { minifyHtml } from "./logic";

describe("minifyHtml", () => {
  it("removes HTML comments", () => {
    const r = minifyHtml("<!-- comment --><p>Hello</p>");
    expect(r.output).not.toContain("<!--");
    expect(r.output).toContain("<p>Hello</p>");
    expect(r.error).toBeNull();
  });

  it("collapses whitespace between tags", () => {
    const r = minifyHtml("<div>  \n  <p>Text</p>  \n  </div>");
    expect(r.output).not.toMatch(/>\s{2,}</);
  });

  it("handles empty input", () => {
    const r = minifyHtml("");
    expect(r.output).toBe("");
    expect(r.originalSize).toBe(0);
    expect(r.error).toBeNull();
  });

  it("calculates size stats", () => {
    const r = minifyHtml("<!-- comment -->\n<div>\n  <p>Hello</p>\n</div>");
    expect(r.originalSize).toBeGreaterThan(0);
    expect(r.minifiedSize).toBeGreaterThan(0);
    expect(r.minifiedSize).toBeLessThanOrEqual(r.originalSize);
    expect(r.savingsPercent).toBeGreaterThanOrEqual(0);
  });

  it("preserves content text", () => {
    const r = minifyHtml("<p>Hello World</p>");
    expect(r.output).toContain("Hello World");
  });

  it("preserves IE conditionals", () => {
    const r = minifyHtml("<!--[if IE]><p>IE only</p><![endif]-->");
    expect(r.output).toContain("<!--[if IE]");
  });

  it("reduces size compared to input", () => {
    const input = `
      <!DOCTYPE html>
      <html>
        <head>
          <!-- meta -->
          <title>Test</title>
        </head>
        <body>
          <p>Hello</p>
        </body>
      </html>
    `;
    const r = minifyHtml(input);
    expect(r.minifiedSize).toBeLessThan(r.originalSize);
  });
});
