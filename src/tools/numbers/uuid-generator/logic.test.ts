import { describe, it, expect } from "vitest";
import { generateUUID, generateUUIDs, isValidUUID } from "./logic";

describe("generateUUID", () => {
  it("generates valid v4 UUID format", () => {
    const uuid = generateUUID("v4");
    expect(isValidUUID(uuid)).toBe(true);
    expect(uuid[14]).toBe("4"); // version 4
  });

  it("generates valid v7 UUID format", () => {
    const uuid = generateUUID("v7");
    expect(isValidUUID(uuid)).toBe(true);
    expect(uuid[14]).toBe("7"); // version 7
  });

  it("generates unique UUIDs", () => {
    const a = generateUUID("v4");
    const b = generateUUID("v4");
    expect(a).not.toBe(b);
  });
});

describe("generateUUIDs", () => {
  it("generates correct count", () => {
    const uuids = generateUUIDs("v4", 10);
    expect(uuids).toHaveLength(10);
  });

  it("all generated UUIDs are valid", () => {
    const uuids = generateUUIDs("v4", 5);
    uuids.forEach((uuid) => expect(isValidUUID(uuid)).toBe(true));
  });
});

describe("isValidUUID", () => {
  it("accepts valid UUID", () => {
    expect(isValidUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
  });

  it("rejects invalid UUID", () => {
    expect(isValidUUID("not-a-uuid")).toBe(false);
  });
});
