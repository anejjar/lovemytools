import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "uuid-generator",
  name: "UUID Generator",
  tagline: "Generate UUIDs v1, v4, and v7 instantly",
  description:
    "Free online UUID generator. Generate v1, v4, and v7 UUIDs (Universally Unique Identifiers) individually or in bulk. Copy formatted or raw UUIDs with one click.",
  category: "numbers",
  keywords: [
    "uuid generator",
    "uuid v4 generator",
    "random uuid",
    "guid generator",
    "unique id generator",
    "uuid online",
  ],
  faqs: [
    {
      question: "What is a UUID?",
      answer:
        "A UUID (Universally Unique Identifier) is a 128-bit identifier that is unique across space and time. It's formatted as 8-4-4-4-12 hexadecimal digits: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. UUIDs are used as database primary keys, session identifiers, and distributed system IDs.",
    },
    {
      question: "What is the difference between UUID v1 and v4?",
      answer:
        "UUID v1 is time-based and includes the current timestamp and your MAC address, making it sortable by creation time but potentially exposing machine identity. UUID v4 is randomly generated, providing better privacy. UUID v7 is newer and combines random data with a millisecond timestamp for sortability without MAC address exposure.",
    },
    {
      question: "Can UUID v4 collide?",
      answer:
        "Technically yes, but practically no. With 122 random bits, you'd need to generate over 1 billion UUIDs per second for 85 years to have a 50% chance of a single collision. For all practical purposes, v4 UUIDs are unique.",
    },
    {
      question: "What is UUID v7?",
      answer:
        "UUID v7 (RFC 9562) combines a millisecond Unix timestamp with random bits. This makes UUIDs sortable by creation time while still being globally unique. It's ideal for database primary keys where sort order matters for performance.",
    },
    {
      question: "How do I use a UUID as a database primary key?",
      answer:
        "Most databases support UUID as a primary key type. In PostgreSQL: `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`. In MySQL: `id CHAR(36) PRIMARY KEY`. For best performance with sequential inserts, use UUID v7.",
    },
    {
      question: "What is the difference between uppercase and lowercase UUIDs?",
      answer:
        "Both formats are valid. The UUID standard uses lowercase letters (a-f). Some systems prefer uppercase. Our generator provides both and lets you copy either format.",
    },
  ],
  relatedTools: ["password-generator", "base64", "jwt-decoder", "json-formatter"],
  howToSteps: [
    "Select the UUID version (v1, v4, or v7)",
    "Set the quantity for bulk generation",
    "Click 'Generate' to create your UUIDs",
    "Copy individual UUIDs or all at once",
    "Toggle between uppercase and lowercase formats",
  ],
  lastUpdated: "2025-01-01",
};
