import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "unicode-converter",
  name: "Unicode Converter",
  tagline: "Convert text to Unicode code points and back",
  description:
    "Free online Unicode converter. Convert text to U+, \\u, or &#x HTML hex notation and back. View UTF-8 byte sequences and code point information for any character.",
  category: "encoding",
  keywords: ["unicode converter", "unicode code points", "text to unicode", "unicode to text", "utf-8 converter", "unicode escape"],
  faqs: [
    { question: "What is Unicode?", answer: "Unicode is a universal character encoding standard that assigns a unique number (code point) to every character from every writing system — including letters, digits, symbols, and emoji." },
    { question: "What is a code point?", answer: "A code point is the unique number assigned to a Unicode character, written as U+XXXX (e.g., U+0041 for 'A', U+1F600 for '😀')." },
    { question: "What is the difference between Unicode and UTF-8?", answer: "Unicode is the standard that defines code points. UTF-8 is an encoding that stores those code points as bytes. ASCII characters use 1 byte in UTF-8, while emoji can use up to 4 bytes." },
    { question: "What formats does this tool support?", answer: "The tool converts to and from U+XXXX notation, \\uXXXX JavaScript escape sequences, and &#xXXXX; HTML hex entities." },
    { question: "Is my data private?", answer: "Yes. All conversion happens in your browser with no server communication." },
  ],
  relatedTools: ["html-entity", "url-encoder", "base64", "hash-generator"],
  howToSteps: [
    "Choose Text → Unicode or Unicode → Text mode",
    "Select your preferred output format (U+, \\u, or &#x)",
    "Paste your input and the result appears instantly",
    "Copy the output with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
