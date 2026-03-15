import { describe, it, expect } from "vitest";
import { parseUrl, buildUrl } from "./logic";

describe("parseUrl", () => {
  const BASE = "https://user:pass@example.com:8080/path/to/page?a=1&b=2&b=3#section";

  it("parses protocol", () => expect(parseUrl(BASE).parsed?.protocol).toBe("https:"));
  it("parses hostname", () => expect(parseUrl(BASE).parsed?.hostname).toBe("example.com"));
  it("parses port", () => expect(parseUrl(BASE).parsed?.port).toBe("8080"));
  it("parses pathname", () => expect(parseUrl(BASE).parsed?.pathname).toBe("/path/to/page"));
  it("parses hash", () => expect(parseUrl(BASE).parsed?.hash).toBe("#section"));
  it("parses username", () => expect(parseUrl(BASE).parsed?.username).toBe("user"));
  it("parses password", () => expect(parseUrl(BASE).parsed?.password).toBe("pass"));

  it("parses query params", () => {
    const params = parseUrl(BASE).parsed?.queryParams;
    expect(params?.a).toEqual(["1"]);
    expect(params?.b).toEqual(["2", "3"]);
  });

  it("returns error for invalid URL", () => {
    const r = parseUrl("not-a-url");
    expect(r.error).not.toBeNull();
    expect(r.parsed).toBeNull();
  });

  it("returns null for empty input", () => {
    const r = parseUrl("");
    expect(r.parsed).toBeNull();
    expect(r.error).toBeNull();
  });

  it("handles URL without query string", () => {
    const r = parseUrl("https://example.com/");
    expect(r.parsed?.search).toBe("");
    expect(r.parsed?.queryParams).toEqual({});
  });
});

describe("buildUrl", () => {
  it("adds query params", () => {
    const result = buildUrl("https://example.com", { foo: "bar" });
    expect(result).toContain("foo=bar");
  });

  it("returns empty for invalid base", () => {
    expect(buildUrl("not-valid", { a: "1" })).toBe("");
  });
});
