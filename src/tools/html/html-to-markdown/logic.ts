export interface ConvertResult {
  output: string;
  error: string | null;
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export function htmlToMarkdown(html: string): ConvertResult {
  if (!html.trim()) return { output: "", error: null };
  try {
    let md = html;

    // Remove script and style blocks
    md = md.replace(/<script[\s\S]*?<\/script>/gi, "");
    md = md.replace(/<style[\s\S]*?<\/style>/gi, "");

    // Headings
    for (let i = 6; i >= 1; i--) {
      md = md.replace(new RegExp(`<h${i}[^>]*>([\\s\\S]*?)<\\/h${i}>`, "gi"), (_m, c) => `${"#".repeat(i)} ${c.trim()}\n\n`);
    }

    // Bold and italic
    md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**");
    md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**");
    md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "_$1_");
    md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "_$1_");

    // Code
    md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "```\n$1\n```\n\n");
    md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`");

    // Links
    md = md.replace(/<a[^>]+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");
    md = md.replace(/<a[^>]+href='([^']*)'[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");

    // Images
    md = md.replace(/<img[^>]+src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)");
    md = md.replace(/<img[^>]+alt="([^"]*)"[^>]+src="([^"]*)"[^>]*\/?>/gi, "![$1]($2)");
    md = md.replace(/<img[^>]+src="([^"]*)"[^>]*\/?>/gi, "![]($1)");

    // Blockquotes
    md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_m, c) =>
      c.trim().split("\n").map((l: string) => `> ${l}`).join("\n") + "\n\n"
    );

    // Horizontal rule
    md = md.replace(/<hr[^>]*\/?>/gi, "\n---\n\n");

    // Line breaks
    md = md.replace(/<br[^>]*\/?>/gi, "  \n");

    // Lists
    md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_m, c) => c + "\n");
    md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_m, c) => {
      let i = 0;
      return c.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_lm: string, lc: string) => `${++i}. ${lc.trim()}\n`) + "\n";
    });
    md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");

    // Paragraphs and divs
    md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n");
    md = md.replace(/<div[^>]*>([\s\S]*?)<\/div>/gi, "$1\n");

    // Strip remaining tags
    md = md.replace(/<[^>]+>/g, "");

    // Decode HTML entities
    md = decodeEntities(md);

    // Clean up excessive blank lines
    md = md.replace(/\n{3,}/g, "\n\n");

    return { output: md.trim(), error: null };
  } catch (e) {
    return { output: "", error: String(e) };
  }
}
