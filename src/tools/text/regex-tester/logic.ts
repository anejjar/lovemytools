export interface RegexMatch {
  value: string;
  index: number;
  groups: Record<string, string> | null;
}

export interface RegexResult {
  matches: RegexMatch[];
  error: string | null;
  isValid: boolean;
  matchCount: number;
}

export function testRegex(pattern: string, flags: string, input: string): RegexResult {
  if (!pattern) return { matches: [], error: null, isValid: true, matchCount: 0 };
  try {
    const safeFlags = flags.includes("g") ? flags : flags + "g";
    const regex = new RegExp(pattern, safeFlags);
    const matches: RegexMatch[] = [];
    let m: RegExpExecArray | null;
    let safety = 0;
    while ((m = regex.exec(input)) !== null && safety++ < 10000) {
      matches.push({ value: m[0], index: m.index, groups: m.groups ? { ...m.groups } : null });
      if (m[0].length === 0) regex.lastIndex++; // avoid infinite loop on zero-length match
    }
    return { matches, error: null, isValid: true, matchCount: matches.length };
  } catch (e) {
    return { matches: [], error: (e as Error).message, isValid: false, matchCount: 0 };
  }
}

export function highlightMatches(input: string, matches: RegexMatch[]): Array<{ text: string; isMatch: boolean }> {
  if (!matches.length) return [{ text: input, isMatch: false }];
  const parts: Array<{ text: string; isMatch: boolean }> = [];
  let pos = 0;
  for (const match of matches) {
    if (match.index > pos) parts.push({ text: input.slice(pos, match.index), isMatch: false });
    parts.push({ text: match.value, isMatch: true });
    pos = match.index + match.value.length;
  }
  if (pos < input.length) parts.push({ text: input.slice(pos), isMatch: false });
  return parts;
}
