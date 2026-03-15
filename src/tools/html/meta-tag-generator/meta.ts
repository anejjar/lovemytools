import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "meta-tag-generator",
  name: "Meta Tag Generator",
  tagline: "Generate SEO, Open Graph, and Twitter Card meta tags instantly",
  description:
    "Free HTML meta tag generator. Fill in your page details and get complete SEO, Open Graph, and Twitter Card meta tags ready to paste into your HTML head.",
  category: "html",
  keywords: ["meta tag generator", "seo meta tags", "open graph generator", "twitter card generator", "html meta tags"],
  faqs: [
    { question: "What are meta tags?", answer: "Meta tags are HTML elements in the <head> that provide metadata about a page to search engines and social media platforms." },
    { question: "What is the ideal description length?", answer: "Between 120 and 160 characters. Longer descriptions are truncated in search results." },
    { question: "What are Open Graph tags?", answer: "Open Graph tags (og:title, og:description, og:image) control how your page appears when shared on Facebook, LinkedIn, and other social platforms." },
    { question: "What is a Twitter Card?", answer: "Twitter Card meta tags control the preview shown when a URL is shared on Twitter/X. 'summary_large_image' shows a big image card." },
    { question: "Do I need a canonical tag?", answer: "Use a canonical tag when the same content is accessible at multiple URLs, to tell search engines which URL is the primary one." },
  ],
  relatedTools: ["html-formatter", "html-to-markdown", "url-parser"],
  howToSteps: [
    "Fill in the basic SEO fields (title, description, keywords)",
    "Add Open Graph fields for social sharing previews",
    "Add Twitter Card fields for Twitter/X previews",
    "Copy the generated tags and paste them into your HTML <head>",
  ],
  lastUpdated: "2025-01-01",
};
