import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "box-shadow-generator",
  name: "CSS Box Shadow Generator",
  tagline: "Design and preview CSS box shadows with live output",
  description:
    "Free CSS box-shadow generator. Add multiple shadow layers, adjust offset, blur, spread, and color, and preview them in real time. Copies CSS in one click.",
  category: "css",
  keywords: ["css box shadow generator", "box-shadow", "css shadow", "drop shadow css", "inner shadow css"],
  faqs: [
    { question: "Can I add multiple shadow layers?", answer: "Yes. CSS supports layering multiple shadows separated by commas. Add as many layers as you need." },
    { question: "What is an inset shadow?", answer: "An inset shadow renders inside the element rather than outside, creating a recessed or pressed effect." },
    { question: "What does spread do?", answer: "Spread expands or contracts the shadow. A positive spread makes it larger than the element; negative makes it smaller." },
    { question: "How do I create a soft shadow?", answer: "Use a large blur radius, zero spread, and a low-opacity color like rgba(0,0,0,0.15)." },
    { question: "Does box-shadow affect layout?", answer: "No. Unlike outline or border, box-shadow does not take up space in the layout." },
  ],
  relatedTools: ["border-radius-generator", "css-gradient-generator", "flexbox-generator"],
  howToSteps: [
    "Adjust the offset, blur, spread, and color sliders",
    "Toggle inset to switch between outer and inner shadow",
    "Add multiple layers for complex effects",
    "Preview the result on the demo element",
    "Copy the CSS output",
  ],
  lastUpdated: "2025-01-01",
};
