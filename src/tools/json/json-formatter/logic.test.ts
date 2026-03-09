import { describe, it, expect } from "vitest";
import { formatJson, minifyJson, validateJson } from "./logic";

describe("formatJson", () => {
  it("formats valid JSON", () => {
    const result = formatJson('{"a":1,"b":2}', 2);
    expect(result.error).toBeNull();
    expect(result.output).toContain('"a": 1');
  });

  it("returns error for invalid JSON", () => {
    const result = formatJson("{invalid}", 2);
    expect(result.error).not.toBeNull();
    expect(result.output).toBe("");
  });

  it("returns empty for empty input", () => {
    const result = formatJson("", 2);
    expect(result.output).toBe("");
    expect(result.error).toBeNull();
  });
});

describe("minifyJson", () => {
  it("minifies formatted JSON", () => {
    const result = minifyJson('{\n  "a": 1,\n  "b": 2\n}');
    expect(result.error).toBeNull();
    expect(result.output).toBe('{"a":1,"b":2}');
  });
});

describe("validateJson", () => {
  it("validates correct JSON", () => {
    expect(validateJson('{"x":1}').valid).toBe(true);
  });

  it("rejects invalid JSON", () => {
    expect(validateJson("{bad}").valid).toBe(false);
  });

  it("returns valid for empty string", () => {
    expect(validateJson("").valid).toBe(true);
  });
});
