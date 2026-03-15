import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "json-diff",
  name: "JSON Diff Checker",
  tagline: "Compare two JSON objects and highlight differences",
  description:
    "Free online JSON diff tool. Paste two JSON objects side by side to instantly see what was added, removed, or changed. Browser-based, no data sent to servers.",
  category: "json",
  keywords: ["json diff", "json compare", "json difference", "compare json objects", "json diff checker", "json delta"],
  faqs: [
    { question: "What is a JSON diff tool?", answer: "A JSON diff tool compares two JSON objects and highlights the differences between them — showing which lines were added (green), removed (red), or unchanged." },
    { question: "Does the order of keys matter?", answer: "No. Both inputs are parsed and re-formatted with consistent key ordering before comparison, so only meaningful data differences are highlighted." },
    { question: "Can I compare JSON arrays?", answer: "Yes. The tool handles any valid JSON — objects, arrays, strings, numbers, or booleans." },
    { question: "Is my data secure?", answer: "Yes. Everything runs in your browser. Your JSON is never sent to a server." },
    { question: "What do the colors mean?", answer: "Green lines are additions (exist only in the right/new JSON). Red lines are deletions (exist only in the left/old JSON). Unchanged lines appear in the default text color." },
  ],
  relatedTools: ["json-formatter", "json-minifier", "text-diff-checker", "json-to-yaml"],
  howToSteps: [
    "Paste the original JSON into the left panel",
    "Paste the modified JSON into the right panel",
    "The diff appears instantly below — green for additions, red for deletions",
    "Check the summary for total additions and deletions",
  ],
  lastUpdated: "2025-01-01",
};
