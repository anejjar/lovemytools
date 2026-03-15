import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "text-diff-checker",
  name: "Text Diff Checker",
  tagline: "Compare two texts and highlight every difference",
  description:
    "Free online text diff checker. Compare two blocks of text side by side and instantly see additions, deletions, and changes highlighted line-by-line or word-by-word.",
  category: "text",
  keywords: ["text diff", "compare text", "text comparison", "diff checker", "text difference", "diff tool online"],
  faqs: [
    { question: "What is a text diff?", answer: "A diff shows the differences between two versions of text. Lines or words added in the new version are highlighted green, and those removed are highlighted red." },
    { question: "What is the difference between line and word mode?", answer: "Line mode compares full lines and is best for code or structured content. Word mode compares individual words and is best for prose where lines don't have fixed meaning." },
    { question: "Can I use this to compare code?", answer: "Yes. Line mode works well for code comparison. For JSON specifically, use the JSON Diff tool which normalises formatting before comparing." },
    { question: "Is there a size limit?", answer: "There is no hard limit, but very large inputs (>1MB) may be slow since all comparison happens in your browser." },
    { question: "Is my data private?", answer: "Yes. Everything runs in your browser. Your text never leaves your device." },
  ],
  relatedTools: ["json-diff", "regex-tester", "word-counter", "markdown-previewer"],
  howToSteps: [
    "Paste the original text in the left panel",
    "Paste the modified text in the right panel",
    "The diff appears instantly — green for additions, red for deletions",
    "Switch between line and word mode as needed",
  ],
  lastUpdated: "2025-01-01",
};
