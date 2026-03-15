import { describe, it, expect } from "vitest";
import { testRegex, highlightMatches } from "./logic";

describe("testRegex", () => {
  it("finds simple matches", () => {
    const r = testRegex("\\d+", "g", "abc 123 def 456");
    expect(r.error).toBeNull();
    expect(r.matchCount).toBe(2);
    expect(r.matches[0].value).toBe("123");
    expect(r.matches[1].value).toBe("456");
  });

  it("returns error for invalid regex", () => {
    const r = testRegex("[invalid", "g", "test");
    expect(r.error).not.toBeNull();
    expect(r.isValid).toBe(false);
    expect(r.matchCount).toBe(0);
  });

  it("returns empty matches for no match", () => {
    const r = testRegex("xyz", "g", "hello world");
    expect(r.matchCount).toBe(0);
    expect(r.matches).toHaveLength(0);
  });

  it("returns empty for empty pattern", () => {
    const r = testRegex("", "g", "hello");
    expect(r.matches).toHaveLength(0);
    expect(r.isValid).toBe(true);
  });

  it("captures named groups", () => {
    const r = testRegex("(?<year>\\d{4})-(?<month>\\d{2})", "g", "2025-01 and 2024-12");
    expect(r.matchCount).toBe(2);
    expect(r.matches[0].groups?.year).toBe("2025");
    expect(r.matches[0].groups?.month).toBe("01");
  });

  it("supports case-insensitive flag", () => {
    const r = testRegex("hello", "gi", "Hello HELLO hello");
    expect(r.matchCount).toBe(3);
  });
});

describe("highlightMatches", () => {
  it("splits text around matches", () => {
    const r = testRegex("\\d+", "g", "abc 123 def");
    const parts = highlightMatches("abc 123 def", r.matches);
    expect(parts).toHaveLength(3);
    expect(parts[0]).toEqual({ text: "abc ", isMatch: false });
    expect(parts[1]).toEqual({ text: "123", isMatch: true });
    expect(parts[2]).toEqual({ text: " def", isMatch: false });
  });

  it("returns single part when no matches", () => {
    const parts = highlightMatches("hello", []);
    expect(parts).toHaveLength(1);
    expect(parts[0].isMatch).toBe(false);
  });
});
