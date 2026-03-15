import { describe, it, expect } from "vitest";
import { htmlToMarkdown } from "./logic";

describe("htmlToMarkdown", () => {
  it("converts headings", () => {
    const r = htmlToMarkdown("<h1>Title</h1>");
    expect(r.error).toBeNull();
    expect(r.output).toContain("# Title");
  });

  it("converts h2-h6", () => {
    expect(htmlToMarkdown("<h2>Sub</h2>").output).toContain("## Sub");
    expect(htmlToMarkdown("<h3>Sub</h3>").output).toContain("### Sub");
  });

  it("converts bold", () => {
    expect(htmlToMarkdown("<strong>bold</strong>").output).toContain("**bold**");
    expect(htmlToMarkdown("<b>bold</b>").output).toContain("**bold**");
  });

  it("converts italic", () => {
    expect(htmlToMarkdown("<em>italic</em>").output).toContain("_italic_");
    expect(htmlToMarkdown("<i>italic</i>").output).toContain("_italic_");
  });

  it("converts links", () => {
    const r = htmlToMarkdown('<a href="https://example.com">Example</a>');
    expect(r.output).toContain("[Example](https://example.com)");
  });

  it("converts unordered lists", () => {
    const r = htmlToMarkdown("<ul><li>Item A</li><li>Item B</li></ul>");
    expect(r.output).toContain("- Item A");
    expect(r.output).toContain("- Item B");
  });

  it("converts paragraphs", () => {
    const r = htmlToMarkdown("<p>Hello world</p>");
    expect(r.output).toContain("Hello world");
  });

  it("converts inline code", () => {
    const r = htmlToMarkdown("<code>const x = 1</code>");
    expect(r.output).toContain("`const x = 1`");
  });

  it("converts code blocks", () => {
    const r = htmlToMarkdown("<pre><code>const x = 1;</code></pre>");
    expect(r.output).toContain("```");
  });

  it("strips remaining tags", () => {
    const r = htmlToMarkdown("<div class='foo'>text</div>");
    expect(r.output).not.toContain("<div");
    expect(r.output).toContain("text");
  });

  it("decodes HTML entities", () => {
    const r = htmlToMarkdown("<p>Hello &amp; world &lt;3&gt;</p>");
    expect(r.output).toContain("Hello & world <3>");
  });

  it("handles empty input", () => {
    const r = htmlToMarkdown("");
    expect(r.output).toBe("");
    expect(r.error).toBeNull();
  });

  it("removes script tags and content", () => {
    const r = htmlToMarkdown("<script>alert('xss')</script><p>Safe</p>");
    expect(r.output).not.toContain("alert");
    expect(r.output).toContain("Safe");
  });
});
