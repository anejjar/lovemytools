import { describe, it, expect } from "vitest";
import { jsToJson, jsonToJs } from "./logic";

describe("jsToJson", () => {
  it("converts simple object", () => {
    const r = jsToJson("{ a: 1, b: 2 }");
    expect(r.error).toBeNull();
    const parsed = JSON.parse(r.output);
    expect(parsed.a).toBe(1);
    expect(parsed.b).toBe(2);
  });

  it("quotes unquoted keys", () => {
    const r = jsToJson("{ foo: 'bar' }");
    expect(r.error).toBeNull();
    expect(r.output).toContain('"foo"');
  });

  it("converts single quotes to double quotes", () => {
    const r = jsToJson("{ key: 'value' }");
    expect(r.error).toBeNull();
    expect(r.output).toContain('"value"');
  });

  it("removes trailing commas", () => {
    const r = jsToJson("{ a: 1, b: 2, }");
    expect(r.error).toBeNull();
    expect(JSON.parse(r.output)).toEqual({ a: 1, b: 2 });
  });

  it("converts undefined to null", () => {
    const r = jsToJson("{ x: undefined }");
    expect(r.error).toBeNull();
    expect(JSON.parse(r.output).x).toBeNull();
  });

  it("handles empty input", () => {
    const r = jsToJson("");
    expect(r.output).toBe("");
    expect(r.error).toBeNull();
  });

  it("handles arrays", () => {
    const r = jsToJson("[1, 2, 3]");
    expect(r.error).toBeNull();
    expect(JSON.parse(r.output)).toEqual([1, 2, 3]);
  });

  it("removes single-line comments", () => {
    const r = jsToJson("{ // comment\na: 1 }");
    expect(r.error).toBeNull();
    expect(JSON.parse(r.output).a).toBe(1);
  });
});

describe("jsonToJs", () => {
  it("pretty-prints valid JSON", () => {
    const r = jsonToJs('{"a":1}');
    expect(r.error).toBeNull();
    expect(r.output).toContain('"a"');
  });

  it("returns error for invalid JSON", () => {
    const r = jsonToJs("{bad json}");
    expect(r.error).not.toBeNull();
    expect(r.output).toBe("");
  });

  it("handles empty input", () => {
    expect(jsonToJs("").output).toBe("");
    expect(jsonToJs("").error).toBeNull();
  });
});
