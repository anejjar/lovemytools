import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "flexbox-generator",
  name: "CSS Flexbox Generator",
  tagline: "Generate flexbox CSS with a visual editor and live preview",
  description:
    "Free CSS flexbox generator. Visually configure flex containers and items. Adjust direction, wrap, alignment, gap, and more. Copy the CSS instantly.",
  category: "css",
  keywords: ["css flexbox generator", "flexbox", "flex container", "justify-content", "align-items", "css flex"],
  faqs: [
    { question: "What is flexbox?", answer: "Flexbox (Flexible Box Layout) is a CSS layout model that makes it easy to align and distribute space among items in a container, even when their sizes are unknown." },
    { question: "What is justify-content?", answer: "justify-content controls how items are distributed along the main axis (horizontally in a row, vertically in a column)." },
    { question: "What is align-items?", answer: "align-items controls how items are aligned along the cross axis (perpendicular to the main axis)." },
    { question: "When should I use flex-wrap: wrap?", answer: "Use wrap when you want items to wrap to a new line when there isn't enough space, rather than overflowing or shrinking." },
    { question: "What is gap in flexbox?", answer: "The gap property sets spacing between flex items without adding margin to the outer edges of the container." },
  ],
  relatedTools: ["box-shadow-generator", "border-radius-generator", "css-unit-converter"],
  howToSteps: [
    "Configure flex container properties like direction, wrap, and alignment",
    "Adjust gap between items",
    "Preview the layout with demo items",
    "Copy the container CSS output to your stylesheet",
  ],
  lastUpdated: "2025-01-01",
};
