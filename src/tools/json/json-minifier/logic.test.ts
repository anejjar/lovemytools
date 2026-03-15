import { describe, it, expect } from "vitest";
import { minifyJson, minifyJsonStats } from "./logic";

describe("minifyJson", () => {
  it("minifies formatted JSON", () => {
    const r = minifyJson('{\n  "a": 1,\n  "b": 2\n}');
    expect(r.error).toBeNull();
    expect(r.output).toBe('{"a":1,"b":2}');
  });

  it("handles already-minified JSON", () => {
    const r = minifyJson('{"x":true}');
    expect(r.error).toBeNull();
    expect(r.output).toBe('{"x":true}');
  });

  it("returns error for invalid JSON", () => {
    const r = minifyJson("{bad: json}");
    expect(r.output).toBe("");
    expect(r.error).not.toBeNull();
  });

  it("returns empty for empty input", () => {
    const r = minifyJson("   ");
    expect(r.output).toBe("");
    expect(r.error).toBeNull();
  });

  it("handles arrays", () => {
    const r = minifyJson('[\n  1,\n  2,\n  3\n]');
    expect(r.output).toBe("[1,2,3]");
  });

  it("handles nested objects", () => {
    const r = minifyJson('{\n  "a": {\n    "b": "c"\n  }\n}');
    expect(r.output).toBe('{"a":{"b":"c"}}');
  });
});

describe("minifyJsonStats", () => {
  it("calculates correct savings", () => {
    const original = '{\n  "a": 1\n}';
    const minified = '{"a":1}';
    const s = minifyJsonStats(original, minified);
    expect(s.originalSize).toBeGreaterThan(s.minifiedSize);
    expect(s.savings).toBe(s.originalSize - s.minifiedSize);
    expect(s.savingsPercent).toBeGreaterThan(0);
  });

  it("returns 0 percent savings when identical", () => {
    const s = minifyJsonStats('{"a":1}', '{"a":1}');
    expect(s.savingsPercent).toBe(0);
    expect(s.savings).toBe(0);
  });

  it("handles empty strings", () => {
    const s = minifyJsonStats("", "");
    expect(s.savingsPercent).toBe(0);
  });
});
