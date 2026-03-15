export interface ConvertResult {
  output: string;
  error: string | null;
}

const TO_ROMAN: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

export function toRoman(n: number): ConvertResult {
  if (!Number.isInteger(n) || n < 1 || n > 3999) {
    return { output: "", error: "Enter a whole number between 1 and 3999" };
  }
  let result = "";
  let remaining = n;
  for (const [value, numeral] of TO_ROMAN) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  return { output: result, error: null };
}

export function fromRoman(input: string): ConvertResult {
  if (!input.trim()) return { output: "", error: null };
  const str = input.trim().toUpperCase();
  const romanValues: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

  if (!/^[IVXLCDM]+$/.test(str)) {
    return { output: "", error: "Invalid Roman numeral characters. Use I, V, X, L, C, D, M only." };
  }

  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const curr = romanValues[str[i]];
    const next = romanValues[str[i + 1]] ?? 0;
    result += curr < next ? -curr : curr;
  }

  if (result < 1 || result > 3999) {
    return { output: "", error: "Result out of range (1–3999)" };
  }
  return { output: String(result), error: null };
}
