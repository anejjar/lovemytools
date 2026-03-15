import { diffLines, diffWords } from "diff";

export interface DiffLine {
  value: string;
  added: boolean;
  removed: boolean;
}

export interface TextDiffResult {
  lines: DiffLine[];
  additions: number;
  deletions: number;
  unchanged: number;
}

export function diffText(left: string, right: string, mode: "lines" | "words" = "lines"): TextDiffResult {
  const changes = mode === "lines" ? diffLines(left, right) : diffWords(left, right);
  const lines: DiffLine[] = [];
  let additions = 0, deletions = 0, unchanged = 0;

  for (const change of changes) {
    const parts = change.value.split("\n");
    const items = mode === "lines"
      ? parts.filter((_, i) => i < parts.length - 1 || parts[parts.length - 1] !== "")
      : [change.value];

    for (const item of items) {
      lines.push({ value: item, added: !!change.added, removed: !!change.removed });
      if (change.added) additions++;
      else if (change.removed) deletions++;
      else unchanged++;
    }
  }

  return { lines, additions, deletions, unchanged };
}
