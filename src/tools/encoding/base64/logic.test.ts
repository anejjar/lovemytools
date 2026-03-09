import { describe, it, expect } from "vitest";
import { encodeBase64, decodeBase64 } from "./logic";

describe("encodeBase64", () => {
  it("encodes simple text", () => {
    const { output, error } = encodeBase64("Hello, World!");
    expect(error).toBeNull();
    expect(output).toBe("SGVsbG8sIFdvcmxkIQ==");
  });

  it("encodes URL-safe (no + / = chars)", () => {
    const { output } = encodeBase64("Hello, World!", true);
    expect(output).not.toMatch(/[+/=]/);
  });
});

describe("decodeBase64", () => {
  it("decodes valid base64", () => {
    const { output, error } = decodeBase64("SGVsbG8sIFdvcmxkIQ==");
    expect(error).toBeNull();
    expect(output).toBe("Hello, World!");
  });

  it("returns error for invalid base64", () => {
    const { error } = decodeBase64("not!valid@base64$$$");
    expect(error).not.toBeNull();
  });

  it("round-trips: encode then decode", () => {
    const original = "developer tools are awesome!";
    const { output: encoded } = encodeBase64(original);
    const { output: decoded } = decodeBase64(encoded);
    expect(decoded).toBe(original);
  });
});
