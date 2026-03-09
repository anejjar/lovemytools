"use client";

import { useState, useCallback } from "react";
import { generatePassword, generatePasswords, calculateEntropy, getStrengthLabel } from "./logic";
import type { PasswordOptions } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { RefreshCw } from "lucide-react";

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
};

export default function PasswordGeneratorTool() {
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [password, setPassword] = useState(() => generatePassword(DEFAULT_OPTIONS));
  const [bulkCount, setBulkCount] = useState(5);
  const [bulk, setBulk] = useState<string[]>([]);

  const generate = useCallback(() => {
    setPassword(generatePassword(options));
    setBulk([]);
  }, [options]);

  const generateBulk = useCallback(() => {
    setBulk(generatePasswords(options, bulkCount));
  }, [options, bulkCount]);

  const entropy = calculateEntropy(options);
  const strength = getStrengthLabel(entropy);

  const toggle = (key: keyof PasswordOptions) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Generated password */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="flex items-center justify-between gap-3">
          <code className="flex-1 overflow-x-auto text-lg font-mono text-[var(--text)] select-all">
            {password}
          </code>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={generate}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text2)] hover:text-[var(--text)] transition-colors"
              title="Regenerate"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
            <CopyButton text={password} />
          </div>
        </div>

        {/* Strength bar */}
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-xs">
            <span style={{ color: strength.color }}>{strength.label}</span>
            <span className="text-[var(--text3)]">{entropy} bits entropy</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(100, (entropy / 128) * 100)}%`,
                background: strength.color,
              }}
            />
          </div>
        </div>
      </div>

      {/* Length slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <label className="font-medium text-[var(--text2)]">Length</label>
          <span className="font-mono text-[var(--text)]">{options.length}</span>
        </div>
        <input
          type="range"
          min={4}
          max={128}
          value={options.length}
          onChange={(e) => setOptions((p) => ({ ...p, length: Number(e.target.value) }))}
          className="w-full accent-[#6366f1]"
        />
      </div>

      {/* Character options */}
      <div className="grid grid-cols-2 gap-3">
        {(["uppercase", "lowercase", "numbers", "symbols"] as const).map((key) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition-colors"
            style={{
              borderColor: options[key] ? "var(--primary)" : "var(--border)",
              background: options[key] ? "var(--primary-dim)" : "var(--surface)",
            }}
          >
            <input
              type="checkbox"
              checked={options[key] as boolean}
              onChange={() => toggle(key)}
              className="accent-[#6366f1]"
            />
            <span className="text-sm capitalize text-[var(--text)]">{key}</span>
          </label>
        ))}
      </div>

      {/* Generate button */}
      <button
        onClick={generate}
        className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-colors"
        style={{ background: "var(--primary)" }}
      >
        Generate Password
      </button>

      {/* Bulk generation */}
      <div className="space-y-3 rounded-xl border border-[var(--border)] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--text)]">Bulk Generation</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={50}
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
            {bulk.length > 0 && <CopyButton text={bulk.join("\n")} label="Copy All" />}
          </div>
        </div>
        {bulk.length > 0 && (
          <div className="max-h-48 overflow-y-auto space-y-1">
            {bulk.map((pw, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg px-3 py-1.5"
                style={{ background: "var(--bg2)" }}
              >
                <code className="text-sm font-mono text-[var(--text)]">{pw}</code>
                <CopyButton text={pw} label="" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
