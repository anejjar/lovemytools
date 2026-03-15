import { describe, it, expect } from "vitest";
import { renderMarkdown, countElements } from "./logic";

describe("renderMarkdown", () => {
  it("renders heading", () => {
    const r = renderMarkdown("# Hello");
    expect(r.error).toBeNull();
    expect(r.html).toContain("<h1");
    expect(r.html).toContain("Hello");
  });

  it("renders bold text", () => {
    const r = renderMarkdown("**bold**");
    expect(r.html).toContain("<strong>bold</strong>");
  });

  it("renders italic text", () => {
    const r = renderMarkdown("_italic_");
    expect(r.html).toContain("<em>italic</em>");
  });

  it("renders link", () => {
    const r = renderMarkdown("[click](https://example.com)");
    expect(r.html).toContain('<a href="https://example.com"');
    expect(r.html).toContain("click");
  });

  it("renders code block", () => {
    const r = renderMarkdown("```js\nconsole.log('hi')\n```");
    expect(r.html).toContain("<code");
  });

  it("renders unordered list", () => {
    const r = renderMarkdown("- item 1\n- item 2");
    expect(r.html).toContain("<ul>");
    expect(r.html).toContain("<li>");
  });

  it("returns empty for empty input", () => {
    expect(renderMarkdown("   ").html).toBe("");
  });
});

describe("countElements", () => {
  it("counts headings", () => {
    expect(countElements("# H1\n## H2\n### H3").headings).toBe(3);
  });

  it("counts links", () => {
    expect(countElements("[a](b) and [c](d)").links).toBe(2);
  });

  it("counts code blocks", () => {
    expect(countElements("```\ncode\n```").codeBlocks).toBe(1);
  });
});
