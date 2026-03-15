import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "contrast-checker",
  name: "Color Contrast Checker",
  tagline: "Check WCAG AA and AAA contrast ratios for accessibility",
  description:
    "Free WCAG color contrast checker. Enter foreground and background colors to get the contrast ratio and AA/AAA pass/fail status for text and UI components.",
  category: "color",
  keywords: ["color contrast checker", "wcag contrast", "accessibility contrast", "aa contrast ratio", "aaa contrast"],
  faqs: [
    { question: "What is WCAG contrast ratio?", answer: "WCAG (Web Content Accessibility Guidelines) defines minimum contrast ratios to ensure text is readable by people with visual impairments." },
    { question: "What contrast ratio is required for AA compliance?", answer: "WCAG AA requires 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt+ bold). UI components require 3:1." },
    { question: "What is AAA compliance?", answer: "WCAG AAA is the highest level, requiring 7:1 for normal text and 4.5:1 for large text. It's recommended but not always achievable." },
    { question: "What counts as large text?", answer: "Large text is 18pt (24px) or larger, or 14pt (about 18.67px) or larger when bold." },
    { question: "Why does contrast matter?", answer: "Low contrast text is hard to read for users with low vision, color blindness, or when viewing in bright light. Good contrast improves usability for everyone." },
  ],
  relatedTools: ["color-palette-generator", "color-gradient-generator", "css-gradient-generator"],
  howToSteps: [
    "Enter or pick a foreground (text) color",
    "Enter or pick a background color",
    "See the contrast ratio and WCAG AA/AAA pass/fail results instantly",
    "Adjust colors until you reach your target compliance level",
  ],
  lastUpdated: "2025-01-01",
};
