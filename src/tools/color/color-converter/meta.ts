import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "color-converter",
  name: "Color Converter",
  tagline: "Convert colors between HEX, RGB, HSL, HSB, and CMYK",
  description:
    "Free online color converter. Convert colors between HEX, RGB, HSL, HSB, and CMYK formats instantly. Auto-detects your input format. Perfect for web developers and designers.",
  category: "color",
  keywords: [
    "color converter",
    "hex to rgb",
    "rgb to hex",
    "hex to hsl",
    "color format converter",
    "cmyk to rgb",
  ],
  faqs: [
    {
      question: "How do I convert HEX to RGB?",
      answer:
        "Paste any HEX color code (e.g., #6366f1) into the input field. The converter automatically detects the format and outputs the equivalent RGB, HSL, HSB, and CMYK values instantly.",
    },
    {
      question: "What color formats does this tool support?",
      answer:
        "This converter supports HEX (#rrggbb), RGB (rgb(r, g, b)), HSL (hsl(h, s%, l%)), HSB/HSV (hsb(h, s%, b%)), and CMYK (cmyk(c%, m%, y%, k%)).",
    },
    {
      question: "What is the difference between HSL and HSB?",
      answer:
        "Both use Hue and Saturation, but differ in the third component. HSL uses Lightness (0% = black, 50% = pure color, 100% = white). HSB uses Brightness/Value (0% = black, 100% = full brightness).",
    },
    {
      question: "What is CMYK and when is it used?",
      answer:
        "CMYK (Cyan, Magenta, Yellow, Key/Black) is a subtractive color model used in color printing. Unlike RGB which is additive (for screens), CMYK represents how inks are mixed on paper.",
    },
    {
      question: "Can I convert CSS color names?",
      answer:
        "Currently the converter supports HEX, RGB, HSL, and HSB inputs. CSS named colors (like 'red' or 'cornflowerblue') can be converted by first using your browser's developer tools to get the HEX value.",
    },
  ],
  relatedTools: ["color-picker", "password-generator", "json-formatter", "uuid-generator"],
  howToSteps: [
    "Paste any color value in HEX, RGB, HSL, or HSB format",
    "The format is auto-detected",
    "View all equivalent color representations instantly",
    "Click any value to copy it to your clipboard",
  ],
  lastUpdated: "2025-01-01",
};
