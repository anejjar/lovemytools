export interface JwtParts {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signatureB64: string;
}

export interface JwtStatus {
  expired: boolean;
  notYetValid: boolean;
  expiresAt: Date | null;
  issuedAt: Date | null;
  expiresIn: string | null;
}

function base64UrlDecode(str: string): string {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64.padEnd(Math.ceil(b64.length / 4) * 4, "=");
  try {
    return decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
  } catch {
    return atob(padded);
  }
}

export function decodeJwt(token: string): {
  parts: JwtParts | null;
  status: JwtStatus | null;
  error: string | null;
} {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return {
      parts: null,
      status: null,
      error: "Invalid JWT: must have 3 parts separated by dots (header.payload.signature)",
    };
  }

  try {
    const header = JSON.parse(base64UrlDecode(parts[0])) as Record<string, unknown>;
    const payload = JSON.parse(base64UrlDecode(parts[1])) as Record<string, unknown>;

    const now = Math.floor(Date.now() / 1000);
    const exp = typeof payload.exp === "number" ? payload.exp : null;
    const iat = typeof payload.iat === "number" ? payload.iat : null;
    const nbf = typeof payload.nbf === "number" ? payload.nbf : null;

    let expiresIn: string | null = null;
    if (exp) {
      const diffSec = exp - now;
      if (diffSec > 0) {
        if (diffSec < 60) expiresIn = `${diffSec}s`;
        else if (diffSec < 3600) expiresIn = `${Math.round(diffSec / 60)}m`;
        else if (diffSec < 86400) expiresIn = `${Math.round(diffSec / 3600)}h`;
        else expiresIn = `${Math.round(diffSec / 86400)}d`;
      }
    }

    const status: JwtStatus = {
      expired: exp !== null ? now > exp : false,
      notYetValid: nbf !== null ? now < nbf : false,
      expiresAt: exp ? new Date(exp * 1000) : null,
      issuedAt: iat ? new Date(iat * 1000) : null,
      expiresIn,
    };

    return {
      parts: { header, payload, signatureB64: parts[2] },
      status,
      error: null,
    };
  } catch {
    return {
      parts: null,
      status: null,
      error: "Failed to decode JWT. Ensure it is a valid Base64url-encoded token.",
    };
  }
}
