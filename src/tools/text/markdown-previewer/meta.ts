import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "markdown-previewer",
  name: "Markdown Previewer",
  tagline: "Write Markdown and see the live HTML preview instantly",
  description:
    "Free online Markdown previewer. Write or paste Markdown and see the rendered HTML preview in real time. Supports GFM, tables, code blocks, and task lists.",
  category: "text",
  keywords: ["markdown previewer", "markdown editor online", "markdown to html", "markdown renderer", "live markdown preview", "github markdown"],
  faqs: [
    { question: "What Markdown flavour is supported?", answer: "The tool uses GitHub Flavored Markdown (GFM), which adds tables, strikethrough, task lists, and fenced code blocks on top of standard CommonMark." },
    { question: "Can I copy the HTML output?", answer: "Yes. Switch to HTML view and use the Copy button to grab the rendered HTML." },
    { question: "Are tables supported?", answer: "Yes. Use the GFM table syntax with | to separate columns and --- to create the header separator row." },
    { question: "Does it support syntax highlighting in code blocks?", answer: "The tool renders fenced code blocks with the correct language class. Syntax highlighting styling can be added via your own CSS." },
    { question: "Is my content private?", answer: "Yes. All rendering happens in your browser using the marked library. Nothing is sent to any server." },
  ],
  relatedTools: ["word-counter", "text-diff-checker", "html-formatter", "lorem-ipsum-generator"],
  howToSteps: [
    "Type or paste your Markdown into the left panel",
    "The rendered preview updates in real time on the right",
    "Switch to HTML view to see and copy the raw HTML output",
  ],
  lastUpdated: "2025-01-01",
};
