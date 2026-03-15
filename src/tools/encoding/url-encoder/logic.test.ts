import { describe, it, expect } from "vitest";
import { encodeUrl, decodeUrl, encodeUrlQuery } from "./logic";

describe("encodeUrl", () => {
  it("encodes spaces and special chars", () => {
    const r = encodeUrl("hello world & more", true);
    expect(r.error).toBeNull();
    expect(r.output).toBe("hello%20world%20%26%20more");
  });

  it("encodeAll=false preserves URL structure chars", () => {
    const r = encodeUrl("https://example.com/path?q=hello world", false);
    expect(r.error).toBeNull();
    expect(r.output).toContain("hello%20world");
    expect(r.output).toContain("://");
  });

  it("returns empty for empty input", () => {
    expect(encodeUrl("  ").output).toBe("");
    expect(encodeUrl("  ").error).toBeNull();
  });

  it("encodes unicode characters", () => {
    const r = encodeUrl("こんにちは", true);
    expect(r.error).toBeNull();
    expect(r.output).toContain("%");
  });
});

describe("decodeUrl", () => {
  it("decodes percent-encoded string", () => {
    const r = decodeUrl("hello%20world%20%26%20more");
    expect(r.error).toBeNull();
    expect(r.output).toBe("hello world & more");
  });

  it("decodes unicode", () => {
    const encoded = encodeUrl("こんにちは", true).output;
    const r = decodeUrl(encoded);
    expect(r.error).toBeNull();
    expect(r.output).toBe("こんにちは");
  });

  it("returns error for invalid encoding", () => {
    const r = decodeUrl("bad%GGcode");
    expect(r.error).not.toBeNull();
  });

  it("returns empty for empty input", () => {
    expect(decodeUrl("  ").output).toBe("");
  });
});

describe("encodeUrlQuery", () => {
  it("builds query string", () => {
    const q = encodeUrlQuery({ name: "Alice Smith", age: "30" });
    expect(q).toContain("name=Alice%20Smith");
    expect(q).toContain("age=30");
    expect(q).toContain("&");
  });
});
