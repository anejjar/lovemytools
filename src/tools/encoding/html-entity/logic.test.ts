import { describe, it, expect } from "vitest";
import { encodeHtmlEntities, decodeHtmlEntities } from "./logic";

describe("encodeHtmlEntities", () => {
  it("encodes &, <, >, and quotes", () => {
    const r = encodeHtmlEntities('<div class="test">Hello & world</div>');
    expect(r.output).toBe("&lt;div class=&quot;test&quot;&gt;Hello &amp; world&lt;/div&gt;");
  });

  it("encodes special symbols", () => {
    const r = encodeHtmlEntities("© 2025 — Price: €100");
    expect(r.output).toContain("&copy;");
    expect(r.output).toContain("&mdash;");
    expect(r.output).toContain("&euro;");
  });

  it("returns empty for empty input", () => {
    expect(encodeHtmlEntities("").output).toBe("");
  });

  it("leaves plain text unchanged", () => {
    expect(encodeHtmlEntities("hello world").output).toBe("hello world");
  });
});

describe("decodeHtmlEntities", () => {
  it("decodes named entities", () => {
    const r = decodeHtmlEntities("&lt;p&gt;Hello &amp; world&lt;/p&gt;");
    expect(r.output).toBe("<p>Hello & world</p>");
  });

  it("decodes numeric decimal entities", () => {
    const r = decodeHtmlEntities("&#65;&#66;&#67;");
    expect(r.output).toBe("ABC");
  });

  it("decodes numeric hex entities", () => {
    const r = decodeHtmlEntities("&#x41;&#x42;");
    expect(r.output).toBe("AB");
  });

  it("round-trips encode → decode", () => {
    const original = '<script>alert("xss & injection")</script>';
    const encoded = encodeHtmlEntities(original).output;
    const decoded = decodeHtmlEntities(encoded).output;
    expect(decoded).toBe(original);
  });

  it("returns empty for empty input", () => {
    expect(decodeHtmlEntities("").output).toBe("");
  });
});
