export interface FormatResult {
  output: string;
  error: string | null;
  errorLine: number | null;
}

export function formatJson(
  input: string,
  indent: number | "\t" = 2
): FormatResult {
  if (!input.trim()) return { output: "", error: null, errorLine: null };

  try {
    const parsed = JSON.parse(input);
    const output = JSON.stringify(
      parsed,
      null,
      indent === "\t" ? "\t" : indent
    );
    return { output, error: null, errorLine: null };
  } catch (e) {
    const error = e as SyntaxError;
    const match = error.message.match(/position (\d+)/);
    let errorLine: number | null = null;

    if (match) {
      const position = parseInt(match[1]);
      errorLine = input.slice(0, position).split("\n").length;
    }

    return { output: "", error: error.message, errorLine };
  }
}

export function minifyJson(input: string): FormatResult {
  if (!input.trim()) return { output: "", error: null, errorLine: null };

  try {
    const parsed = JSON.parse(input);
    return { output: JSON.stringify(parsed), error: null, errorLine: null };
  } catch (e) {
    const error = e as SyntaxError;
    return { output: "", error: error.message, errorLine: null };
  }
}

export function validateJson(input: string): { valid: boolean; error: string | null } {
  if (!input.trim()) return { valid: true, error: null };
  try {
    JSON.parse(input);
    return { valid: true, error: null };
  } catch (e) {
    return { valid: false, error: (e as SyntaxError).message };
  }
}
