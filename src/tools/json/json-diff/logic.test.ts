import { describe, it, expect } from "vitest";
import { diffJson, parseJsonSafe } from "./logic";

describe("parseJsonSafe", () => {
  it("parses valid JSON", () => {
    expect(parseJsonSafe('{"a":1}').error).toBeNull();
    expect(parseJsonSafe('{"a":1}').parsed).toEqual({ a: 1 });
  });

  it("returns error for invalid JSON", () => {
    expect(parseJsonSafe("{bad}").error).not.toBeNull();
  });

  it("returns null parsed for empty input", () => {
    expect(parseJsonSafe("").parsed).toBeNull();
    expect(parseJsonSafe("").error).toBeNull();
  });
});

describe("diffJson", () => {
  it("returns no diff for identical JSON", () => {
    const r = diffJson('{"a":1}', '{"a":1}');
    expect(r.error).toBeNull();
    expect(r.additions).toBe(0);
    expect(r.deletions).toBe(0);
  });

  it("detects added key", () => {
    const r = diffJson('{"a":1}', '{"a":1,"b":2}');
    expect(r.error).toBeNull();
    expect(r.additions).toBeGreaterThan(0);
  });

  it("detects removed key", () => {
    const r = diffJson('{"a":1,"b":2}', '{"a":1}');
    expect(r.error).toBeNull();
    expect(r.deletions).toBeGreaterThan(0);
  });

  it("returns error for invalid left JSON", () => {
    const r = diffJson("{bad}", '{"a":1}');
    expect(r.error).not.toBeNull();
    expect(r.error).toContain("Left");
  });

  it("returns error for invalid right JSON", () => {
    const r = diffJson('{"a":1}', "{bad}");
    expect(r.error).not.toBeNull();
    expect(r.error).toContain("Right");
  });

  it("returns empty diff for two empty inputs", () => {
    const r = diffJson("", "");
    expect(r.error).toBeNull();
    expect(r.diff).toHaveLength(0);
  });

  it("diff lines have added/removed flags", () => {
    const r = diffJson('{"a":1}', '{"a":2}');
    expect(r.error).toBeNull();
    const hasAdded = r.diff.some((l) => l.added);
    const hasRemoved = r.diff.some((l) => l.removed);
    expect(hasAdded).toBe(true);
    expect(hasRemoved).toBe(true);
  });
});
