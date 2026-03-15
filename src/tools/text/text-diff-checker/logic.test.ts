import { describe, it, expect } from "vitest";
import { diffText } from "./logic";

describe("diffText", () => {
  it("finds no diff for identical text", () => {
    const r = diffText("hello\nworld", "hello\nworld");
    expect(r.additions).toBe(0);
    expect(r.deletions).toBe(0);
  });

  it("detects added lines", () => {
    const r = diffText("hello", "hello\nworld");
    expect(r.additions).toBeGreaterThan(0);
  });

  it("detects removed lines", () => {
    const r = diffText("hello\nworld", "hello");
    expect(r.deletions).toBeGreaterThan(0);
  });

  it("detects changed lines", () => {
    const r = diffText("hello world", "hello earth");
    expect(r.additions).toBeGreaterThan(0);
    expect(r.deletions).toBeGreaterThan(0);
  });

  it("diff lines have correct flags", () => {
    const r = diffText("a\nb", "a\nc");
    const added = r.lines.filter((l) => l.added);
    const removed = r.lines.filter((l) => l.removed);
    expect(added.length).toBeGreaterThan(0);
    expect(removed.length).toBeGreaterThan(0);
  });

  it("works in word mode", () => {
    const r = diffText("hello world", "hello earth", "words");
    expect(r.additions).toBeGreaterThan(0);
    expect(r.deletions).toBeGreaterThan(0);
  });

  it("handles empty inputs", () => {
    const r = diffText("", "");
    expect(r.additions).toBe(0);
    expect(r.deletions).toBe(0);
  });
});
