import { describe, it, expect } from "vitest";
import { decodeJwt } from "./logic";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

describe("decodeJwt", () => {
  it("decodes a valid JWT", () => {
    const { parts, error } = decodeJwt(SAMPLE);
    expect(error).toBeNull();
    expect(parts?.header.alg).toBe("HS256");
    expect(parts?.payload.sub).toBe("1234567890");
    expect(parts?.payload.name).toBe("John Doe");
  });

  it("returns error for non-JWT string", () => {
    const { error } = decodeJwt("not.a.jwt.at.all");
    expect(error).not.toBeNull();
  });

  it("returns error for 2-part token", () => {
    const { error } = decodeJwt("header.payload");
    expect(error).not.toBeNull();
  });

  it("detects expired tokens", () => {
    // exp in the past
    const header = btoa('{"alg":"HS256","typ":"JWT"}');
    const payload = btoa(JSON.stringify({ exp: 1000000, iat: 900000 }));
    const jwt = `${header}.${payload}.sig`;
    const { status } = decodeJwt(jwt);
    expect(status?.expired).toBe(true);
  });
});
