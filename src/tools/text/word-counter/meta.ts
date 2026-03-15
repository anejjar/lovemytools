import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "word-counter",
  name: "Word Counter",
  tagline: "Count words, characters, sentences, and reading time",
  description:
    "Free online word counter. Instantly count words, characters, sentences, paragraphs, and estimate reading time. Great for essays, articles, and social media posts.",
  category: "text",
  keywords: ["word counter", "character counter", "word count online", "text analyzer", "reading time calculator", "word frequency"],
  faqs: [
    { question: "How does the word counter work?", answer: "The tool splits text by whitespace to count words, counts every character for the character count, and uses punctuation patterns to estimate sentences and paragraphs." },
    { question: "How is reading time calculated?", answer: "Reading time is based on an average reading speed of 200 words per minute, which is typical for adults reading non-technical content." },
    { question: "What counts as a sentence?", answer: "Sentences are counted by detecting punctuation marks like periods, exclamation points, and question marks. The count is approximate for conversational text." },
    { question: "Can I use this for SEO content?", answer: "Yes. Most SEO articles recommend 1,500–2,500 words. Blog posts perform best at 1,000+ words, and meta descriptions should be 150–160 characters." },
    { question: "Is there a word limit?", answer: "There's no hard limit. The tool handles long documents efficiently since all processing is done locally in your browser." },
  ],
  relatedTools: ["case-converter", "slug-generator", "lorem-ipsum-generator", "markdown-previewer"],
  howToSteps: [
    "Type or paste your text into the editor",
    "Word and character counts update in real time",
    "View reading time, sentence count, and top words below",
  ],
  lastUpdated: "2025-01-01",
};
