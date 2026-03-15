import { describe, it, expect } from "vitest";
import { generateSlug, slugToTitle, isValidSlug } from "./logic";

describe("generateSlug", () => {
  it("converts spaces to hyphens", () => expect(generateSlug("Hello World")).toBe("hello-world"));
  it("removes special characters", () => expect(generateSlug("Hello, World!")).toBe("hello-world"));
  it("strips diacritics", () => expect(generateSlug("café résumé")).toBe("cafe-resume"));
  it("uses underscore separator", () => expect(generateSlug("Hello World", { separator: "_" })).toBe("hello_world"));
  it("preserves case when lowercase=false", () => expect(generateSlug("Hello World", { lowercase: false })).toBe("Hello-World"));
  it("respects maxLength", () => expect(generateSlug("hello world foo", { maxLength: 10 }).length).toBeLessThanOrEqual(10));
  it("collapses multiple spaces", () => expect(generateSlug("hello   world")).toBe("hello-world"));
  it("returns empty for empty input", () => expect(generateSlug("")).toBe(""));
  it("handles numbers", () => expect(generateSlug("top 10 tools")).toBe("top-10-tools"));
});

describe("slugToTitle", () => {
  it("converts slug to title", () => expect(slugToTitle("hello-world")).toBe("Hello World"));
  it("handles underscores", () => expect(slugToTitle("hello_world")).toBe("Hello World"));
});

describe("isValidSlug", () => {
  it("validates correct slug", () => expect(isValidSlug("hello-world")).toBe(true));
  it("rejects uppercase", () => expect(isValidSlug("Hello-World")).toBe(false));
  it("rejects trailing hyphen", () => expect(isValidSlug("hello-")).toBe(false));
  it("rejects spaces", () => expect(isValidSlug("hello world")).toBe(false));
});
