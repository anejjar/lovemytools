"use client";

import { useState, useEffect } from "react";
import { encodeUrl, decodeUrl } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";

type Mode = "encode" | "decode";

export default function UrlEncoderTool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [encodeAll, setEncodeAll] = useState(true);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const debounced = useDebounce(input, 200);

  useEffect(() => {
    if (!debounced.trim()) { setOutput(""); setError(null); return; }
    const r = mode === "encode" ? encodeUrl(debounced, encodeAll) : decodeUrl(debounced);
    setOutput(r.output);
    setError(r.error);
  }, [debounced, mode, encodeAll]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
          {(["encode", "decode"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setInput(""); setOutput(""); setError(null); }}
              className="rounded-lg px-4 py-1.5 text-sm font-medium transition-all capitalize"
              style={{
                background: mode === m ? "var(--primary)" : "transparent",
                color: mode === m ? "white" : "var(--text2)",
              }}
            >
              {m}
            </button>
          ))}
        </div>
        {mode === "encode" && (
          <label className="flex items-center gap-2 text-sm text-[var(--text2)] cursor-pointer">
            <input
              type="checkbox"
              checked={encodeAll}
              onChange={(e) => setEncodeAll(e.target.checked)}
              className="rounded"
            />
            Encode all characters (component mode)
          </label>
        )}
        <button
          onClick={() => { setInput(""); setOutput(""); setError(null); }}
          className="ml-auto text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Input</label>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder={mode === "encode" ? "https://example.com/search?q=hello world&lang=en" : "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"}
            rows={10}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <CodeEditor value={output} readOnly rows={10} placeholder="Output appears here..." />
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-[var(--red-dim,#fee2e2)] px-4 py-2 text-sm text-[var(--red,#ef4444)]">{error}</div>
      )}
    </div>
  );
}
