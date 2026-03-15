export interface ConvertResult {
  output: string;
  error: string | null;
  rowCount: number;
  columnCount: number;
}

function escapeCsvCell(value: unknown, delimiter: string): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (str.includes(delimiter) || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function jsonToCsv(input: string, delimiter = ","): ConvertResult {
  if (!input.trim()) return { output: "", error: null, rowCount: 0, columnCount: 0 };

  try {
    const parsed: unknown = JSON.parse(input);
    const rows: Record<string, unknown>[] = Array.isArray(parsed)
      ? (parsed as Record<string, unknown>[])
      : [parsed as Record<string, unknown>];

    if (rows.length === 0) return { output: "", error: null, rowCount: 0, columnCount: 0 };

    const headers = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
    const headerRow = headers.map((h) => escapeCsvCell(h, delimiter)).join(delimiter);
    const dataRows = rows.map((row) =>
      headers.map((h) => escapeCsvCell(row[h], delimiter)).join(delimiter)
    );

    return {
      output: [headerRow, ...dataRows].join("\n"),
      error: null,
      rowCount: rows.length,
      columnCount: headers.length,
    };
  } catch (e) {
    return { output: "", error: (e as Error).message, rowCount: 0, columnCount: 0 };
  }
}

export function csvToJson(input: string, delimiter = ","): ConvertResult {
  if (!input.trim()) return { output: "", error: null, rowCount: 0, columnCount: 0 };

  try {
    const lines = input.trim().split("\n");
    if (lines.length < 2) {
      return { output: "[]", error: null, rowCount: 0, columnCount: 0 };
    }

    const headers = lines[0].split(delimiter).map((h) => h.trim().replace(/^"|"$/g, ""));
    const rows = lines.slice(1).map((line) => {
      const values = line.split(delimiter).map((v) => v.trim().replace(/^"|"$/g, ""));
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h] = values[i] ?? ""; });
      return obj;
    });

    return {
      output: JSON.stringify(rows, null, 2),
      error: null,
      rowCount: rows.length,
      columnCount: headers.length,
    };
  } catch (e) {
    return { output: "", error: (e as Error).message, rowCount: 0, columnCount: 0 };
  }
}
