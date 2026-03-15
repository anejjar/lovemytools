import { describe, it, expect } from "vitest";
import { toRoman, fromRoman } from "./logic";

describe("toRoman", () => {
  it("converts 1 to I", () => expect(toRoman(1).output).toBe("I"));
  it("converts 4 to IV", () => expect(toRoman(4).output).toBe("IV"));
  it("converts 9 to IX", () => expect(toRoman(9).output).toBe("IX"));
  it("converts 14 to XIV", () => expect(toRoman(14).output).toBe("XIV"));
  it("converts 40 to XL", () => expect(toRoman(40).output).toBe("XL"));
  it("converts 90 to XC", () => expect(toRoman(90).output).toBe("XC"));
  it("converts 400 to CD", () => expect(toRoman(400).output).toBe("CD"));
  it("converts 900 to CM", () => expect(toRoman(900).output).toBe("CM"));
  it("converts 2024 to MMXXIV", () => expect(toRoman(2024).output).toBe("MMXXIV"));
  it("converts 3999 to MMMCMXCIX", () => expect(toRoman(3999).output).toBe("MMMCMXCIX"));
  it("returns error for 0", () => expect(toRoman(0).error).not.toBeNull());
  it("returns error for 4000", () => expect(toRoman(4000).error).not.toBeNull());
  it("returns error for negative", () => expect(toRoman(-1).error).not.toBeNull());
});

describe("fromRoman", () => {
  it("converts I to 1", () => expect(fromRoman("I").output).toBe("1"));
  it("converts IV to 4", () => expect(fromRoman("IV").output).toBe("4"));
  it("converts XIV to 14", () => expect(fromRoman("XIV").output).toBe("14"));
  it("converts MMXXIV to 2024", () => expect(fromRoman("MMXXIV").output).toBe("2024"));
  it("handles lowercase input", () => expect(fromRoman("xiv").output).toBe("14"));
  it("returns error for invalid chars", () => expect(fromRoman("ABC").error).not.toBeNull());
  it("returns empty for empty input", () => expect(fromRoman("").output).toBe(""));

  it("round-trips arabic → roman → arabic", () => {
    for (const n of [1, 4, 9, 14, 42, 99, 2024, 3999]) {
      const roman = toRoman(n).output;
      expect(fromRoman(roman).output).toBe(String(n));
    }
  });
});
