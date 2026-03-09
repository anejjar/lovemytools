import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "json-formatter",
  name: "JSON Formatter & Validator",
  tagline: "Format, validate, and beautify JSON instantly",
  description:
    "Free online JSON formatter and validator. Paste raw JSON to format it with proper indentation, validate syntax errors, or minify JSON for production. Works entirely in your browser.",
  category: "json",
  keywords: [
    "json formatter",
    "json beautifier",
    "json validator online",
    "format json online",
    "json pretty print",
    "json minifier",
  ],
  faqs: [
    {
      question: "What is a JSON Formatter?",
      answer:
        "A JSON Formatter takes raw or minified JSON and adds proper indentation and line breaks, making it easier to read and understand. It also validates that the JSON is syntactically correct.",
    },
    {
      question: "Does this tool validate JSON?",
      answer:
        "Yes. The formatter validates your JSON as you type and highlights any syntax errors with the specific line number where the error occurs, making it easy to find and fix issues.",
    },
    {
      question: "What is the difference between formatting and minifying JSON?",
      answer:
        "Formatting adds whitespace and indentation for human readability. Minifying removes all unnecessary whitespace to reduce file size — useful for production APIs and data transfer where every byte counts.",
    },
    {
      question: "Is my JSON data secure?",
      answer:
        "Completely. All JSON processing happens in your browser using JavaScript. Your data is never sent to any server.",
    },
    {
      question: "Can I format very large JSON files?",
      answer:
        "Yes, the formatter handles large JSON files efficiently. For very large files (>10MB), consider pasting just the section you need to inspect.",
    },
    {
      question: "What indentation options are available?",
      answer:
        "You can choose between 2 spaces, 4 spaces, or tab indentation to match your project's coding style.",
    },
  ],
  relatedTools: ["base64", "jwt-decoder", "uuid-generator", "lorem-ipsum-generator"],
  howToSteps: [
    "Paste your raw or minified JSON into the input box",
    "The JSON is validated automatically as you type",
    "Click 'Format' to beautify with proper indentation",
    "Click 'Minify' to compress for production use",
    "Copy the result with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
