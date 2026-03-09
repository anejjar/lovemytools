"use client";

import { useState, useCallback } from "react";
import { generateUUID, generateUUIDs } from "./logic";
import type { UUIDVersion } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { RefreshCw } from "lucide-react";

export default function UUIDGeneratorTool() {
  const [version, setVersion] = useState<UUIDVersion>("v4");
  const [uppercase, setUppercase] = useState(false);
  const [uuid, setUuid] = useState(() => generateUUID("v4"));
  const [bulkCount, setBulkCount] = useState(5);
  const [bulk, setBulk] = useState<string[]>([]);

  const fmt = (s: string) => (uppercase ? s.toUpperCase() : s);

  const generate = useCallback(() => {
    setUuid(generateUUID(version));
    setBulk([]);
  }, [version]);

  const generateBulk = useCallback(() => {
    setBulk(generateUUIDs(version, bulkCount));
  }, [version, bulkCount]);

  return (
    <div className="max-w-2xl space-y-6">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--text3)] uppercase tracking-wider">Version</label>
          <div className="flex overflow-hidden rounded-lg border border-[var(--border)]">
            {(["v4", "v7"] as UUIDVersion[]).map((v) => (
              <button
                key={v}
                onClick={() => setVersion(v)}
                className="px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  background: version === v ? "var(--primary)" : "var(--surface)",
                  color: version === v ? "white" : "var(--text2)",
                }}
              >
                UUID {v}
              </button>
            ))}
          </div>
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 self-end">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="accent-[#6366f1]"
          />
          <span className="text-sm text-[var(--text2)]">Uppercase</span>
        </label>
      </div>

      {/* Single UUID */}
      <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4">
        <code className="flex-1 overflow-x-auto text-base font-mono text-[var(--text)] select-all">
          {fmt(uuid)}
        </code>
        <button
          onClick={generate}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text2)] hover:text-[var(--text)] transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
        <CopyButton text={fmt(uuid)} />
      </div>

      <button
        onClick={generate}
        className="w-full rounded-xl py-3 text-sm font-semibold text-white"
        style={{ background: "var(--primary)" }}
      >
        Generate UUID
      </button>

      {/* Bulk */}
      <div className="space-y-3 rounded-xl border border-[var(--border)] p-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[var(--text)]">Bulk</span>
          <input
            type="number"
            min={1}
            max={100}
            value={bulkCount}
            onChange={(e) => setBulkCount(Number(e.target.value))}
            className="w-16 rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-2 py-1 text-center text-sm text-[var(--text)]"
          />
          <button
            onClick={generateBulk}
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text2)] hover:text-[var(--text)] transition-colors"
          >
            Generate
          </button>
          {bulk.length > 0 && <CopyButton text={bulk.map(fmt).join("\n")} label="Copy All" />}
        </div>
        {bulk.length > 0 && (
          <div className="max-h-48 overflow-y-auto space-y-1">
            {bulk.map((id, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg px-3 py-1.5"
                style={{ background: "var(--bg2)" }}
              >
                <code className="text-sm font-mono text-[var(--text)]">{fmt(id)}</code>
                <CopyButton text={fmt(id)} label="" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
