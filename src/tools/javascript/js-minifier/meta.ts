import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "js-minifier",
  name: "JavaScript Minifier",
  tagline: "Minify JavaScript code and reduce file size instantly",
  description:
    "Free online JavaScript minifier. Remove comments, collapse whitespace, and shrink your JS files. See exact byte savings. Works entirely in your browser.",
  category: "javascript",
  keywords: ["javascript minifier", "js minifier", "minify javascript", "compress js", "js compressor", "uglify js"],
  faqs: [
    { question: "What does JS minification do?", answer: "Minification removes comments, extra whitespace, and newlines from JavaScript code, reducing file size without changing functionality." },
    { question: "Is minified code still valid JavaScript?", answer: "Yes. Minified JS runs identically to the original — browsers don't care about whitespace or comments." },
    { question: "Should I minify JavaScript for production?", answer: "Yes. Minified files load faster, improving Core Web Vitals and user experience. Most build tools (Vite, webpack) minify automatically." },
    { question: "What's the difference between minification and obfuscation?", answer: "Minification only removes whitespace and comments. Obfuscation also renames variables to make code hard to read. This tool only minifies." },
    { question: "Is my code sent to a server?", answer: "No. All processing happens locally in your browser. Your code never leaves your machine." },
  ],
  relatedTools: ["js-formatter", "css-minifier", "html-minifier"],
  howToSteps: [
    "Paste your JavaScript into the input editor",
    "The minified output appears automatically",
    "View the byte savings in the stats panel",
    "Copy the minified code with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
