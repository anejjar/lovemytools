import { describe, it, expect } from "vitest";
import { jsonToYaml, yamlToJson } from "./logic";

describe("jsonToYaml", () => {
  it("converts simple object", () => {
    const r = jsonToYaml('{"name":"Alice","age":30}');
    expect(r.error).toBeNull();
    expect(r.output).toContain("name: Alice");
    expect(r.output).toContain("age: 30");
  });

  it("converts nested object", () => {
    const r = jsonToYaml('{"a":{"b":"c"}}');
    expect(r.error).toBeNull();
    expect(r.output).toContain("a:");
    expect(r.output).toContain("b: c");
  });

  it("converts arrays", () => {
    const r = jsonToYaml('[1,2,3]');
    expect(r.error).toBeNull();
    expect(r.output).toContain("- 1");
  });

  it("returns error for invalid JSON", () => {
    const r = jsonToYaml("{bad}");
    expect(r.error).not.toBeNull();
    expect(r.output).toBe("");
  });

  it("returns empty for empty input", () => {
    const r = jsonToYaml("  ");
    expect(r.output).toBe("");
    expect(r.error).toBeNull();
  });
});

describe("yamlToJson", () => {
  it("converts simple YAML to JSON", () => {
    const r = yamlToJson("name: Alice\nage: 30");
    expect(r.error).toBeNull();
    const parsed = JSON.parse(r.output);
    expect(parsed.name).toBe("Alice");
    expect(parsed.age).toBe(30);
  });

  it("converts YAML array to JSON", () => {
    const r = yamlToJson("- 1\n- 2\n- 3");
    expect(r.error).toBeNull();
    expect(JSON.parse(r.output)).toEqual([1, 2, 3]);
  });

  it("returns error for invalid YAML", () => {
    const r = yamlToJson("key: [unclosed");
    expect(r.error).not.toBeNull();
  });

  it("returns empty for empty input", () => {
    const r = yamlToJson("");
    expect(r.output).toBe("");
    expect(r.error).toBeNull();
  });

  it("roundtrips JSON → YAML → JSON", () => {
    const json = '{"x":1,"y":[2,3]}';
    const yaml = jsonToYaml(json);
    expect(yaml.error).toBeNull();
    const back = yamlToJson(yaml.output);
    expect(back.error).toBeNull();
    expect(JSON.parse(back.output)).toEqual({ x: 1, y: [2, 3] });
  });
});
