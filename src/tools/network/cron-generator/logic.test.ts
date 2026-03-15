import { describe, it, expect } from "vitest";
import { parseCron } from "./logic";

describe("parseCron", () => {
  it("rejects expressions with wrong field count", () => {
    expect(parseCron("* * * *").error).not.toBeNull();
    expect(parseCron("* * * * * *").error).not.toBeNull();
  });

  it("parses '* * * * *'", () => {
    const r = parseCron("* * * * *");
    expect(r.error).toBeNull();
    expect(r.parts?.minute).toBe("*");
  });

  it("parses '0 * * * *'", () => {
    const r = parseCron("0 * * * *");
    expect(r.error).toBeNull();
    expect(r.description).toContain("every hour");
  });

  it("parses '*/15 * * * *'", () => {
    const r = parseCron("*/15 * * * *");
    expect(r.error).toBeNull();
    expect(r.description).toContain("15");
  });

  it("validates minute range", () => {
    expect(parseCron("60 * * * *").error).not.toBeNull();
  });

  it("validates hour range", () => {
    expect(parseCron("0 24 * * *").error).not.toBeNull();
  });

  it("validates month range", () => {
    expect(parseCron("0 0 1 13 *").error).not.toBeNull();
  });

  it("validates day of week range", () => {
    expect(parseCron("0 0 * * 8").error).not.toBeNull();
  });

  it("computes next runs", () => {
    const r = parseCron("* * * * *");
    expect(r.nextRuns.length).toBe(5);
    expect(r.nextRuns[0]).toBeInstanceOf(Date);
  });

  it("next runs are in ascending order", () => {
    const r = parseCron("*/5 * * * *");
    for (let i = 1; i < r.nextRuns.length; i++) {
      expect(r.nextRuns[i].getTime()).toBeGreaterThan(r.nextRuns[i - 1].getTime());
    }
  });

  it("parses comma-separated values", () => {
    const r = parseCron("0 9 * * 1,5");
    expect(r.error).toBeNull();
  });

  it("parses range values", () => {
    const r = parseCron("0 9 * * 1-5");
    expect(r.error).toBeNull();
  });
});
