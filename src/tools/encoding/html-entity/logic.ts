export interface EncodeResult {
  output: string;
  error: string | null;
}

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  "¢": "&cent;", "£": "&pound;", "¥": "&yen;", "€": "&euro;",
  "©": "&copy;", "®": "&reg;", "™": "&trade;", "°": "&deg;",
  "±": "&plusmn;", "×": "&times;", "÷": "&divide;", "µ": "&micro;",
  "¶": "&para;", "·": "&middot;", "½": "&frac12;", "¼": "&frac14;",
  "¾": "&frac34;", "→": "&rarr;", "←": "&larr;", "↑": "&uarr;",
  "↓": "&darr;", "•": "&bull;", "…": "&hellip;", "–": "&ndash;",
  "—": "&mdash;", "\u2018": "&lsquo;", "\u2019": "&rsquo;", "\u201C": "&ldquo;", "\u201D": "&rdquo;",
};

const DECODE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(HTML_ENTITIES).map(([k, v]) => [v, k])
);

export function encodeHtmlEntities(input: string): EncodeResult {
  if (!input) return { output: "", error: null };
  const output = input.replace(/[&<>"'¢£¥€©®™°±×÷µ¶·½¼¾→←↑↓•…–—''""]/g, (ch) => HTML_ENTITIES[ch] ?? ch);
  return { output, error: null };
}

export function decodeHtmlEntities(input: string): EncodeResult {
  if (!input) return { output: "", error: null };
  // Decode named entities
  let output = input.replace(/&[a-zA-Z]+;/g, (entity) => DECODE_MAP[entity] ?? entity);
  // Decode numeric decimal entities
  output = output.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
  // Decode numeric hex entities
  output = output.replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
  return { output, error: null };
}
