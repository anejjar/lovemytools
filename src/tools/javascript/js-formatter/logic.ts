import { js_beautify } from "js-beautify";

export type IndentStyle = 2 | 4 | "tab";

export interface FormatResult {
  output: string;
  error: string | null;
}

export function formatJs(code: string, indent: IndentStyle = 2): FormatResult {
  if (!code.trim()) return { output: "", error: null };
  try {
    const indentChar = indent === "tab" ? "\t" : " ".repeat(indent);
    const output = js_beautify(code, {
      indent_char: indentChar,
      indent_size: 1,
      brace_style: "collapse",
      end_with_newline: true,
      space_before_conditional: true,
      unescape_strings: false,
    });
    return { output, error: null };
  } catch (e) {
    return { output: "", error: String(e) };
  }
}
