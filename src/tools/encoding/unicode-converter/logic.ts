export interface ConvertResult {
  output: string;
  error: string | null;
}

export function textToUnicode(input: string, format: "U+" | "\\u" | "&#x"): ConvertResult {
  if (!input) return { output: "", error: null };
  try {
    const points: string[] = [];
    for (const char of input) {
      const cp = char.codePointAt(0)!;
      const hex = cp.toString(16).toUpperCase().padStart(4, "0");
      if (format === "U+") points.push(`U+${hex}`);
      else if (format === "\\u") points.push(cp > 0xffff ? `\\u{${hex}}` : `\\u${hex}`);
      else points.push(`&#x${hex};`);
    }
    return { output: points.join(" "), error: null };
  } catch (e) {
    return { output: "", error: (e as Error).message };
  }
}

export function unicodeToText(input: string): ConvertResult {
  if (!input.trim()) return { output: "", error: null };
  try {
    let result = input;
    // U+XXXX or U+XXXXX — consume trailing space so "U+0048 U+0069" → "Hi" not "H i"
    result = result.replace(/U\+([0-9A-Fa-f]{4,6})[ \t]*/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    );
    // \uXXXX or \u{XXXX}
    result = result.replace(/\\u\{([0-9A-Fa-f]+)\}/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    );
    result = result.replace(/\\u([0-9A-Fa-f]{4})/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    );
    // &#xXXXX;
    result = result.replace(/&#x([0-9A-Fa-f]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    );
    // &#NNNN;
    result = result.replace(/&#(\d+);/g, (_, dec) =>
      String.fromCodePoint(parseInt(dec, 10))
    );
    return { output: result, error: null };
  } catch (e) {
    return { output: "", error: (e as Error).message };
  }
}

export function getCodePointInfo(char: string): { codePoint: number; hex: string; name: string; utf8: string } {
  const cp = char.codePointAt(0) ?? 0;
  const hex = cp.toString(16).toUpperCase().padStart(4, "0");
  const utf8Bytes = Array.from(new Uint8Array(new TextEncoder().encode(char)))
    .map((b) => b.toString(16).toUpperCase().padStart(2, "0"))
    .join(" ");
  return { codePoint: cp, hex, name: `U+${hex}`, utf8: utf8Bytes };
}
