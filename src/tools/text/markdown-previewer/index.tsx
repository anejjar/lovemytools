"use client";

import { useState, useMemo } from "react";
import { renderMarkdown } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { useDebounce } from "@/hooks/use-debounce";

const SAMPLE = `# Markdown Previewer

Write **bold**, _italic_, or \`inline code\`.

## Features
- Live preview
- GitHub Flavored Markdown
- Tables & code blocks

## Example Table
| Name  | Role     |
|-------|----------|
| Alice | Dev      |
| Bob   | Designer |

\`\`\`js
console.log("Hello, world!");
\`\`\`

[Visit example](https://example.com)
`;

type View = "preview" | "html";

export default function MarkdownPreviewerTool() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [view, setView] = useState<View>("preview");

  const debounced = useDebounce(markdown, 300);
  const { html } = useMemo(() => renderMarkdown(debounced), [debounced]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
          {(["preview", "html"] as View[]).map((v) => (
            <button key={v} onClick={() => setView(v)}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-all capitalize"
              style={{ background: view === v ? "var(--primary)" : "transparent", color: view === v ? "white" : "var(--text2)" }}>
              {v === "preview" ? "Preview" : "HTML"}
            </button>
          ))}
        </div>
        {view === "html" && html && <CopyButton text={html} className="ml-auto" />}
        <button onClick={() => setMarkdown("")} className="ml-auto text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors">Clear</button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2" style={{ minHeight: 480 }}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Markdown</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="# Hello World&#10;&#10;Write your **markdown** here..."
            className="h-full min-h-[420px] w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">{view === "preview" ? "Preview" : "HTML Output"}</label>
          {view === "preview" ? (
            <div
              className="prose prose-sm h-full min-h-[420px] max-w-none overflow-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--text)]"
              dangerouslySetInnerHTML={{ __html: html }}
              style={{ "--tw-prose-body": "var(--text2)", "--tw-prose-headings": "var(--text)" } as React.CSSProperties}
            />
          ) : (
            <textarea readOnly value={html}
              className="h-full min-h-[420px] w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-xs text-[var(--text2)] focus:outline-none" />
          )}
        </div>
      </div>
    </div>
  );
}
