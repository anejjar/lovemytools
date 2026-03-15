import { diffLines } from "diff";

export interface DiffResult {
  diff: DiffLine[];
  error: string | null;
  additions: number;
  deletions: number;
}

export interface DiffLine {
  value: string;
  added: boolean;
  removed: boolean;
}

export function parseJsonSafe(input: string): { parsed: unknown; error: string | null } {
  if (!input.trim()) return { parsed: null, error: null };
  try {
    return { parsed: JSON.parse(input), error: null };
  } catch (e) {
    return { parsed: null, error: (e as SyntaxError).message };
  }
}

export function diffJson(left: string, right: string): DiffResult {
  if (!left.trim() && !right.trim()) {
    return { diff: [], error: null, additions: 0, deletions: 0 };
  }

  const leftParsed = parseJsonSafe(left);
  if (leftParsed.error) return { diff: [], error: `Left: ${leftParsed.error}`, additions: 0, deletions: 0 };

  const rightParsed = parseJsonSafe(right);
  if (rightParsed.error) return { diff: [], error: `Right: ${rightParsed.error}`, additions: 0, deletions: 0 };

  const leftFormatted = JSON.stringify(leftParsed.parsed, null, 2);
  const rightFormatted = JSON.stringify(rightParsed.parsed, null, 2);

  const changes = diffLines(leftFormatted, rightFormatted);

  let additions = 0;
  let deletions = 0;
  const diff: DiffLine[] = [];

  for (const change of changes) {
    const lines = change.value.split("\n").filter((_, i, arr) => i < arr.length - 1 || arr[arr.length - 1] !== "");
    for (const line of lines) {
      diff.push({ value: line, added: !!change.added, removed: !!change.removed });
      if (change.added) additions++;
      if (change.removed) deletions++;
    }
  }

  return { diff, error: null, additions, deletions };
}
