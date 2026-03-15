import { describe, it, expect } from "vitest";
import { generateHmac } from "./logic";

describe("generateHmac", () => {
  it("generates HMAC-SHA256", () => {
    const r = generateHmac("hello", "secret", "SHA256");
    expect(r.error).toBeNull();
    expect(r.hash.length).toBe(64);
  });

  it("generates HMAC-SHA512", () => {
    const r = generateHmac("hello", "secret", "SHA512");
    expect(r.error).toBeNull();
    expect(r.hash.length).toBe(128);
  });

  it("generates HMAC-SHA1", () => {
    const r = generateHmac("hello", "secret", "SHA1");
    expect(r.error).toBeNull();
    expect(r.hash.length).toBe(40);
  });

  it("generates HMAC-MD5", () => {
    const r = generateHmac("hello", "secret", "MD5");
    expect(r.error).toBeNull();
    expect(r.hash.length).toBe(32);
  });

  it("returns empty when message is empty", () => {
    expect(generateHmac("", "secret", "SHA256").hash).toBe("");
  });

  it("returns empty when secret is empty", () => {
    expect(generateHmac("hello", "", "SHA256").hash).toBe("");
  });

  it("different secrets produce different HMACs", () => {
    const a = generateHmac("hello", "secret1", "SHA256").hash;
    const b = generateHmac("hello", "secret2", "SHA256").hash;
    expect(a).not.toBe(b);
  });

  it("same inputs always produce same HMAC", () => {
    const a = generateHmac("test", "key", "SHA256").hash;
    const b = generateHmac("test", "key", "SHA256").hash;
    expect(a).toBe(b);
  });
});
