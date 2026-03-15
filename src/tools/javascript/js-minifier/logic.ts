export interface MinifyResult {
  output: string;
  originalSize: number;
  minifiedSize: number;
  savings: number;
  savingsPercent: number;
  error: string | null;
}

/**
 * Basic JS minifier using regex transforms.
 * Handles: single-line comments, multi-line comments, extra whitespace,
 * and whitespace around operators/punctuation.
 * Note: does not handle string literals containing comment-like sequences perfectly —
 * for production use, a proper AST-based minifier (like terser) is recommended.
 */
export function minifyJs(code: string): MinifyResult {
  const originalSize = new TextEncoder().encode(code).length;

  if (!code.trim()) {
    return { output: "", originalSize: 0, minifiedSize: 0, savings: 0, savingsPercent: 0, error: null };
  }

  try {
    let result = code;

    // Remove multi-line comments (non-greedy)
    result = result.replace(/\/\*[\s\S]*?\*\//g, "");

    // Remove single-line comments (not inside strings — basic heuristic)
    result = result.replace(/(?<!['"\/])\/\/[^\n]*/g, "");

    // Collapse multiple whitespace/newlines to single space
    result = result.replace(/\s+/g, " ");

    // Remove whitespace around operators and punctuation
    result = result.replace(/\s*([{};,=+\-*/<>!&|?:()[\]])\s*/g, "$1");

    // Remove trailing semicolons before closing braces
    result = result.replace(/;}/g, "}");

    result = result.trim();

    const minifiedSize = new TextEncoder().encode(result).length;
    const savings = originalSize - minifiedSize;
    const savingsPercent = originalSize > 0 ? Math.round((savings / originalSize) * 100) : 0;

    return { output: result, originalSize, minifiedSize, savings, savingsPercent, error: null };
  } catch (e) {
    return { output: "", originalSize, minifiedSize: 0, savings: 0, savingsPercent: 0, error: String(e) };
  }
}
