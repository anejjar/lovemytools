import { describe, it, expect } from "vitest";
import { isValidIp, parseLatLng } from "./logic";

describe("isValidIp", () => {
  it("validates IPv4", () => {
    expect(isValidIp("192.168.1.1")).toBe(true);
    expect(isValidIp("8.8.8.8")).toBe(true);
    expect(isValidIp("0.0.0.0")).toBe(true);
  });

  it("validates IPv6", () => {
    expect(isValidIp("2001:db8::1")).toBe(true);
    expect(isValidIp("::1")).toBe(true);
  });

  it("rejects invalid IPs", () => {
    expect(isValidIp("not-an-ip")).toBe(false);
    expect(isValidIp("256.1.1.1")).toBe(false);
    expect(isValidIp("")).toBe(false);
  });

  it("rejects partial IPs", () => {
    expect(isValidIp("192.168")).toBe(false);
  });
});

describe("parseLatLng", () => {
  it("parses valid lat,lng string", () => {
    const result = parseLatLng("37.7749,-122.4194");
    expect(result?.lat).toBeCloseTo(37.7749);
    expect(result?.lng).toBeCloseTo(-122.4194);
  });

  it("returns null for invalid format", () => {
    expect(parseLatLng("invalid")).toBeNull();
    expect(parseLatLng("37.7749")).toBeNull();
    expect(parseLatLng("")).toBeNull();
  });

  it("returns null for NaN", () => {
    expect(parseLatLng("abc,def")).toBeNull();
  });
});
