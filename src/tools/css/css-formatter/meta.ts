import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "css-formatter",
  name: "CSS Formatter & Beautifier",
  tagline: "Beautify and format minified or messy CSS instantly",
  description:
    "Free online CSS formatter and beautifier. Paste minified or unformatted CSS and get clean, readable code with proper indentation. Works entirely in your browser.",
  category: "css",
  keywords: ["css formatter", "css beautifier", "css pretty print", "format css", "css indenter", "css beautify"],
  faqs: [
    { question: "What does a CSS formatter do?", answer: "A CSS formatter takes minified or poorly indented CSS and rewrites it with consistent indentation, spacing, and line breaks — making it much easier to read and edit." },
    { question: "Can I choose the indentation style?", answer: "Yes. You can choose 2 spaces (default), 4 spaces, or tabs for indentation." },
    { question: "Does formatting change how my CSS works?", answer: "No. Formatting is purely cosmetic. The browser parses CSS the same way regardless of whitespace or indentation." },
    { question: "Is this the opposite of minification?", answer: "Yes. While minification removes all whitespace to reduce file size, formatting adds it back for readability. Use the CSS Minifier to minify again when done." },
    { question: "Is my CSS sent to a server?", answer: "No. All formatting happens locally in your browser using the js-beautify library. Nothing is transmitted." },
  ],
  relatedTools: ["css-minifier", "css-unit-converter", "js-formatter", "html-formatter"],
  howToSteps: [
    "Paste your CSS into the input editor",
    "Choose your preferred indentation (2 spaces, 4 spaces, or tabs)",
    "The formatted CSS appears automatically on the right",
    "Copy the output with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
