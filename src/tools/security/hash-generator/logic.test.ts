import { describe, it, expect } from "vitest";
import { generateHash, HASH_LENGTHS } from "./logic";

describe("generateHash", () => {
  const input = "hello";

  it("generates MD5 hash", () => {
    const r = generateHash(input, "MD5");
    expect(r.error).toBeNull();
    expect(r.hash).toBe("5d41402abc4b2a76b9719d911017c592");
    expect(r.hash.length).toBe(HASH_LENGTHS.MD5);
  });

  it("generates SHA1 hash", () => {
    const r = generateHash(input, "SHA1");
    expect(r.error).toBeNull();
    expect(r.hash).toBe("aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d");
    expect(r.hash.length).toBe(HASH_LENGTHS.SHA1);
  });

  it("generates SHA256 hash", () => {
    const r = generateHash(input, "SHA256");
    expect(r.error).toBeNull();
    expect(r.hash.length).toBe(HASH_LENGTHS.SHA256);
    expect(r.hash).toBe("2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824");
  });

  it("generates SHA512 hash", () => {
    const r = generateHash(input, "SHA512");
    expect(r.error).toBeNull();
    expect(r.hash.length).toBe(HASH_LENGTHS.SHA512);
  });

  it("generates SHA224 hash", () => {
    const r = generateHash(input, "SHA224");
    expect(r.hash.length).toBe(HASH_LENGTHS.SHA224);
  });

  it("generates SHA384 hash", () => {
    const r = generateHash(input, "SHA384");
    expect(r.hash.length).toBe(HASH_LENGTHS.SHA384);
  });

  it("returns empty for empty input", () => {
    expect(generateHash("", "SHA256").hash).toBe("");
  });

  it("different inputs produce different hashes", () => {
    const h1 = generateHash("hello", "SHA256").hash;
    const h2 = generateHash("world", "SHA256").hash;
    expect(h1).not.toBe(h2);
  });

  it("same input always produces same hash", () => {
    const h1 = generateHash("test123", "MD5").hash;
    const h2 = generateHash("test123", "MD5").hash;
    expect(h1).toBe(h2);
  });
});
