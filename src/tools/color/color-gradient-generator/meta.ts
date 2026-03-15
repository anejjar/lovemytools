import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "color-gradient-generator",
  name: "Color Gradient Generator",
  tagline: "Create smooth color gradients and export CSS instantly",
  description:
    "Free color gradient generator. Build beautiful multi-stop linear gradients, preview them live, and copy the CSS background property with one click.",
  category: "color",
  keywords: ["color gradient generator", "gradient maker", "css gradient", "linear gradient", "gradient color picker"],
  faqs: [
    { question: "How is this different from the CSS Gradient Generator?", answer: "This tool focuses on color selection and smooth interpolation between colors, while the CSS Gradient Generator also supports radial and conic gradients with full CSS control." },
    { question: "Can I add more than two colors?", answer: "Yes. Click '+ Add stop' to add as many color stops as you need." },
    { question: "How do I make a smooth gradient?", answer: "Place stops at even intervals. For very smooth gradients, use colors with similar hue and saturation, varying only the lightness." },
    { question: "What angle should I use?", answer: "90° gives a left-to-right gradient, 180° gives top-to-bottom, and 135° gives a diagonal. Experiment to find what works for your design." },
    { question: "Can I use this gradient as a text color?", answer: "Yes, use background-clip: text and -webkit-background-clip: text with color: transparent alongside the gradient background." },
  ],
  relatedTools: ["color-palette-generator", "contrast-checker", "css-gradient-generator"],
  howToSteps: [
    "Pick colors for each gradient stop using the color pickers",
    "Adjust stop positions with the sliders",
    "Set the gradient angle",
    "Add more stops for a richer gradient",
    "Copy the CSS output",
  ],
  lastUpdated: "2025-01-01",
};
