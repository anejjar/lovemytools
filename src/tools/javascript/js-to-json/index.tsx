"use client";

import { useState, useEffect } from "react";
import { jsToJson, jsonToJs } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";

type Mode = "js-to-json" | "json-to-js";

export default function JsToJsonTool() {
  const [mode, setMode] = useState<Mode>("js-to-json");
  const [input, setInput] = useState("");
  const [result, setResult] = useState({ output: "", error: null as string | null });
  const debounced = useDebounce(input, 300);

  useEffect(() => {
    setResult(mode === "js-to-json" ? jsToJson(debounced) : jsonToJs(debounced));
  }, [debounced, mode]);

  const inputPlaceholder =
    mode === "js-to-json"
      ? "{ name: 'Alice', age: 30, active: true, }"
      : '{"name":"Alice","age":30,"active":true}';

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["js-to-json", "json-to-js"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setInput(""); }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === m ? "bg-[var(--primary)] text-white" : "bg-[var(--surface2)] text-[var(--text2)] hover:text-[var(--text)]"}`}
          >
            {m === "js-to-json" ? "JS → JSON" : "JSON → JS"}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">{mode === "js-to-json" ? "JavaScript Object" : "JSON Input"}</label>
            <button onClick={() => setInput("")} className="text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors">Clear</button>
          </div>
          <CodeEditor value={input} onChange={setInput} placeholder={inputPlaceholder} rows={18} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">{mode === "js-to-json" ? "JSON Output" : "JS Object Output"}</label>
            {result.output && <CopyButton text={result.output} />}
          </div>
          <CodeEditor value={result.output} readOnly rows={18} placeholder="Output will appear here..." />
        </div>
      </div>
      {result.error && <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{result.error}</div>}
    </div>
  );
}
