import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "html-entity",
  name: "HTML Entity Encoder / Decoder",
  tagline: "Encode and decode HTML entities for safe web output",
  description:
    "Free online HTML entity encoder and decoder. Convert special characters to HTML entities to prevent XSS and display issues, or decode entities back to text.",
  category: "encoding",
  keywords: ["html entity encoder", "html entity decoder", "html escape", "html special characters", "html entities online", "encode html"],
  faqs: [
    { question: "What are HTML entities?", answer: "HTML entities are special codes used to represent characters that have meaning in HTML (like < and >) or characters that are hard to type. For example, &lt; represents < and &amp; represents &." },
    { question: "Why should I encode HTML entities?", answer: "Encoding user-provided content before inserting it into HTML prevents Cross-Site Scripting (XSS) attacks. Without encoding, an attacker could inject malicious JavaScript through <script> tags." },
    { question: "What is the difference between &lt; and &#60;?", answer: "Both represent the same character (<). Named entities like &lt; are more readable, while numeric entities like &#60; (decimal) or &#x3C; (hex) work for any Unicode character." },
    { question: "Does this tool handle Unicode?", answer: "Yes. The decoder handles named entities, decimal numeric entities (&#60;), and hexadecimal entities (&#x3C;)." },
    { question: "Is my data private?", answer: "Yes. All encoding and decoding happens in your browser. Your data never leaves your computer." },
  ],
  relatedTools: ["url-encoder", "base64", "unicode-converter", "html-formatter"],
  howToSteps: [
    "Choose Encode or Decode mode",
    "Paste your text or HTML into the input",
    "The result appears instantly",
    "Copy the output with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
