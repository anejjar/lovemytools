import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "css-minifier",
  name: "CSS Minifier",
  tagline: "Minify CSS to reduce file size and improve load time",
  description:
    "Free online CSS minifier. Remove whitespace, comments, and redundant characters from CSS files to reduce size and speed up page loads. Works entirely in your browser.",
  category: "css",
  keywords: ["css minifier", "minify css", "compress css", "css compressor", "css optimizer", "reduce css size"],
  faqs: [
    { question: "What does CSS minification do?", answer: "CSS minification removes all whitespace, comments, and unnecessary characters from CSS without changing how it works. This reduces file size, making pages load faster." },
    { question: "How much can CSS minification reduce file size?", answer: "Typical savings are 20–40%. Well-formatted CSS with many comments and indentation can see savings of 50% or more." },
    { question: "Is minified CSS reversible?", answer: "Minified CSS is valid but hard to read. Use the CSS Formatter tool to beautify it back into readable form." },
    { question: "Should I serve minified CSS in production?", answer: "Yes. For best performance, serve minified CSS and enable gzip or Brotli compression on your server. These two combined can reduce CSS to 5–10% of the original size." },
    { question: "Is my CSS data safe?", answer: "Yes. All processing happens in your browser. Your CSS is never sent to a server." },
  ],
  relatedTools: ["css-formatter", "css-unit-converter", "js-minifier", "html-minifier"],
  howToSteps: [
    "Paste your CSS into the input editor",
    "The minified CSS appears automatically",
    "Check the size savings percentage",
    "Copy the minified output",
  ],
  lastUpdated: "2025-01-01",
};
