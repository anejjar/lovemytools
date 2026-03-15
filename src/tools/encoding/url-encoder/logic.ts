export interface EncodeResult {
  output: string;
  error: string | null;
}

export function encodeUrl(input: string, encodeAll = false): EncodeResult {
  if (!input.trim()) return { output: "", error: null };
  try {
    const output = encodeAll ? encodeURIComponent(input) : encodeURI(input);
    return { output, error: null };
  } catch (e) {
    return { output: "", error: (e as Error).message };
  }
}

export function decodeUrl(input: string): EncodeResult {
  if (!input.trim()) return { output: "", error: null };
  try {
    const output = decodeURIComponent(input.trim());
    return { output, error: null };
  } catch (e) {
    return { output: "", error: "Invalid URL encoding: " + (e as Error).message };
  }
}

export function encodeUrlQuery(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}
