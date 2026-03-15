"use client";

import { useState, useMemo } from "react";
import { testRegex, highlightMatches } from "./logic";
import { useDebounce } from "@/hooks/use-debounce";

const FLAG_OPTIONS = [
  { flag: "g", label: "g", title: "Global — find all matches" },
  { flag: "i", label: "i", title: "Case insensitive" },
  { flag: "m", label: "m", title: "Multiline — ^ and $ match line boundaries" },
  { flag: "s", label: "s", title: "Dot all — . matches newlines" },
  { flag: "u", label: "u", title: "Unicode mode" },
];

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const dPattern = useDebounce(pattern, 300);
  const dText = useDebounce(text, 300);

  const result = useMemo(() => testRegex(dPattern, flags, dText), [dPattern, flags, dText]);
  const highlighted = useMemo(() => highlightMatches(dText, result.matches), [dText, result.matches]);

  function toggleFlag(f: string) {
    setFlags((prev) => prev.includes(f) ? prev.replace(f, "") : prev + f);
  }

  return (
    <div className="space-y-4">
      {/* Pattern input */}
      <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
        <span className="text-[var(--text3)] font-mono text-lg select-none">/</span>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="Enter regex pattern..."
          className="flex-1 bg-transparent font-mono text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none"
        />
        <span className="text-[var(--text3)] font-mono text-lg select-none">/</span>
        <span className="font-mono text-sm text-[var(--primary)]">{flags}</span>
      </div>

      {/* Flags */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-[var(--text2)]">Flags:</span>
        {FLAG_OPTIONS.map(({ flag, label, title }) => (
          <button key={flag} title={title} onClick={() => toggleFlag(flag)}
            className="rounded-lg border px-2.5 py-1 font-mono text-xs transition-all"
            style={{ borderColor: flags.includes(flag) ? "var(--primary)" : "var(--border)", background: flags.includes(flag) ? "var(--primary-dim,#e0e7ff)" : "var(--surface)", color: flags.includes(flag) ? "var(--primary)" : "var(--text2)" }}>
            {label}
          </button>
        ))}
        {result.error && (
          <span className="ml-auto text-xs text-[var(--red,#ef4444)]">{result.error}</span>
        )}
        {!result.error && pattern && (
          <span className="ml-auto text-xs" style={{ color: result.matchCount > 0 ? "var(--green,#22c55e)" : "var(--text3)" }}>
            {result.matchCount} match{result.matchCount !== 1 ? "es" : ""}
          </span>
        )}
      </div>

      {/* Test text */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text2)]">Test text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your test text here..."
          rows={6}
          className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--primary)] transition-colors"
        />
      </div>

      {/* Highlighted output */}
      {text && !result.error && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Match preview</label>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
            {highlighted.map((part, i) =>
              part.isMatch ? (
                <mark key={i} className="rounded px-0.5" style={{ background: "rgba(99,102,241,0.2)", color: "var(--primary)", outline: "1px solid var(--primary)" }}>
                  {part.text}
                </mark>
              ) : (
                <span key={i} className="text-[var(--text2)]">{part.text}</span>
              )
            )}
          </div>
        </div>
      )}

      {/* Match list */}
      {result.matches.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Matches ({result.matchCount})</label>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {result.matches.map((m, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs">
                <span className="text-[var(--text3)] shrink-0">#{i + 1}</span>
                <span className="font-mono text-[var(--primary)] break-all">{m.value || "(empty)"}</span>
                <span className="text-[var(--text3)] shrink-0 ml-auto">index {m.index}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
