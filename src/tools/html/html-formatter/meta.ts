import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "html-formatter",
  name: "HTML Formatter & Beautifier",
  tagline: "Beautify and format minified or messy HTML instantly",
  description:
    "Free online HTML formatter and beautifier. Paste minified or unformatted HTML and get clean, readable markup with proper indentation. Works in your browser.",
  category: "html",
  keywords: ["html formatter", "html beautifier", "html pretty print", "format html", "html indenter"],
  faqs: [
    { question: "What does an HTML formatter do?", answer: "An HTML formatter takes minified or poorly indented HTML and rewrites it with consistent indentation and line breaks, making it much easier to read and edit." },
    { question: "Does formatting change how my HTML renders?", answer: "No. Browsers ignore extra whitespace between elements (except inside pre and textarea tags). Formatted and minified HTML render identically." },
    { question: "Can I choose indentation style?", answer: "Yes. Choose between 2 spaces, 4 spaces, or tabs." },
    { question: "Will it format inline scripts and styles?", answer: "Scripts and styles inside HTML are preserved as-is by default to avoid accidentally breaking them." },
    { question: "Is my HTML sent to a server?", answer: "No. All formatting happens locally in your browser using the js-beautify library." },
  ],
  relatedTools: ["html-minifier", "html-to-markdown", "css-formatter", "js-formatter"],
  howToSteps: [
    "Paste your HTML into the input editor",
    "Choose indentation style (2 spaces, 4 spaces, or tabs)",
    "The formatted HTML appears automatically",
    "Copy the output with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
