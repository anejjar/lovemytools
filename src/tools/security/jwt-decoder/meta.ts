import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "jwt-decoder",
  name: "JWT Decoder",
  tagline: "Decode and inspect JWT tokens instantly",
  description:
    "Free JWT decoder tool. Decode JSON Web Tokens to inspect header, payload, and signature. Check expiration and issued-at claims. Decoded client-side only — never paste production secrets.",
  category: "security",
  keywords: [
    "jwt decoder",
    "decode jwt",
    "jwt token decoder",
    "json web token decoder",
    "jwt inspector",
    "jwt parser online",
  ],
  faqs: [
    {
      question: "What is a JWT?",
      answer:
        "A JSON Web Token (JWT) is a compact, URL-safe token format for securely transmitting information between parties. It consists of three parts separated by dots: Header.Payload.Signature. The header specifies the algorithm, the payload contains claims (data), and the signature verifies integrity.",
    },
    {
      question: "Is it safe to paste my JWT into this decoder?",
      answer:
        "This decoder runs entirely in your browser — no data is sent to any server. However, avoid pasting production JWTs in general. Use it for debugging during development. Never paste tokens from production systems into any online tool.",
    },
    {
      question: "Can this tool verify a JWT signature?",
      answer:
        "No. Signature verification requires the secret key (for HMAC algorithms) or public key (for RSA/ECDSA). This tool only decodes the visible parts. Verification must be done server-side with the appropriate key.",
    },
    {
      question: "What JWT claims does this tool check?",
      answer:
        "The decoder checks exp (expiration time), iat (issued at), nbf (not before), iss (issuer), sub (subject), aud (audience), and jti (JWT ID). It highlights if the token is expired or not yet valid.",
    },
    {
      question: "What is the difference between HS256 and RS256?",
      answer:
        "HS256 uses a shared secret key for both signing and verification (symmetric). RS256 uses a private key to sign and a public key to verify (asymmetric). RS256 is preferred when you need to share the verification capability without sharing the signing secret.",
    },
  ],
  relatedTools: ["base64", "password-generator", "uuid-generator", "json-formatter"],
  howToSteps: [
    "Paste your JWT token into the input field",
    "The header and payload are decoded automatically",
    "Check token expiration status and other claims",
    "Copy the decoded JSON for inspection",
  ],
  lastUpdated: "2025-01-01",
};
