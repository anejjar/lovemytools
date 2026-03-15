"use client";

import { useState, useEffect } from "react";
import { jsonToYaml, yamlToJson } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";

type Mode = "json-to-yaml" | "yaml-to-json";

export default function JsonToYamlTool() {
  const [mode, setMode] = useState<Mode>("json-to-yaml");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const debounced = useDebounce(input, 300);

  useEffect(() => {
    if (!debounced.trim()) { setOutput(""); setError(null); return; }
    const r = mode === "json-to-yaml" ? jsonToYaml(debounced) : yamlToJson(debounced);
    setOutput(r.output);
    setError(r.error);
  }, [debounced, mode]);

  return (
    <div className="space-y-4">
      <div className="flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
        {(["json-to-yaml", "yaml-to-json"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setInput(""); setOutput(""); setError(null); }}
            className="flex-1 rounded-lg py-1.5 text-sm font-medium transition-all"
            style={{
              background: mode === m ? "var(--primary)" : "transparent",
              color: mode === m ? "white" : "var(--text2)",
            }}
          >
            {m === "json-to-yaml" ? "JSON → YAML" : "YAML → JSON"}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">
              {mode === "json-to-yaml" ? "Input JSON" : "Input YAML"}
            </label>
            <button
              onClick={() => { setInput(""); setOutput(""); setError(null); }}
              className="text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors"
            >
              Clear
            </button>
          </div>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder={mode === "json-to-yaml"
              ? '{\n  "name": "Alice",\n  "skills": ["js", "python"]\n}'
              : "name: Alice\nskills:\n  - js\n  - python"}
            rows={18}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">
              {mode === "json-to-yaml" ? "Output YAML" : "Output JSON"}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <CodeEditor value={output} readOnly rows={18} placeholder="Output appears here..." />
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-[var(--red-dim,#fee2e2)] px-4 py-2 text-sm text-[var(--red,#ef4444)]">
          {error}
        </div>
      )}
    </div>
  );
}
