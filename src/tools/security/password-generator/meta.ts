import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "password-generator",
  name: "Password Generator",
  tagline: "Generate cryptographically secure passwords instantly",
  description:
    "Free secure password generator. Create strong random passwords with custom length, uppercase, lowercase, numbers, and symbols. Uses crypto.getRandomValues() for true randomness.",
  category: "security",
  keywords: [
    "password generator",
    "random password generator",
    "secure password generator",
    "strong password generator",
    "password creator online",
  ],
  faqs: [
    {
      question: "How secure is this password generator?",
      answer:
        "Very secure. It uses the Web Crypto API (crypto.getRandomValues()) which generates cryptographically strong random values — the same standard used by security software. Your passwords are generated locally and never sent to any server.",
    },
    {
      question: "What makes a password strong?",
      answer:
        "A strong password is at least 16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and symbols. Avoid dictionary words, personal information, or predictable patterns.",
    },
    {
      question: "How is entropy calculated?",
      answer:
        "Entropy measures password strength in bits. It's calculated as log2(pool_size^length), where pool_size is the number of possible characters. Higher entropy means more guessing attempts required to crack the password.",
    },
    {
      question: "Are the generated passwords stored anywhere?",
      answer:
        "No. Password generation happens entirely in your browser. No data is sent to any server. Your passwords are never stored or logged.",
    },
    {
      question: "What password length should I use?",
      answer:
        "For most accounts, 16 characters is excellent. For highly sensitive accounts (banking, email), use 20+ characters. A 16-character password with all character types has ~95 bits of entropy, which is practically uncrackable.",
    },
    {
      question: "Can I generate multiple passwords at once?",
      answer:
        "Yes, use the bulk generation option to create up to 20 passwords at once. This is useful for setting up multiple accounts or testing.",
    },
  ],
  relatedTools: ["uuid-generator", "jwt-decoder", "base64", "color-picker"],
  howToSteps: [
    "Set your desired password length using the slider",
    "Toggle character types: uppercase, lowercase, numbers, symbols",
    "Click 'Generate' or press the refresh button",
    "Copy the password with one click",
    "Use bulk mode to generate multiple passwords at once",
  ],
  lastUpdated: "2025-01-01",
};
