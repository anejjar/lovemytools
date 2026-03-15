import { describe, it, expect } from "vitest";
import { convertBase, formatBinary } from "./logic";

describe("convertBase", () => {
  it("converts decimal to all bases", () => {
    const r = convertBase("255", 10);
    expect(r.error).toBeNull();
    expect(r.binary).toBe("11111111");
    expect(r.octal).toBe("377");
    expect(r.decimal).toBe("255");
    expect(r.hex).toBe("FF");
  });

  it("converts binary to all bases", () => {
    const r = convertBase("1010", 2);
    expect(r.error).toBeNull();
    expect(r.decimal).toBe("10");
    expect(r.hex).toBe("A");
    expect(r.octal).toBe("12");
  });

  it("converts hex to all bases", () => {
    const r = convertBase("FF", 16);
    expect(r.error).toBeNull();
    expect(r.decimal).toBe("255");
    expect(r.binary).toBe("11111111");
  });

  it("converts octal to decimal", () => {
    const r = convertBase("17", 8);
    expect(r.decimal).toBe("15");
    expect(r.hex).toBe("F");
  });

  it("returns error for invalid binary", () => {
    const r = convertBase("129", 2);
    expect(r.error).not.toBeNull();
  });

  it("returns error for invalid hex", () => {
    const r = convertBase("GGG", 16);
    expect(r.error).not.toBeNull();
  });

  it("returns empty for empty input", () => {
    const r = convertBase("  ", 10);
    expect(r.decimal).toBe("");
    expect(r.error).toBeNull();
  });

  it("handles zero", () => {
    const r = convertBase("0", 10);
    expect(r.binary).toBe("0");
    expect(r.hex).toBe("0");
  });
});

describe("formatBinary", () => {
  it("groups binary in nibbles", () => {
    expect(formatBinary("11111111")).toBe("1111 1111");
  });
});
