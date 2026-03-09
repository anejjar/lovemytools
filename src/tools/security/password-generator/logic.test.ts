import { describe, it, expect } from "vitest";
import { generatePassword, calculateEntropy, getStrengthLabel, generatePasswords } from "./logic";
import type { PasswordOptions } from "./logic";

const base: PasswordOptions = { length: 16, uppercase: true, lowercase: true, numbers: true, symbols: true };

describe("generatePassword", () => {
  it("returns correct length", () => {
    expect(generatePassword(base)).toHaveLength(16);
  });

  it("returns empty string when no charsets selected", () => {
    expect(generatePassword({ ...base, uppercase: false, lowercase: false, numbers: false, symbols: false })).toBe("");
  });

  it("only uses uppercase when set", () => {
    const pw = generatePassword({ ...base, lowercase: false, numbers: false, symbols: false });
    expect(pw).toMatch(/^[A-Z]+$/);
  });

  it("generates different passwords on each call", () => {
    const a = generatePassword(base);
    const b = generatePassword(base);
    // Extremely unlikely to be equal
    expect(a).not.toBe(b);
  });
});

describe("calculateEntropy", () => {
  it("returns 0 when no charsets", () => {
    expect(calculateEntropy({ ...base, uppercase: false, lowercase: false, numbers: false, symbols: false })).toBe(0);
  });

  it("increases with length", () => {
    const short = calculateEntropy({ ...base, length: 8 });
    const long = calculateEntropy({ ...base, length: 32 });
    expect(long).toBeGreaterThan(short);
  });
});

describe("getStrengthLabel", () => {
  it("returns Very Weak for low entropy", () => {
    expect(getStrengthLabel(10).label).toBe("Very Weak");
  });

  it("returns Very Strong for high entropy", () => {
    expect(getStrengthLabel(100).label).toBe("Very Strong");
  });
});

describe("generatePasswords", () => {
  it("generates correct count", () => {
    expect(generatePasswords(base, 5)).toHaveLength(5);
  });
});
