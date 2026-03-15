import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "css-gradient-generator",
  name: "CSS Gradient Generator",
  tagline: "Create beautiful linear, radial, and conic CSS gradients",
  description:
    "Free CSS gradient generator. Build linear, radial, and conic gradients visually with a live preview. Copy the CSS code instantly. No login required.",
  category: "css",
  keywords: ["css gradient generator", "linear gradient", "radial gradient", "gradient css", "css background gradient"],
  faqs: [
    { question: "What gradient types are supported?", answer: "Linear (angle-based), radial (circle or ellipse), and conic gradients are all supported." },
    { question: "Can I add more than two color stops?", answer: "Yes. You can add as many color stops as you need and position each one anywhere from 0% to 100%." },
    { question: "How do I use the generated CSS?", answer: "Copy the CSS output and paste it into your stylesheet. The output is a standard CSS background property." },
    { question: "Are CSS gradients widely supported?", answer: "Yes. Linear and radial gradients are supported in all modern browsers. Conic gradients are supported in all modern browsers since 2021." },
    { question: "Can I create transparent gradients?", answer: "Yes. Use colors with an alpha channel, like rgba(255,0,0,0) or #ff000000, for transparent stops." },
  ],
  relatedTools: ["color-palette-generator", "contrast-checker", "css-unit-converter", "box-shadow-generator"],
  howToSteps: [
    "Select the gradient type: linear, radial, or conic",
    "Adjust the angle (for linear/conic) or shape (for radial)",
    "Click color swatches to pick colors for each stop",
    "Add or remove stops as needed",
    "Copy the generated CSS with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
