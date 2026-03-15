import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "number-base-converter",
  name: "Number Base Converter",
  tagline: "Convert numbers between binary, octal, decimal, and hexadecimal",
  description:
    "Free online number base converter. Instantly convert numbers between binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16) in one step.",
  category: "numbers",
  keywords: ["number base converter", "binary to decimal", "hex to decimal", "decimal to binary", "base converter", "hexadecimal converter", "binary converter"],
  faqs: [
    { question: "What is binary (base 2)?", answer: "Binary uses only 0 and 1. It's the fundamental language of computers. Every number, letter, and instruction in a computer is ultimately stored as binary." },
    { question: "What is hexadecimal (base 16)?", answer: "Hexadecimal uses digits 0-9 and letters A-F. It's a compact way to represent binary data — one hex digit represents exactly 4 binary bits (a nibble)." },
    { question: "What is octal (base 8)?", answer: "Octal uses digits 0-7. It was historically used in computing and is still used in Unix file permissions (e.g., chmod 755)." },
    { question: "How do I convert hex colors?", answer: "Enter the hex color code (e.g., FF5733) and convert from base 16 to base 10 to see the RGB decimal values." },
    { question: "Is there a size limit?", answer: "The tool handles integers up to JavaScript's MAX_SAFE_INTEGER (2^53 - 1). For larger numbers, use a dedicated arbitrary-precision library." },
  ],
  relatedTools: ["byte-converter", "roman-numeral", "unix-timestamp", "hash-generator"],
  howToSteps: [
    "Enter your number in any base field",
    "Select the input base (binary, octal, decimal, or hex)",
    "All other representations update instantly",
    "Copy any result with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
