import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "hash-generator",
  name: "Hash Generator",
  tagline: "Generate MD5, SHA-256, SHA-512, and more hashes instantly",
  description:
    "Free online hash generator. Create MD5, SHA-1, SHA-224, SHA-256, SHA-384, and SHA-512 cryptographic hashes from any text. All hashing is done locally in your browser.",
  category: "security",
  keywords: ["hash generator", "md5 generator", "sha256 generator", "sha512", "cryptographic hash", "checksum generator", "sha1 online"],
  faqs: [
    { question: "What is a cryptographic hash?", answer: "A cryptographic hash function takes an input and produces a fixed-length string of bytes. The same input always produces the same hash, but even a tiny change to the input produces a completely different hash." },
    { question: "Which hash algorithm should I use?", answer: "For security, use SHA-256 or SHA-512. MD5 and SHA-1 are cryptographically broken and should only be used for checksums or non-security purposes. SHA-256 is the current industry standard." },
    { question: "Can I reverse a hash?", answer: "No. Cryptographic hash functions are one-way. You cannot reverse-engineer the original input from the hash. This is what makes them useful for password storage and data integrity." },
    { question: "What is the difference between MD5 and SHA-256?", answer: "MD5 produces a 128-bit (32 hex character) hash and is fast but cryptographically broken. SHA-256 produces a 256-bit (64 hex character) hash and is considered secure for most applications." },
    { question: "Is my data sent to a server?", answer: "No. All hashing is done locally in your browser using the CryptoJS library. Your data never leaves your device." },
  ],
  relatedTools: ["hmac-generator", "password-generator", "uuid-generator", "base64"],
  howToSteps: [
    "Type or paste your text into the input box",
    "Select the hash algorithm (MD5, SHA-1, SHA-256, etc.)",
    "The hash is generated instantly",
    "Copy the hash with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
