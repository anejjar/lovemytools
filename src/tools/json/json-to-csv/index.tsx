"use client";

import { useState, useEffect } from "react";
import { jsonToCsv, csvToJson } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { useDebounce } from "@/hooks/use-debounce";

type Mode = "json-to-csv" | "csv-to-json";
type Delimiter = "," | ";" | "\t";

const DELIMITERS: { label: string; value: Delimiter }[] = [
  { label: "Comma (,)", value: "," },
  { label: "Semicolon (;)", value: ";" },
  { label: "Tab", value: "\t" },
];

export default function JsonToCsvTool() {
  const [mode, setMode] = useState<Mode>("json-to-csv");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [delimiter, setDelimiter] = useState<Delimiter>(",");
  const [stats, setStats] = useState<{ rowCount: number; columnCount: number } | null>(null);

  const debounced = useDebounce(input, 300);

  useEffect(() => {
    if (!debounced.trim()) { setOutput(""); setError(null); setStats(null); return; }
    const fn = mode === "json-to-csv" ? jsonToCsv : csvToJson;
    const r = fn(debounced, delimiter);
    setOutput(r.output);
    setError(r.error);
    setStats(r.error ? null : { rowCount: r.rowCount, columnCount: r.columnCount });
  }, [debounced, mode, delimiter]);

  const placeholder = mode === "json-to-csv"
    ? '[{"name":"Alice","age":30},{"name":"Bob","age":25}]'
    : "name,age\nAlice,30\nBob,25";

  return (
    <div className="space-y-4">
      {/* Mode tabs */}
      <div className="flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
        {(["json-to-csv", "csv-to-json"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setInput(""); setOutput(""); setError(null); setStats(null); }}
            className="flex-1 rounded-lg py-1.5 text-sm font-medium transition-all"
            style={{
              background: mode === m ? "var(--primary)" : "transparent",
              color: mode === m ? "white" : "var(--text2)",
            }}
          >
            {m === "json-to-csv" ? "JSON → CSV" : "CSV → JSON"}
          </button>
        ))}
      </div>

      {/* Delimiter selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-[var(--text2)]">Delimiter:</span>
        <div className="flex gap-1">
          {DELIMITERS.map((d) => (
            <button
              key={d.value}
              onClick={() => setDelimiter(d.value)}
              className="rounded-lg border px-3 py-1 text-xs font-medium transition-all"
              style={{
                borderColor: delimiter === d.value ? "var(--primary)" : "var(--border)",
                background: delimiter === d.value ? "var(--primary-dim,#e0e7ff)" : "var(--surface)",
                color: delimiter === d.value ? "var(--primary)" : "var(--text2)",
              }}
            >
              {d.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => { setInput(""); setOutput(""); setError(null); setStats(null); }}
          className="ml-auto text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">
            {mode === "json-to-csv" ? "Input JSON" : "Input CSV"}
          </label>
          <CodeEditor value={input} onChange={setInput} placeholder={placeholder} rows={16} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">
              {mode === "json-to-csv" ? "Output CSV" : "Output JSON"}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <CodeEditor value={output} readOnly rows={16} placeholder="Output appears here..." />
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-[var(--red-dim,#fee2e2)] px-4 py-2 text-sm text-[var(--red,#ef4444)]">{error}</div>
      )}

      {stats && !error && (
        <div className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm">
          <span className="text-[var(--text3)]">Rows: <strong className="text-[var(--text)]">{stats.rowCount}</strong></span>
          <span className="text-[var(--text3)]">Columns: <strong className="text-[var(--text)]">{stats.columnCount}</strong></span>
        </div>
      )}
    </div>
  );
}
