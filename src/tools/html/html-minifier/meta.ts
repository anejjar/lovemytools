import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "html-minifier",
  name: "HTML Minifier",
  tagline: "Minify HTML by removing comments and collapsing whitespace",
  description:
    "Free HTML minifier. Remove comments, collapse whitespace, and reduce your HTML file size. See exact byte savings. Runs entirely in your browser.",
  category: "html",
  keywords: ["html minifier", "minify html", "compress html", "html compressor", "reduce html size"],
  faqs: [
    { question: "What does HTML minification do?", answer: "It removes comments, collapses whitespace, and trims unnecessary characters from HTML to reduce file size without changing how it renders." },
    { question: "Will minified HTML still work correctly?", answer: "Yes. Browsers parse minified HTML identically to formatted HTML. The visual output is the same." },
    { question: "Are IE conditional comments preserved?", answer: "Yes. <!--[if IE]> conditional comments are preserved since they affect rendering in older browsers." },
    { question: "Should I minify HTML in production?", answer: "Yes, for performance. Most modern frameworks and CDNs do this automatically, but you can also do it manually." },
    { question: "Is my HTML sent to a server?", answer: "No. All processing happens locally in your browser. Nothing is transmitted." },
  ],
  relatedTools: ["html-formatter", "html-to-markdown", "css-minifier", "js-minifier"],
  howToSteps: [
    "Paste your HTML into the input editor",
    "The minified output appears automatically",
    "Check the byte savings in the stats bar",
    "Copy the minified HTML with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
