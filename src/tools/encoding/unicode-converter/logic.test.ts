import { describe, it, expect } from "vitest";
import { textToUnicode, unicodeToText, getCodePointInfo } from "./logic";

describe("textToUnicode", () => {
  it("converts ASCII to U+ format", () => {
    const r = textToUnicode("A", "U+");
    expect(r.output).toBe("U+0041");
  });

  it("converts multiple chars", () => {
    const r = textToUnicode("Hi", "U+");
    expect(r.output).toContain("U+0048");
    expect(r.output).toContain("U+0069");
  });

  it("converts to \\u format", () => {
    const r = textToUnicode("A", "\\u");
    expect(r.output).toBe("\\u0041");
  });

  it("converts to &#x format", () => {
    const r = textToUnicode("A", "&#x");
    expect(r.output).toBe("&#x0041;");
  });

  it("returns empty for empty input", () => {
    expect(textToUnicode("", "U+").output).toBe("");
  });

  it("handles emoji (surrogate pair)", () => {
    const r = textToUnicode("😀", "U+");
    expect(r.output).toContain("U+");
  });
});

describe("unicodeToText", () => {
  it("converts U+ format to text", () => {
    const r = unicodeToText("U+0048 U+0069");
    expect(r.output).toBe("Hi");
  });

  it("converts \\u format to text", () => {
    const r = unicodeToText("\\u0048\\u0069");
    expect(r.output).toBe("Hi");
  });

  it("converts &#x format to text", () => {
    const r = unicodeToText("&#x48;&#x69;");
    expect(r.output).toBe("Hi");
  });

  it("converts decimal entities", () => {
    const r = unicodeToText("&#65;&#66;&#67;");
    expect(r.output).toBe("ABC");
  });

  it("returns empty for empty input", () => {
    expect(unicodeToText("  ").output).toBe("");
  });

  it("round-trips text → unicode → text", () => {
    const original = "Hello";
    const encoded = textToUnicode(original, "U+").output;
    expect(unicodeToText(encoded).output).toBe(original);
  });
});

describe("getCodePointInfo", () => {
  it("returns correct info for A", () => {
    const info = getCodePointInfo("A");
    expect(info.codePoint).toBe(65);
    expect(info.hex).toBe("0041");
    expect(info.name).toBe("U+0041");
  });
});
