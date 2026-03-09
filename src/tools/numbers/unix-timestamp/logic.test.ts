import { describe, it, expect } from "vitest";
import { timestampToDate, dateToTimestamp, isMilliseconds } from "./logic";

describe("isMilliseconds", () => {
  it("detects millisecond timestamps", () => {
    expect(isMilliseconds(1700000000000)).toBe(true);
  });

  it("detects second timestamps", () => {
    expect(isMilliseconds(1700000000)).toBe(false);
  });
});

describe("timestampToDate", () => {
  it("converts seconds to date", () => {
    const result = timestampToDate(0);
    expect(result.iso).toBe("1970-01-01T00:00:00.000Z");
  });

  it("converts milliseconds to date", () => {
    const result = timestampToDate(1000000000000); // 13 digits = ms
    expect(result.iso).toBe(new Date(1000000000000).toISOString());
    expect(result.timestamp).toBe(1000000000);
    expect(result.timestampMs).toBe(1000000000000);
  });

  it("returns timestamp and timestampMs", () => {
    const result = timestampToDate(1700000000);
    expect(result.timestamp).toBe(1700000000);
    expect(result.timestampMs).toBe(1700000000000);
  });
});

describe("dateToTimestamp", () => {
  it("converts ISO date string", () => {
    const result = dateToTimestamp("1970-01-01T00:00:00Z");
    expect(result?.seconds).toBe(0);
    expect(result?.ms).toBe(0);
  });

  it("returns null for invalid date", () => {
    expect(dateToTimestamp("not-a-date")).toBeNull();
  });
});
