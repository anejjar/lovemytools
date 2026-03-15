export interface MinifyResult {
  output: string;
  error: string | null;
  originalSize: number;
  minifiedSize: number;
  savingsPercent: number;
}

export function minifyCss(input: string): MinifyResult {
  if (!input.trim()) return { output: "", error: null, originalSize: 0, minifiedSize: 0, savingsPercent: 0 };
  try {
    const output = input
      .replace(/\/\*[\s\S]*?\*\//g, "") // remove block comments
      .replace(/\s*([{};:,>~+])\s*/g, "$1") // remove spaces around special chars
      .replace(/\s+/g, " ") // collapse whitespace
      .replace(/;\}/g, "}") // remove last semicolon in rule
      .replace(/\s*!\s*important/g, "!important")
      .trim();

    const originalSize = Buffer.byteLength(input, "utf8");
    const minifiedSize = Buffer.byteLength(output, "utf8");
    const savingsPercent = originalSize > 0 ? Math.round(((originalSize - minifiedSize) / originalSize) * 100) : 0;

    return { output, error: null, originalSize, minifiedSize, savingsPercent };
  } catch (e) {
    return { output: "", error: (e as Error).message, originalSize: 0, minifiedSize: 0, savingsPercent: 0 };
  }
}
