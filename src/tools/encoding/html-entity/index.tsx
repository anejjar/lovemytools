"use client";

import { useState, useEffect } from "react";
import { encodeHtmlEntities, decodeHtmlEntities } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";

type Mode = "encode" | "decode";

export default function HtmlEntityTool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const debounced = useDebounce(input, 200);

  useEffect(() => {
    if (!debounced) { setOutput(""); return; }
    const r = mode === "encode" ? encodeHtmlEntities(debounced) : decodeHtmlEntities(debounced);
    setOutput(r.output);
  }, [debounced, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
          {(["encode", "decode"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setInput(""); setOutput(""); }}
              className="rounded-lg px-4 py-1.5 text-sm font-medium transition-all capitalize"
              style={{ background: mode === m ? "var(--primary)" : "transparent", color: mode === m ? "white" : "var(--text2)" }}
            >
              {m}
            </button>
          ))}
        </div>
        <button onClick={() => { setInput(""); setOutput(""); }} className="ml-auto text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors">Clear</button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Input</label>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder={mode === "encode" ? '<div class="hello">Hello & "world" © 2025</div>' : "&lt;div&gt;Hello &amp; &quot;world&quot; &copy; 2025&lt;/div&gt;"}
            rows={12}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <CodeEditor value={output} readOnly rows={12} placeholder="Output appears here..." />
        </div>
      </div>
    </div>
  );
}
