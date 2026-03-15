import { describe, it, expect } from "vitest";
import { searchMime, lookupByExtension, lookupByMimeType, MIME_DB } from "./logic";

describe("searchMime", () => {
  it("returns all entries for empty query", () => {
    expect(searchMime("").length).toBe(MIME_DB.length);
  });

  it("finds by mime type substring", () => {
    const results = searchMime("json");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.mimeType === "application/json")).toBe(true);
  });

  it("finds by extension", () => {
    const results = searchMime("png");
    expect(results.some((r) => r.extensions.includes("png"))).toBe(true);
  });

  it("finds by description", () => {
    const results = searchMime("PDF");
    expect(results.some((r) => r.mimeType === "application/pdf")).toBe(true);
  });

  it("finds by category", () => {
    const results = searchMime("image");
    expect(results.every((r) => r.category === "Image" || r.mimeType.includes("image"))).toBe(true);
  });

  it("returns empty for no matches", () => {
    expect(searchMime("xyznotfound123")).toHaveLength(0);
  });

  it("is case-insensitive", () => {
    expect(searchMime("JSON").length).toBeGreaterThan(0);
    expect(searchMime("json").length).toBeGreaterThan(0);
  });
});

describe("lookupByExtension", () => {
  it("finds png", () => expect(lookupByExtension("png")?.mimeType).toBe("image/png"));
  it("finds .jpg with dot", () => expect(lookupByExtension(".jpg")?.mimeType).toBe("image/jpeg"));
  it("finds mp3", () => expect(lookupByExtension("mp3")?.mimeType).toBe("audio/mpeg"));
  it("returns null for unknown", () => expect(lookupByExtension("xyz123")).toBeNull());
});

describe("lookupByMimeType", () => {
  it("finds application/json", () => {
    const entry = lookupByMimeType("application/json");
    expect(entry?.extensions).toContain("json");
  });

  it("is case-insensitive", () => {
    expect(lookupByMimeType("IMAGE/PNG")?.mimeType).toBe("image/png");
  });

  it("returns null for unknown", () => {
    expect(lookupByMimeType("application/unknown-xyz")).toBeNull();
  });
});
