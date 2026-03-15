import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "js-to-json",
  name: "JS Object to JSON Converter",
  tagline: "Convert JavaScript object literals to valid JSON instantly",
  description:
    "Free JS to JSON converter. Paste a JavaScript object literal with single quotes, unquoted keys, or trailing commas and get valid, formatted JSON output.",
  category: "javascript",
  keywords: ["js to json", "javascript object to json", "convert js to json", "js object converter", "json formatter"],
  faqs: [
    { question: "What is the difference between a JS object and JSON?", answer: "JSON is a strict subset of JavaScript. JSON requires double-quoted keys and string values, no trailing commas, and no undefined, NaN, or Infinity values." },
    { question: "What transformations does this tool apply?", answer: "It quotes unquoted keys, converts single quotes to double quotes, removes trailing commas, strips comments, and replaces undefined/NaN/Infinity with null." },
    { question: "Why does my JS object fail to convert?", answer: "Complex expressions, function values, or template literals cannot be converted to JSON. JSON only supports strings, numbers, booleans, null, arrays, and objects." },
    { question: "Can I convert JSON back to a JS object?", answer: "Valid JSON is already valid JavaScript. Use the JSON-to-JS tab to pretty-print JSON as a JavaScript value." },
    { question: "Is this tool safe to use with sensitive data?", answer: "Yes. All processing happens locally in your browser. Nothing is sent to a server." },
  ],
  relatedTools: ["js-formatter", "js-minifier", "json-formatter", "json-to-yaml"],
  howToSteps: [
    "Paste your JavaScript object literal into the input editor",
    "The valid JSON output appears automatically",
    "Switch to the JSON→JS tab to go the other direction",
    "Copy the result with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
