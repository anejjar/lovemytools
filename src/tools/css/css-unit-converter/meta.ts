import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "css-unit-converter",
  name: "CSS Unit Converter",
  tagline: "Convert px, rem, em, vw, vh, pt and more instantly",
  description:
    "Free CSS unit converter. Convert between px, rem, em, %, vw, vh, pt, pc, cm, mm, and in with custom base font size and viewport settings.",
  category: "css",
  keywords: ["css unit converter", "px to rem", "rem to px", "px to em", "css units", "convert css units"],
  faqs: [
    { question: "What is the default base font size?", answer: "16px, which is the browser default. You can change it in the settings to match your project's root font size." },
    { question: "What's the difference between rem and em?", answer: "rem is relative to the root (html) font size, while em is relative to the current element's parent font size. rem is generally easier to reason about." },
    { question: "How are vw and vh calculated?", answer: "vw and vh are percentages of the viewport width and height respectively. You can set a custom viewport size to match your target device." },
    { question: "Why does % conversion need a parent size?", answer: "Percentage in CSS is relative to the parent element's size. You need to specify the parent's size in px for an accurate conversion." },
    { question: "Is 1rem always 16px?", answer: "Only if the root font size is 16px, which is the browser default. If a site sets html { font-size: 18px }, then 1rem equals 18px." },
  ],
  relatedTools: ["css-formatter", "css-minifier", "css-gradient-generator"],
  howToSteps: [
    "Enter the value you want to convert",
    "Select the source unit from the dropdown",
    "Optionally adjust base font size or viewport dimensions",
    "All equivalent values in other units appear instantly",
  ],
  lastUpdated: "2025-01-01",
};
