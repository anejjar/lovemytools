import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "border-radius-generator",
  name: "CSS Border Radius Generator",
  tagline: "Create and preview border-radius values with a visual editor",
  description:
    "Free CSS border-radius generator. Control each corner independently or use uniform rounding. Preview in real time and copy the CSS code instantly.",
  category: "css",
  keywords: ["css border radius generator", "border-radius", "rounded corners css", "css border radius", "pill shape css"],
  faqs: [
    { question: "Can I set each corner independently?", answer: "Yes. Uncheck 'Link all corners' to set different values for top-left, top-right, bottom-right, and bottom-left independently." },
    { question: "How do I make a circle?", answer: "Set all corners to 50% and make sure the element has equal width and height." },
    { question: "What is the difference between px and %?", answer: "px sets an absolute radius, while % is relative to the element's dimensions. 50% on a square gives a circle." },
    { question: "How do I make a pill shape?", answer: "Set border-radius to 9999px (or a large value) on a rectangular element." },
    { question: "Does border-radius work on images?", answer: "Yes. Add border-radius to an img or its container to round its corners." },
  ],
  relatedTools: ["box-shadow-generator", "css-gradient-generator", "css-unit-converter"],
  howToSteps: [
    "Drag the sliders to adjust corner radius",
    "Toggle 'Link all corners' for uniform rounding",
    "Switch between px and % units",
    "Preview the shape on the demo element",
    "Copy the CSS output",
  ],
  lastUpdated: "2025-01-01",
};
