import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "bcrypt-generator",
  name: "Bcrypt Generator",
  tagline: "Hash and verify passwords with bcrypt securely",
  description:
    "Free online bcrypt generator. Hash passwords using bcrypt with configurable cost rounds, and verify passwords against existing bcrypt hashes. Runs in your browser.",
  category: "security",
  keywords: ["bcrypt generator", "bcrypt hash", "password hashing", "bcrypt online", "bcrypt verifier", "hash password", "bcrypt cost rounds"],
  faqs: [
    { question: "What is bcrypt?", answer: "Bcrypt is a password hashing function designed for secure password storage. Unlike MD5 or SHA, it's intentionally slow and includes a salt to prevent rainbow table attacks." },
    { question: "What are cost rounds?", answer: "The cost factor (rounds) controls how slow the hashing is. Each increase by 1 doubles the computation time. Round 10 is a common default; round 12 is recommended for high-security applications. Higher is more secure but slower." },
    { question: "Why does bcrypt produce different hashes for the same password?", answer: "Bcrypt automatically generates a random salt for each hash. This means the same password always produces a different hash, which is a feature that prevents precomputed attack tables." },
    { question: "Can I use this to verify passwords?", answer: "Yes. Switch to Verify mode, enter the password and the stored hash. The tool will tell you if they match." },
    { question: "Is my password safe?", answer: "Yes. All hashing happens in your browser using bcryptjs. Your password is never sent to any server." },
  ],
  relatedTools: ["hash-generator", "hmac-generator", "password-generator", "uuid-generator"],
  howToSteps: [
    "Enter the password you want to hash",
    "Choose the cost rounds (10 is a good default)",
    "Click Hash — the bcrypt hash is generated",
    "Switch to Verify mode to check a password against a stored hash",
  ],
  lastUpdated: "2025-01-01",
};
