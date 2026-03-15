import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "regex-tester",
  name: "Regex Tester",
  tagline: "Test and debug regular expressions with live match highlighting",
  description:
    "Free online regex tester. Write and test regular expressions with live match highlighting, capture group inspection, and support for all JavaScript regex flags.",
  category: "text",
  keywords: ["regex tester", "regular expression tester", "regex debugger", "regex online", "regex matcher", "regexp tester"],
  faqs: [
    { question: "What regex flavor does this use?", answer: "This tool uses JavaScript's built-in RegExp engine, which supports most standard regex syntax including lookaheads, named capture groups, and Unicode mode." },
    { question: "What do the flags mean?", answer: "g = global (find all matches), i = case insensitive, m = multiline (^ and $ match line boundaries), s = dotAll (. matches newlines), u = Unicode mode." },
    { question: "What are capture groups?", answer: "Groups wrapped in () capture the matched text. Named groups use (?<name>...) syntax. Captured values appear in the match details panel." },
    { question: "Why does my regex loop infinitely?", answer: "Patterns that can match zero-length strings (like a* or .*) can loop infinitely. The tool has a built-in safety limit of 10,000 matches to prevent this." },
    { question: "Is my text data private?", answer: "Yes. All regex matching happens in your browser. Nothing is sent to a server." },
  ],
  relatedTools: ["text-diff-checker", "case-converter", "word-counter", "slug-generator"],
  howToSteps: [
    "Enter your regular expression in the Pattern field",
    "Select the flags you need (g, i, m, etc.)",
    "Paste your test text below — matches are highlighted in real time",
    "Click a match to inspect capture groups",
  ],
  lastUpdated: "2025-01-01",
};
