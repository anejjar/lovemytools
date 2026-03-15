import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "roman-numeral",
  name: "Roman Numeral Converter",
  tagline: "Convert between Arabic numbers and Roman numerals instantly",
  description:
    "Free online Roman numeral converter. Convert Arabic numbers (1–3999) to Roman numerals and back. Supports all standard Roman numeral rules including subtractive notation.",
  category: "numbers",
  keywords: ["roman numeral converter", "arabic to roman", "roman to arabic", "roman numerals", "convert roman numerals", "roman numeral calculator"],
  faqs: [
    { question: "What are Roman numerals?", answer: "Roman numerals are a numeric system originating in ancient Rome that uses letters: I (1), V (5), X (10), L (50), C (100), D (500), and M (1000)." },
    { question: "What is subtractive notation?", answer: "When a smaller numeral precedes a larger one, it is subtracted. For example, IV = 4 (5-1) and IX = 9 (10-1). This rule applies to I before V and X, X before L and C, and C before D and M." },
    { question: "What is the largest Roman numeral?", answer: "The standard system goes up to 3999 (MMMCMXCIX). Numbers above 3999 require a bar (vinculum) over a numeral to multiply it by 1000, which is non-standard." },
    { question: "Why are Roman numerals still used?", answer: "Roman numerals appear in clock faces, book chapter numbering, movie sequel titles, Super Bowl names, and copyright years. They convey a formal or classic aesthetic." },
    { question: "What does MMXXV mean?", answer: "MM = 2000, XX = 20, V = 5. So MMXXV = 2025." },
  ],
  relatedTools: ["number-base-converter", "byte-converter", "unix-timestamp", "lorem-ipsum-generator"],
  howToSteps: [
    "Choose Arabic → Roman or Roman → Arabic mode",
    "Enter your number or Roman numeral",
    "The conversion appears instantly",
    "Copy the result with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
