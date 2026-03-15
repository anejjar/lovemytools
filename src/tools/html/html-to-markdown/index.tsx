"use client";

import { useState, useEffect } from "react";
import { htmlToMarkdown } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";

export default function HtmlToMarkdownTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState({ output: "", error: null as string | null });
  const debounced = useDebounce(input, 300);

  useEffect(() => { setResult(htmlToMarkdown(debounced)); }, [debounced]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">HTML Input</label>
            <button onClick={() => setInput("")} className="text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors">Clear</button>
          </div>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder={"<h1>Title</h1>\n<p>Hello <strong>world</strong>!</p>\n<ul><li>Item 1</li><li>Item 2</li></ul>"}
            rows={20}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Markdown Output</label>
            {result.output && <CopyButton text={result.output} />}
          </div>
          <CodeEditor value={result.output} readOnly rows={20} placeholder="Markdown will appear here..." />
        </div>
      </div>
      {result.error && <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{result.error}</div>}
    </div>
  );
}
