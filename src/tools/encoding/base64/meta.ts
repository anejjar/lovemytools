import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "base64",
  name: "Base64 Encoder / Decoder",
  tagline: "Encode and decode Base64 text or files instantly",
  description:
    "Free Base64 encoder and decoder. Encode text or files to Base64, decode Base64 strings, with URL-safe mode support. All processing happens client-side — your data stays private.",
  category: "encoding",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 encode decode",
    "base64 online",
    "encode base64",
    "decode base64",
  ],
  faqs: [
    {
      question: "What is Base64 encoding?",
      answer:
        "Base64 is a binary-to-text encoding scheme that converts binary data (or text) into a string of ASCII characters using 64 symbols (A-Z, a-z, 0-9, +, /). It's used to safely transmit binary data over text-based protocols like email (MIME), embed images in CSS/HTML, and encode credentials in HTTP headers.",
    },
    {
      question: "What is the difference between standard Base64 and URL-safe Base64?",
      answer:
        "Standard Base64 uses + and / which are special characters in URLs. URL-safe Base64 (Base64url) replaces + with - and / with _, making the output safe to use in URLs and filenames without percent-encoding.",
    },
    {
      question: "Does Base64 encrypt my data?",
      answer:
        "No. Base64 is an encoding scheme, not encryption. Encoded data can be trivially decoded by anyone. Never use Base64 to 'secure' sensitive data — use proper encryption (AES, RSA) for that.",
    },
    {
      question: "Why does Base64 increase data size?",
      answer:
        "Base64 encodes every 3 bytes of binary data into 4 ASCII characters, increasing size by approximately 33%. The padding character '=' is added to make the output a multiple of 4 characters.",
    },
    {
      question: "Can I encode files to Base64?",
      answer:
        "Yes! Drop any file into the upload zone and it will be encoded to Base64. Image files will show a preview. This is useful for embedding images in HTML or CSS as data URIs.",
    },
    {
      question: "How does Base64 handle Unicode characters?",
      answer:
        "Standard btoa() only handles Latin-1 characters. Our encoder handles full Unicode by first converting text to UTF-8 bytes before encoding, ensuring emojis and non-ASCII characters work correctly.",
    },
  ],
  relatedTools: ["jwt-decoder", "json-formatter", "uuid-generator", "password-generator"],
  howToSteps: [
    "Enter text in the input box or drop a file",
    "Choose 'Encode' to convert to Base64 or 'Decode' to convert from Base64",
    "Toggle URL-safe mode if you need the output in a URL",
    "Copy the result with one click",
  ],
  lastUpdated: "2025-01-01",
};
