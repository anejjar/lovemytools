"use client";

import { useState, useCallback } from "react";
import { formatJson, minifyJson, validateJson } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";
import { AlertCircle, CheckCircle2, Minimize2, AlignLeft } from "lucide-react";

const INDENT_OPTIONS = [
  { label: "2 spaces", value: 2 },
  { label: "4 spaces", value: 4 },
  { label: "Tab", value: "\t" as const },
];

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState<2 | 4 | "\t">(2);

  const debouncedInput = useDebounce(input, 400);

  const validation = validateJson(debouncedInput);

  const handleFormat = useCallback(() => {
    const result = formatJson(input, indent);
    setOutput(result.output);
    setError(result.error);
  }, [input, indent]);

  const handleMinify = useCallback(() => {
    const result = minifyJson(input);
    setOutput(result.output);
    setError(result.error);
  }, [input]);

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleFormat}
          className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
          style={{ background: "var(--primary)" }}
        >
          <AlignLeft className="h-4 w-4" />
          Format
        </button>
        <button
          onClick={handleMinify}
          className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text2)] transition-colors hover:text-[var(--text)]"
        >
          <Minimize2 className="h-4 w-4" />
          Minify
        </button>
        <select
          value={String(indent)}
          onChange={(e) =>
            setIndent(e.target.value === "\t" ? "\t" : (Number(e.target.value) as 2 | 4))
          }
          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text2)]"
        >
          {INDENT_OPTIONS.map((opt) => (
            <option key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          onClick={handleClear}
          className="ml-auto rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[var(--text3)] hover:text-[var(--text2)] transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Validation badge */}
      {input.trim() && (
        <div
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm"
          style={{
            background: validation.valid ? "var(--green-dim)" : "var(--red-dim)",
            color: validation.valid ? "var(--green)" : "var(--red)",
          }}
        >
          {validation.valid ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          {validation.valid ? "Valid JSON" : validation.error}
        </div>
      )}

      {/* Editors */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Input JSON</label>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder='Paste your JSON here...\n{\n  "example": "value"\n}'
            rows={18}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <CodeEditor value={output} readOnly rows={18} placeholder="Formatted JSON will appear here..." />
        </div>
      </div>
    </div>
  );
}
