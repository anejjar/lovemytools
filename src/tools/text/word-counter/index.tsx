"use client";

import { useState } from "react";
import { analyzeText, formatReadingTime, getTopWords } from "./logic";
import { useDebounce } from "@/hooks/use-debounce";

export default function WordCounterTool() {
  const [text, setText] = useState("");
  const debounced = useDebounce(text, 200);
  const stats = analyzeText(debounced);
  const topWords = debounced.trim() ? getTopWords(debounced, 8) : [];

  const statCards = [
    { label: "Words", value: stats.words.toLocaleString() },
    { label: "Characters", value: stats.characters.toLocaleString() },
    { label: "No Spaces", value: stats.charactersNoSpaces.toLocaleString() },
    { label: "Lines", value: stats.lines.toLocaleString() },
    { label: "Sentences", value: stats.sentences.toLocaleString() },
    { label: "Paragraphs", value: stats.paragraphs.toLocaleString() },
    { label: "Reading Time", value: formatReadingTime(stats.readingTimeMinutes) },
    { label: "Speaking Time", value: formatReadingTime(stats.speakingTimeMinutes) },
    { label: "Unique Words", value: stats.uniqueWords.toLocaleString() },
    { label: "Avg Word Len", value: stats.avgWordLength ? `${stats.avgWordLength} ch` : "—" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-[var(--text2)]">Your text</label>
          {text && (
            <button onClick={() => setText("")} className="text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors">Clear</button>
          )}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          rows={12}
          className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--primary)] transition-colors leading-relaxed"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-center">
            <div className="text-lg font-bold text-[var(--text)]">{s.value}</div>
            <div className="text-xs text-[var(--text3)] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {topWords.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--text2)]">Top words</p>
          <div className="flex flex-wrap gap-2">
            {topWords.map(({ word, count }) => (
              <span key={word} className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs">
                <span className="text-[var(--text)]">{word}</span>
                <span className="text-[var(--text3)]">×{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
