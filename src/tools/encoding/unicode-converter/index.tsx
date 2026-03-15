"use client";

import { useState, useEffect } from "react";
import { textToUnicode, unicodeToText } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";

type Mode = "to-unicode" | "from-unicode";
type Format = "U+" | "\\u" | "&#x";

const FORMATS: Format[] = ["U+", "\\u", "&#x"];

export default function UnicodeConverterTool() {
  const [mode, setMode] = useState<Mode>("to-unicode");
  const [input, setInput] = useState("");
  const [format, setFormat] = useState<Format>("U+");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const debounced = useDebounce(input, 200);

  useEffect(() => {
    if (!debounced) { setOutput(""); setError(null); return; }
    const r = mode === "to-unicode" ? textToUnicode(debounced, format) : unicodeToText(debounced);
    setOutput(r.output);
    setError(r.error);
  }, [debounced, mode, format]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
          {(["to-unicode", "from-unicode"] as Mode[]).map((m) => (
            <button key={m} onClick={() => { setMode(m); setInput(""); setOutput(""); setError(null); }}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-all"
              style={{ background: mode === m ? "var(--primary)" : "transparent", color: mode === m ? "white" : "var(--text2)" }}>
              {m === "to-unicode" ? "Text → Unicode" : "Unicode → Text"}
            </button>
          ))}
        </div>
        {mode === "to-unicode" && (
          <div className="flex gap-1">
            {FORMATS.map((f) => (
              <button key={f} onClick={() => setFormat(f)}
                className="rounded-lg border px-3 py-1 text-xs font-mono font-medium transition-all"
                style={{ borderColor: format === f ? "var(--primary)" : "var(--border)", background: format === f ? "var(--primary-dim,#e0e7ff)" : "var(--surface)", color: format === f ? "var(--primary)" : "var(--text2)" }}>
                {f}
              </button>
            ))}
          </div>
        )}
        <button onClick={() => { setInput(""); setOutput(""); }} className="ml-auto text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors">Clear</button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Input</label>
          <CodeEditor value={input} onChange={setInput}
            placeholder={mode === "to-unicode" ? "Hello 世界 😀" : "U+0048 U+0065 U+006C U+006C U+006F"}
            rows={10} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <CodeEditor value={output} readOnly rows={10} placeholder="Output appears here..." />
        </div>
      </div>
      {error && <div className="rounded-lg bg-[var(--red-dim,#fee2e2)] px-4 py-2 text-sm text-[var(--red,#ef4444)]">{error}</div>}
    </div>
  );
}
