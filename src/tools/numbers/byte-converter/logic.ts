export type ByteUnit = "B" | "KB" | "MB" | "GB" | "TB" | "PB" | "KiB" | "MiB" | "GiB" | "TiB";

const SI_UNITS: Record<string, number> = { B: 1, KB: 1e3, MB: 1e6, GB: 1e9, TB: 1e12, PB: 1e15 };
const BINARY_UNITS: Record<string, number> = { B: 1, KiB: 1024, MiB: 1024 ** 2, GiB: 1024 ** 3, TiB: 1024 ** 4 };
const ALL_FACTORS: Record<ByteUnit, number> = { ...SI_UNITS, ...BINARY_UNITS } as Record<ByteUnit, number>;

export interface ConvertResult {
  results: Record<ByteUnit, string>;
  error: string | null;
}

export function convertBytes(value: string, fromUnit: ByteUnit): ConvertResult {
  const empty = Object.fromEntries(Object.keys(ALL_FACTORS).map((k) => [k, ""])) as Record<ByteUnit, string>;
  if (!value.trim()) return { results: empty, error: null };

  const num = parseFloat(value);
  if (isNaN(num) || num < 0) return { results: empty, error: "Enter a valid non-negative number" };

  const bytes = num * ALL_FACTORS[fromUnit];

  const results = Object.fromEntries(
    Object.entries(ALL_FACTORS).map(([unit, factor]) => {
      const converted = bytes / factor;
      const str = converted >= 1
        ? Number.isInteger(converted)
          ? converted.toString()
          : converted.toPrecision(7).replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "")
        : converted.toExponential(4);
      return [unit, str];
    })
  ) as Record<ByteUnit, string>;

  return { results, error: null };
}

export const SI_BYTE_UNITS: ByteUnit[] = ["B", "KB", "MB", "GB", "TB", "PB"];
export const BINARY_BYTE_UNITS: ByteUnit[] = ["B", "KiB", "MiB", "GiB", "TiB"];
