export interface MinifyResult {
  output: string;
  originalSize: number;
  minifiedSize: number;
  savings: number;
  savingsPercent: number;
  error: string | null;
}

export function minifyHtml(html: string): MinifyResult {
  const encoder = new TextEncoder();
  const originalSize = encoder.encode(html).length;

  if (!html.trim()) {
    return { output: "", originalSize: 0, minifiedSize: 0, savings: 0, savingsPercent: 0, error: null };
  }

  try {
    let result = html;

    // Remove HTML comments (not IE conditionals)
    result = result.replace(/<!--(?!\[if)[\s\S]*?-->/g, "");

    // Collapse whitespace between tags
    result = result.replace(/>\s+</g, "><");

    // Collapse runs of whitespace to a single space (preserving content)
    result = result.replace(/\s{2,}/g, " ");

    // Remove whitespace before closing tags
    result = result.replace(/\s+\/>/g, "/>");

    // Remove whitespace around = in attributes
    result = result.replace(/\s*=\s*/g, "=");

    result = result.trim();

    const minifiedSize = encoder.encode(result).length;
    const savings = originalSize - minifiedSize;
    const savingsPercent = originalSize > 0 ? Math.round((savings / originalSize) * 100) : 0;

    return { output: result, originalSize, minifiedSize, savings, savingsPercent, error: null };
  } catch (e) {
    return { output: "", originalSize, minifiedSize: 0, savings: 0, savingsPercent: 0, error: String(e) };
  }
}
