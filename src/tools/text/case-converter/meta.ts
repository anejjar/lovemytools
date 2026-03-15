import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "case-converter",
  name: "Case Converter",
  tagline: "Convert text between camelCase, snake_case, PascalCase, and more",
  description:
    "Free online case converter. Transform text between uppercase, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE instantly.",
  category: "text",
  keywords: ["case converter", "camelcase converter", "snake case converter", "kebab case", "text case", "string case converter", "pascal case"],
  faqs: [
    { question: "What is camelCase?", answer: "camelCase joins words by capitalizing the first letter of each word except the first (e.g., helloWorld). It's widely used in JavaScript, Java, and most programming languages for variable names." },
    { question: "What is snake_case?", answer: "snake_case uses underscores between words with all letters lowercase (e.g., hello_world). It's standard in Python, Ruby, and SQL." },
    { question: "What is PascalCase?", answer: "PascalCase (or UpperCamelCase) capitalizes the first letter of every word (e.g., HelloWorld). It's used for class names in most languages." },
    { question: "What is kebab-case?", answer: "kebab-case uses hyphens between lowercase words (e.g., hello-world). It's used in HTML attributes, CSS class names, and URL slugs." },
    { question: "Can it convert from one coding style to another?", answer: "Yes. The tool detects camelCase, snake_case, kebab-case, and space-separated words and converts between any of the supported formats." },
  ],
  relatedTools: ["slug-generator", "word-counter", "regex-tester", "lorem-ipsum-generator"],
  howToSteps: [
    "Paste or type your text into the input box",
    "Click any case format button to convert instantly",
    "Copy the result with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
