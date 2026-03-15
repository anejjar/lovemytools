import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "html-to-markdown",
  name: "HTML to Markdown Converter",
  tagline: "Convert HTML markup to clean Markdown syntax instantly",
  description:
    "Free HTML to Markdown converter. Paste HTML and get clean Markdown with headings, bold, links, lists, and code blocks. Works entirely in your browser.",
  category: "html",
  keywords: ["html to markdown", "convert html to markdown", "html markdown converter", "html to md", "markdown converter"],
  faqs: [
    { question: "What HTML elements are supported?", answer: "Headings (h1-h6), bold, italic, links, images, unordered and ordered lists, paragraphs, code blocks, inline code, blockquotes, and horizontal rules." },
    { question: "What happens to unsupported HTML tags?", answer: "Tags that have no Markdown equivalent are stripped, but their text content is preserved." },
    { question: "Are HTML entities decoded?", answer: "Yes. Common entities like &amp;, &lt;, &gt;, &quot;, and &nbsp; are decoded to their character equivalents." },
    { question: "Are scripts and styles removed?", answer: "Yes. Script and style block content is completely removed for safety and cleanliness." },
    { question: "Why would I convert HTML to Markdown?", answer: "Markdown is easier to write and read than HTML, and is used in many content systems, documentation tools, and GitHub READMEs." },
  ],
  relatedTools: ["html-formatter", "html-minifier", "markdown-previewer", "meta-tag-generator"],
  howToSteps: [
    "Paste your HTML into the input editor",
    "The Markdown output appears automatically",
    "Review and edit the output if needed",
    "Copy the Markdown with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
