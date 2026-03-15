export interface ConvertResult {
  output: string;
  error: string | null;
}

/**
 * Convert a JavaScript object/value literal to valid JSON.
 * Handles: single-quoted strings, trailing commas, unquoted keys,
 * undefined → null, Infinity/NaN → null.
 */
export function jsToJson(code: string, indent = 2): ConvertResult {
  if (!code.trim()) return { output: "", error: null };
  try {
    // Strip comments
    let s = code
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");

    // Replace undefined/Infinity/NaN with null
    s = s.replace(/\bundefined\b/g, "null")
         .replace(/\bInfinity\b/g, "null")
         .replace(/\bNaN\b/g, "null");

    // Remove trailing commas before ] or }
    s = s.replace(/,(\s*[}\]])/g, "$1");

    // Quote unquoted keys: word chars not already quoted
    s = s.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:)/g, '$1"$2"$3');

    // Convert single-quoted strings to double-quoted
    s = s.replace(/'([^'\\]|\\.)*'/g, (m) => {
      const inner = m.slice(1, -1).replace(/\\'/g, "'").replace(/"/g, '\\"');
      return `"${inner}"`;
    });

    // Parse and re-stringify to validate and format
    // eslint-disable-next-line no-new-func
    const value = new Function(`"use strict"; return (${s.trim()})`)();
    return { output: JSON.stringify(value, null, indent), error: null };
  } catch (e) {
    return { output: "", error: `Parse error: ${e instanceof Error ? e.message : String(e)}` };
  }
}

export function jsonToJs(json: string, indent = 2): ConvertResult {
  if (!json.trim()) return { output: "", error: null };
  try {
    const value = JSON.parse(json);
    // Just pretty-print as JSON — valid JSON is valid JS object literal
    return { output: JSON.stringify(value, null, indent), error: null };
  } catch (e) {
    return { output: "", error: `Invalid JSON: ${e instanceof Error ? e.message : String(e)}` };
  }
}
