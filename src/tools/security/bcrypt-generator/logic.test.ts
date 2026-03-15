import { describe, it, expect } from "vitest";
import { hashBcrypt, verifyBcrypt } from "./logic";

describe("hashBcrypt", () => {
  it("generates a bcrypt hash", () => {
    const r = hashBcrypt("password123", 8);
    expect(r.error).toBeNull();
    expect(r.hash).toMatch(/^\$2[aby]\$/);
  });

  it("hash starts with cost factor", () => {
    const r = hashBcrypt("test", 10);
    expect(r.hash).toContain("$10$");
  });

  it("returns empty for empty password", () => {
    expect(hashBcrypt("", 10).hash).toBe("");
  });

  it("same password produces different hashes (salting)", () => {
    const a = hashBcrypt("password", 8).hash;
    const b = hashBcrypt("password", 8).hash;
    expect(a).not.toBe(b);
  });
}, { timeout: 30000 });

describe("verifyBcrypt", () => {
  it("verifies correct password", () => {
    const hash = hashBcrypt("mypassword", 8).hash;
    const r = verifyBcrypt("mypassword", hash);
    expect(r.match).toBe(true);
    expect(r.error).toBeNull();
  });

  it("rejects wrong password", () => {
    const hash = hashBcrypt("correct", 8).hash;
    const r = verifyBcrypt("wrong", hash);
    expect(r.match).toBe(false);
  });

  it("returns error for invalid hash", () => {
    const r = verifyBcrypt("password", "notahash");
    expect(r.match).toBe(false);
    expect(r.error).not.toBeNull();
  });

  it("returns false for empty inputs", () => {
    expect(verifyBcrypt("", "$2b$10$abc").match).toBe(false);
    expect(verifyBcrypt("pass", "").match).toBe(false);
  });
}, { timeout: 30000 });
