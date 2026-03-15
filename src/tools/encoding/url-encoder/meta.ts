import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "url-encoder",
  name: "URL Encoder / Decoder",
  tagline: "Encode and decode URLs and query strings instantly",
  description:
    "Free online URL encoder and decoder. Percent-encode URLs for safe transmission or decode encoded URLs back to readable text. Supports full URLs and query params.",
  category: "encoding",
  keywords: ["url encoder", "url decoder", "percent encoding", "url encode online", "urlencode", "url decode", "query string encoder"],
  faqs: [
    { question: "What is URL encoding?", answer: "URL encoding (percent encoding) converts special characters into a format that can be transmitted over the internet. Spaces become %20, & becomes %26, etc." },
    { question: "What is the difference between encodeURI and encodeURIComponent?", answer: "encodeURI encodes a full URL and preserves characters like /, ?, &, and =. encodeURIComponent encodes everything including those characters, making it suitable for encoding individual query parameter values." },
    { question: "When should I URL encode?", answer: "Always encode query parameter values before appending them to a URL. Failing to encode can break the URL structure or cause security issues like URL injection." },
    { question: "Is my data private?", answer: "Yes. All encoding and decoding happens locally in your browser. Nothing is sent to a server." },
    { question: "Can I encode Unicode characters?", answer: "Yes. Unicode characters are first converted to UTF-8 bytes, then each byte is percent-encoded. For example, '€' becomes '%E2%82%AC'." },
  ],
  relatedTools: ["base64", "html-entity", "unicode-converter", "jwt-decoder"],
  howToSteps: [
    "Choose Encode or Decode mode",
    "Paste your URL or text into the input",
    "Select whether to encode the full URL or just a component",
    "Copy the output with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
