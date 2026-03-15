export type Base = 2 | 8 | 10 | 16;

export interface ConversionResult {
  value: string;
  error: string | null;
}

export interface AllBases {
  binary: string;
  octal: string;
  decimal: string;
  hex: string;
  error: string | null;
}

export function convertBase(input: string, fromBase: Base): AllBases {
  const empty = { binary: "", octal: "", decimal: "", hex: "", error: null };
  if (!input.trim()) return empty;

  const cleaned = input.trim().toLowerCase().replace(/\s/g, "");

  // Validate all characters are valid for the given base
  const validChars: Record<Base, RegExp> = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    10: /^\d+$/,
    16: /^[0-9a-f]+$/,
  };
  if (!validChars[fromBase].test(cleaned)) {
    return { ...empty, error: `Invalid base-${fromBase} number: "${input}"` };
  }

  const decimal = parseInt(cleaned, fromBase);

  if (isNaN(decimal) || decimal < 0) {
    return { ...empty, error: `Invalid base-${fromBase} number: "${input}"` };
  }
  if (decimal > Number.MAX_SAFE_INTEGER) {
    return { ...empty, error: "Number too large to convert safely" };
  }

  return {
    binary: decimal.toString(2),
    octal: decimal.toString(8),
    decimal: decimal.toString(10),
    hex: decimal.toString(16).toUpperCase(),
    error: null,
  };
}

export function formatBinary(bin: string): string {
  return bin.replace(/(.{4})/g, "$1 ").trim();
}

export const BASE_LABELS: Record<Base, string> = {
  2: "Binary (Base 2)",
  8: "Octal (Base 8)",
  10: "Decimal (Base 10)",
  16: "Hexadecimal (Base 16)",
};
