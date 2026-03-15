import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "json-minifier",
  name: "JSON Minifier",
  tagline: "Minify JSON to reduce file size instantly",
  description:
    "Free online JSON minifier. Strip whitespace and comments from JSON to reduce file size for APIs and production use. Runs entirely in your browser.",
  category: "json",
  keywords: ["json minifier", "minify json", "compress json", "json compressor", "json uglify", "reduce json size"],
  faqs: [
    {
      question: "What does a JSON minifier do?",
      answer:
        "A JSON minifier removes all unnecessary whitespace, line breaks, and indentation from JSON data. This reduces file size, making data transfer faster and more efficient.",
    },
    {
      question: "Is my JSON data safe?",
      answer:
        "Yes. All processing happens entirely in your browser. No data is ever sent to a server.",
    },
    {
      question: "How much can minification reduce file size?",
      answer:
        "Typical savings range from 20% to 60% depending on how much whitespace the original JSON has. Heavily formatted JSON with lots of indentation sees the greatest reduction.",
    },
    {
      question: "Will minifying JSON break my application?",
      answer:
        "No. Minified JSON is semantically identical to formatted JSON. Any JSON parser will read both forms correctly.",
    },
    {
      question: "Can I minify very large JSON files?",
      answer:
        "Yes. The tool handles large JSON files efficiently in the browser. For files larger than 10MB, consider splitting them into smaller chunks.",
    },
    {
      question: "What is the difference between minifying and compressing JSON?",
      answer:
        "Minifying removes whitespace at the text level. Compression (like gzip) reduces size at the binary level. For best results, use both: minify first, then serve with gzip compression enabled on your server.",
    },
  ],
  relatedTools: ["json-formatter", "json-to-csv", "json-diff", "json-to-yaml"],
  howToSteps: [
    "Paste your formatted JSON into the input box",
    "The minified output appears automatically",
    "Check the size savings shown below the output",
    "Click Copy to copy the minified JSON",
  ],
  lastUpdated: "2025-01-01",
};
