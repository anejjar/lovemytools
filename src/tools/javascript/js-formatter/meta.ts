import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "js-formatter",
  name: "JavaScript Formatter & Beautifier",
  tagline: "Beautify and format minified JavaScript with proper indentation",
  description:
    "Free JavaScript formatter and beautifier. Paste minified or messy JS and get clean, readable code with consistent indentation. Powered by js-beautify.",
  category: "javascript",
  keywords: ["javascript formatter", "js beautifier", "js pretty print", "format javascript", "js indenter"],
  faqs: [
    { question: "What does JS formatting do?", answer: "Formatting adds proper indentation, line breaks, and spacing to minified or poorly formatted JavaScript, making it much easier to read and debug." },
    { question: "Does formatting change how the code runs?", answer: "No. JavaScript ignores whitespace (outside strings). Formatted and minified versions are functionally identical." },
    { question: "Can I use tabs instead of spaces?", answer: "Yes. Select 'Tab' from the indentation options to use tab characters instead of spaces." },
    { question: "What library powers this tool?", answer: "This tool uses js-beautify, the same library used by many code editors and online formatters." },
    { question: "Is my code sent to a server?", answer: "No. All formatting happens locally in your browser. Your code never leaves your machine." },
  ],
  relatedTools: ["js-minifier", "js-to-json", "css-formatter", "html-formatter"],
  howToSteps: [
    "Paste your JavaScript into the input editor",
    "Choose indentation style (2 spaces, 4 spaces, or tabs)",
    "The formatted code appears automatically",
    "Copy the output with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
