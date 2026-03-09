import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "unix-timestamp",
  name: "Unix Timestamp Converter",
  tagline: "Convert Unix timestamps to human-readable dates and back",
  description:
    "Free Unix timestamp converter. Convert Unix timestamps (seconds or milliseconds) to readable dates and vice versa. Supports any timezone. Live current timestamp shown.",
  category: "numbers",
  keywords: [
    "unix timestamp converter",
    "epoch time converter",
    "timestamp to date",
    "date to timestamp",
    "unix time",
    "epoch converter",
  ],
  faqs: [
    {
      question: "What is a Unix timestamp?",
      answer:
        "A Unix timestamp (also called epoch time) is the number of seconds that have elapsed since January 1, 1970, at 00:00:00 UTC (the Unix epoch). It's the standard way computers represent points in time and is used in databases, APIs, and programming languages worldwide.",
    },
    {
      question: "How do I tell if a timestamp is in seconds or milliseconds?",
      answer:
        "Unix timestamps in seconds are typically 10 digits (e.g., 1700000000). Millisecond timestamps are 13 digits (e.g., 1700000000000). Our converter auto-detects which format you're using.",
    },
    {
      question: "How do I get the current Unix timestamp in JavaScript?",
      answer:
        "Use Date.now() for milliseconds or Math.floor(Date.now() / 1000) for seconds. In the terminal: date +%s (Unix/Mac) or [DateTimeOffset]::UtcNow.ToUnixTimeSeconds() (PowerShell).",
    },
    {
      question: "What is the maximum Unix timestamp?",
      answer:
        "The 32-bit Unix timestamp maximum is 2,147,483,647 (January 19, 2038). This is the 'Year 2038 problem'. Modern systems use 64-bit timestamps which extend far into the future.",
    },
    {
      question: "Can I convert to different timezones?",
      answer:
        "Yes. The converter shows the time in your local timezone and UTC. Unix timestamps are always UTC-based, so converting to any timezone is just an offset calculation.",
    },
  ],
  relatedTools: ["uuid-generator", "json-formatter", "base64", "password-generator"],
  howToSteps: [
    "Enter a Unix timestamp (seconds or milliseconds) to convert to a date",
    "Or enter a date to convert to a Unix timestamp",
    "The format (seconds/milliseconds) is auto-detected",
    "View the result in your local timezone and UTC",
    "Click the current timestamp to use today's date and time",
  ],
  lastUpdated: "2025-01-01",
};
