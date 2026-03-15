import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "hmac-generator",
  name: "HMAC Generator",
  tagline: "Generate HMAC signatures for API authentication and webhooks",
  description:
    "Free online HMAC generator. Create HMAC-SHA256, HMAC-SHA512, HMAC-SHA1, and HMAC-MD5 signatures for API request signing, webhook verification, and data integrity checks.",
  category: "security",
  keywords: ["hmac generator", "hmac sha256", "hmac signature", "api authentication", "webhook signature", "hmac online", "message authentication code"],
  faqs: [
    { question: "What is HMAC?", answer: "HMAC (Hash-based Message Authentication Code) is a cryptographic technique that combines a secret key with a hash function to verify both the integrity and authenticity of a message." },
    { question: "What is HMAC used for?", answer: "HMAC is widely used for API request signing (AWS, Stripe, Shopify webhooks), JWT signatures, and verifying data hasn't been tampered with in transit." },
    { question: "What is the difference between HMAC and a regular hash?", answer: "A regular hash only verifies data integrity. HMAC uses a secret key, so only parties who know the key can produce or verify the signature — adding authentication on top of integrity." },
    { question: "Which algorithm should I use?", answer: "HMAC-SHA256 is the most widely used and recommended choice. HMAC-SHA512 offers more security. HMAC-SHA1 and HMAC-MD5 exist for legacy compatibility." },
    { question: "Is my secret key safe?", answer: "Yes. All computation happens locally in your browser. Your secret key and message are never sent to any server." },
  ],
  relatedTools: ["hash-generator", "jwt-decoder", "password-generator", "base64"],
  howToSteps: [
    "Enter your message in the Message field",
    "Enter your secret key",
    "Select the HMAC algorithm (SHA256 recommended)",
    "Copy the generated HMAC signature",
  ],
  lastUpdated: "2025-01-01",
};
