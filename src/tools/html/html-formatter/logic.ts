import { html_beautify } from "js-beautify";

export type IndentStyle = 2 | 4 | "tab";

export interface FormatResult {
  output: string;
  error: string | null;
}

export function formatHtml(code: string, indent: IndentStyle = 2): FormatResult {
  if (!code.trim()) return { output: "", error: null };
  try {
    const indentChar = indent === "tab" ? "\t" : " ".repeat(indent);
    const output = html_beautify(code, {
      indent_char: indentChar,
      indent_size: 1,
      end_with_newline: true,
      wrap_line_length: 0,
      extra_liners: [],
      unformatted: ["pre", "textarea", "script", "style"],
    });
    return { output, error: null };
  } catch (e) {
    return { output: "", error: String(e) };
  }
}
