import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "slug-generator",
  name: "Slug Generator",
  tagline: "Convert titles to clean URL-friendly slugs",
  description:
    "Free online slug generator. Convert any title or phrase into a clean, SEO-friendly URL slug. Strips special characters, diacritics, and whitespace automatically.",
  category: "text",
  keywords: ["slug generator", "url slug", "seo slug", "permalink generator", "url friendly text", "slug converter"],
  faqs: [
    { question: "What is a URL slug?", answer: "A URL slug is the human-readable part of a URL that identifies a specific page. For example, in /blog/my-first-post, the slug is 'my-first-post'. Good slugs are short, lowercase, and use hyphens." },
    { question: "Why use hyphens instead of underscores?", answer: "Google treats hyphens as word separators but underscores as word joiners. 'hello-world' is indexed as two words; 'hello_world' as one. Hyphens are the SEO standard for URL slugs." },
    { question: "What happens to accented characters?", answer: "Accented characters (é, ü, ñ) are converted to their ASCII equivalents (e, u, n) so the slug works across all browsers and servers without encoding issues." },
    { question: "Can I set a maximum slug length?", answer: "Yes. Use the max length option to limit the slug. Most CMS platforms and SEO guidelines recommend keeping slugs under 60 characters." },
    { question: "Is this good for SEO?", answer: "Yes. Clean, descriptive slugs help search engines understand your page content and improve click-through rates from search results." },
  ],
  relatedTools: ["case-converter", "word-counter", "url-encoder", "lorem-ipsum-generator"],
  howToSteps: [
    "Type or paste your page title or phrase",
    "The slug is generated instantly below",
    "Adjust separator (hyphen or underscore) and max length as needed",
    "Copy the slug with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
