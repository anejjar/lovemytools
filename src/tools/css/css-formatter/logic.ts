import { css_beautify } from "js-beautify";

export interface FormatResult {
  output: string;
  error: string | null;
}

export function formatCss(input: string, indent: number | "tab" = 2): FormatResult {
  if (!input.trim()) return { output: "", error: null };
  try {
    const output = css_beautify(input, {
      indent_size: indent === "tab" ? 1 : indent,
      indent_char: indent === "tab" ? "\t" : " ",
      newline_between_rules: true,
      preserve_newlines: false,
      end_with_newline: true,
    });
    return { output, error: null };
  } catch (e) {
    return { output: "", error: (e as Error).message };
  }
}
