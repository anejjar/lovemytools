export interface MinifyResult {
  output: string;
  error: string | null;
}

export interface MinifyStats {
  originalSize: number;
  minifiedSize: number;
  savings: number;
  savingsPercent: number;
}

export function minifyJson(input: string): MinifyResult {
  if (!input.trim()) return { output: "", error: null };
  try {
    const parsed = JSON.parse(input);
    return { output: JSON.stringify(parsed), error: null };
  } catch (e) {
    return { output: "", error: (e as SyntaxError).message };
  }
}

export function minifyJsonStats(original: string, minified: string): MinifyStats {
  const originalSize = Buffer.byteLength(original, "utf8");
  const minifiedSize = Buffer.byteLength(minified, "utf8");
  const savings = originalSize - minifiedSize;
  const savingsPercent = originalSize > 0 ? Math.round((savings / originalSize) * 100) : 0;
  return { originalSize, minifiedSize, savings, savingsPercent };
}
