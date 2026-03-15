import { describe, it, expect } from "vitest";
import { convertBytes } from "./logic";

describe("convertBytes", () => {
  it("converts 1 KB to bytes", () => {
    const r = convertBytes("1", "KB");
    expect(r.error).toBeNull();
    expect(r.results.B).toBe("1000");
  });

  it("converts 1 MB to KB", () => {
    const r = convertBytes("1", "MB");
    expect(r.results.KB).toBe("1000");
    expect(r.results.B).toBe("1000000");
  });

  it("converts 1 GiB to MiB", () => {
    const r = convertBytes("1", "GiB");
    expect(r.results.MiB).toBe("1024");
  });

  it("converts 1024 bytes to KiB", () => {
    const r = convertBytes("1024", "B");
    expect(r.results.KiB).toBe("1");
  });

  it("converts 1 GB to GiB (different values)", () => {
    const r = convertBytes("1", "GB");
    const gib = parseFloat(r.results.GiB);
    expect(gib).toBeCloseTo(0.931, 2);
  });

  it("returns error for negative number", () => {
    const r = convertBytes("-1", "MB");
    expect(r.error).not.toBeNull();
  });

  it("returns empty for empty input", () => {
    const r = convertBytes("  ", "MB");
    expect(r.results.B).toBe("");
    expect(r.error).toBeNull();
  });

  it("returns error for non-numeric input", () => {
    const r = convertBytes("abc", "MB");
    expect(r.error).not.toBeNull();
  });
});
