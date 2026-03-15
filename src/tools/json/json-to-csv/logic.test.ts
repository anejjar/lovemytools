import { describe, it, expect } from "vitest";
import { jsonToCsv, csvToJson } from "./logic";

describe("jsonToCsv", () => {
  it("converts array of objects to CSV", () => {
    const r = jsonToCsv('[{"name":"Alice","age":30},{"name":"Bob","age":25}]');
    expect(r.error).toBeNull();
    expect(r.rowCount).toBe(2);
    expect(r.columnCount).toBe(2);
    expect(r.output).toContain("name,age");
    expect(r.output).toContain("Alice,30");
    expect(r.output).toContain("Bob,25");
  });

  it("converts single object to CSV", () => {
    const r = jsonToCsv('{"key":"val","num":42}');
    expect(r.error).toBeNull();
    expect(r.rowCount).toBe(1);
    expect(r.output).toContain("key,num");
    expect(r.output).toContain("val,42");
  });

  it("returns error for invalid JSON", () => {
    const r = jsonToCsv("not json");
    expect(r.error).not.toBeNull();
    expect(r.rowCount).toBe(0);
  });

  it("returns empty for empty input", () => {
    const r = jsonToCsv("  ");
    expect(r.output).toBe("");
    expect(r.error).toBeNull();
  });

  it("supports custom delimiter", () => {
    const r = jsonToCsv('[{"a":1,"b":2}]', ";");
    expect(r.output).toContain("a;b");
    expect(r.output).toContain("1;2");
  });

  it("escapes values containing delimiter", () => {
    const r = jsonToCsv('[{"name":"Smith, John"}]');
    expect(r.output).toContain('"Smith, John"');
  });
});

describe("csvToJson", () => {
  it("converts CSV to JSON array", () => {
    const r = csvToJson("name,age\nAlice,30\nBob,25");
    expect(r.error).toBeNull();
    expect(r.rowCount).toBe(2);
    const parsed = JSON.parse(r.output);
    expect(parsed[0].name).toBe("Alice");
    expect(parsed[1].age).toBe("25");
  });

  it("returns empty array for header-only CSV", () => {
    const r = csvToJson("name,age");
    expect(r.error).toBeNull();
    expect(r.output).toBe("[]");
  });

  it("returns empty for empty input", () => {
    const r = csvToJson("  ");
    expect(r.output).toBe("");
    expect(r.error).toBeNull();
  });
});
