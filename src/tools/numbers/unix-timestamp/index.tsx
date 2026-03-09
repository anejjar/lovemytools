"use client";

import { useState, useEffect } from "react";
import { timestampToDate, dateToTimestamp, getCurrentTimestamp } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";

export default function UnixTimestampTool() {
  const [tsInput, setTsInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [now, setNow] = useState(getCurrentTimestamp());

  useEffect(() => {
    const id = setInterval(() => setNow(getCurrentTimestamp()), 1000);
    return () => clearInterval(id);
  }, []);

  const tsResult = tsInput ? timestampToDate(Number(tsInput)) : null;
  const dateResult = dateInput ? dateToTimestamp(dateInput) : null;

  return (
    <div className="max-w-2xl space-y-6">
      {/* Live clock */}
      <div
        className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 cursor-pointer"
        onClick={() => setTsInput(String(now))}
        title="Click to use current timestamp"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text3)]">Current Unix Timestamp</p>
          <p className="mt-0.5 text-2xl font-mono font-bold text-[var(--text)]">{now}</p>
          <p className="text-xs text-[var(--text3)]">Click to use this timestamp ↗</p>
        </div>
        <CopyButton text={String(now)} label="Copy" />
      </div>

      {/* Timestamp → Date */}
      <div className="rounded-xl border border-[var(--border)] p-5 space-y-4">
        <h3 className="font-medium text-[var(--text)]">Timestamp → Human Date</h3>
        <input
          type="text"
          value={tsInput}
          onChange={(e) => setTsInput(e.target.value)}
          placeholder="e.g. 1700000000 or 1700000000000"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-4 py-2.5 font-mono text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:border-[var(--primary)] focus:outline-none"
        />
        {tsResult && (
          <div className="space-y-2">
            <ResultRow label="ISO 8601" value={tsResult.iso} />
            <ResultRow label="UTC" value={tsResult.utc} />
            <ResultRow label="Local" value={tsResult.local} />
            <ResultRow label="Relative" value={tsResult.relative} />
            <div className="flex gap-4 text-xs text-[var(--text3)] pt-1">
              <span>Seconds: <code className="text-[var(--text2)]">{tsResult.timestamp}</code></span>
              <span>Milliseconds: <code className="text-[var(--text2)]">{tsResult.timestampMs}</code></span>
            </div>
          </div>
        )}
      </div>

      {/* Date → Timestamp */}
      <div className="rounded-xl border border-[var(--border)] p-5 space-y-4">
        <h3 className="font-medium text-[var(--text)]">Human Date → Timestamp</h3>
        <input
          type="datetime-local"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-4 py-2.5 text-sm text-[var(--text)] focus:border-[var(--primary)] focus:outline-none [color-scheme:dark]"
        />
        {dateResult && (
          <div className="space-y-2">
            <ResultRow label="Seconds" value={String(dateResult.seconds)} />
            <ResultRow label="Milliseconds" value={String(dateResult.ms)} />
          </div>
        )}
      </div>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[var(--bg2)] px-3 py-2">
      <div>
        <span className="text-xs text-[var(--text3)]">{label}</span>
        <p className="font-mono text-sm text-[var(--text)]">{value}</p>
      </div>
      <CopyButton text={value} label="" />
    </div>
  );
}
