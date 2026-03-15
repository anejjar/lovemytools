import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "color-palette-generator",
  name: "Color Palette Generator",
  tagline: "Generate complementary, analogous, triadic, and shade palettes",
  description:
    "Free color palette generator. Pick a base color and instantly get complementary, analogous, triadic, and tint/shade palettes with hex, RGB, and HSL values.",
  category: "color",
  keywords: ["color palette generator", "complementary colors", "color scheme generator", "analogous colors", "color shades"],
  faqs: [
    { question: "What is a complementary color?", answer: "Complementary colors sit opposite each other on the color wheel (180° apart). They create strong contrast and are great for call-to-action buttons." },
    { question: "What are analogous colors?", answer: "Analogous colors are adjacent on the color wheel (within 30°). They create harmonious, pleasing palettes often seen in nature." },
    { question: "What are triadic colors?", answer: "Triadic colors are evenly spaced 120° apart on the color wheel, creating vibrant, balanced palettes." },
    { question: "What is a shade palette?", answer: "A shade palette shows the same hue at different lightness levels, from dark to light. Useful for building design system token scales." },
    { question: "Can I copy hex values?", answer: "Yes. Click any color swatch to copy its hex code to the clipboard." },
  ],
  relatedTools: ["contrast-checker", "css-gradient-generator", "color-gradient-generator"],
  howToSteps: [
    "Pick a base color using the color picker",
    "Browse complementary, analogous, triadic, and shade palettes",
    "Click any swatch to copy its hex code",
    "Use the values in your CSS or design tool",
  ],
  lastUpdated: "2025-01-01",
};
