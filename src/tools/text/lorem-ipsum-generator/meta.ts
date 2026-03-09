import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "lorem-ipsum-generator",
  name: "Lorem Ipsum Generator",
  tagline: "Generate placeholder text for your designs instantly",
  description:
    "Free Lorem Ipsum generator. Create custom placeholder text by words, sentences, or paragraphs. Perfect for UI mockups, web design, and print layouts.",
  category: "text",
  keywords: [
    "lorem ipsum generator",
    "placeholder text generator",
    "dummy text generator",
    "lorem ipsum online",
    "fake text generator",
  ],
  faqs: [
    {
      question: "What is Lorem Ipsum?",
      answer:
        "Lorem Ipsum is placeholder text commonly used in graphic design, publishing, and web development. It's derived from a work by Cicero (45 BC) and has been used as dummy text since the 1500s. It looks like readable Latin but is scrambled to avoid distraction.",
    },
    {
      question: "Why do designers use Lorem Ipsum?",
      answer:
        "Lorem Ipsum allows designers to focus on visual layout without the distraction of meaningful content. It approximates the character frequency of Latin script languages, giving a realistic visual representation of text density.",
    },
    {
      question: "Can I generate Lorem Ipsum in different units?",
      answer:
        "Yes. You can generate Lorem Ipsum by words (useful for button labels), sentences (for short copy blocks), or paragraphs (for body content areas).",
    },
    {
      question: "Does the generated Lorem Ipsum start with the classic opening?",
      answer:
        'You can toggle "Start with Lorem ipsum..." to always begin with the classic "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." opening that designers recognize.',
    },
    {
      question: "Can I copy the generated text?",
      answer:
        "Yes, click the Copy button to instantly copy all generated text to your clipboard.",
    },
  ],
  relatedTools: ["color-picker", "password-generator", "json-formatter", "base64"],
  howToSteps: [
    "Choose your unit: words, sentences, or paragraphs",
    "Set the quantity using the number input or slider",
    "Toggle 'Start with Lorem ipsum...' if desired",
    "Click 'Generate' to create your placeholder text",
    "Copy the result with one click",
  ],
  lastUpdated: "2025-01-01",
};
