"use client";

import { useState, useCallback } from "react";
import { hashBcrypt, verifyBcrypt, ROUND_OPTIONS, type BcryptRounds } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";

type Mode = "hash" | "verify";

export default function BcryptGeneratorTool() {
  const [mode, setMode] = useState<Mode>("hash");
  const [password, setPassword] = useState("");
  const [rounds, setRounds] = useState<BcryptRounds>(10);
  const [hashInput, setHashInput] = useState("");
  const [result, setResult] = useState<{ hash?: string; match?: boolean; error?: string | null } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleHash = useCallback(() => {
    if (!password) return;
    setLoading(true);
    setTimeout(() => {
      const r = hashBcrypt(password, rounds);
      setResult({ hash: r.hash, error: r.error });
      setLoading(false);
    }, 10);
  }, [password, rounds]);

  const handleVerify = useCallback(() => {
    if (!password || !hashInput) return;
    setLoading(true);
    setTimeout(() => {
      const r = verifyBcrypt(password, hashInput);
      setResult({ match: r.match, error: r.error });
      setLoading(false);
    }, 10);
  }, [password, hashInput]);

  return (
    <div className="space-y-4">
      <div className="flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
        {(["hash", "verify"] as Mode[]).map((m) => (
          <button key={m} onClick={() => { setMode(m); setResult(null); }}
            className="flex-1 rounded-lg py-1.5 text-sm font-medium transition-all capitalize"
            style={{ background: mode === m ? "var(--primary)" : "transparent", color: mode === m ? "white" : "var(--text2)" }}>
            {m === "hash" ? "Hash Password" : "Verify Password"}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text2)]">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password..."
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--primary)] transition-colors" />
      </div>

      {mode === "hash" && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--text2)]">Cost rounds:</span>
          {ROUND_OPTIONS.map((r) => (
            <button key={r} onClick={() => setRounds(r)}
              className="rounded-lg border px-3 py-1 text-sm font-mono transition-all"
              style={{ borderColor: rounds === r ? "var(--primary)" : "var(--border)", background: rounds === r ? "var(--primary-dim,#e0e7ff)" : "var(--surface)", color: rounds === r ? "var(--primary)" : "var(--text2)" }}>
              {r}
            </button>
          ))}
          <span className="text-xs text-[var(--text3)]">Higher = slower but more secure</span>
        </div>
      )}

      {mode === "verify" && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Bcrypt Hash to verify against</label>
          <input type="text" value={hashInput} onChange={(e) => setHashInput(e.target.value)} placeholder="$2b$10$..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-mono text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--primary)] transition-colors" />
        </div>
      )}

      <button onClick={mode === "hash" ? handleHash : handleVerify} disabled={loading || !password || (mode === "verify" && !hashInput)}
        className="rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-opacity disabled:opacity-50"
        style={{ background: "var(--primary)" }}>
        {loading ? (mode === "hash" ? "Hashing…" : "Verifying…") : (mode === "hash" ? "Generate Hash" : "Verify Password")}
      </button>

      {result && (
        <div className="rounded-xl border p-4 space-y-2"
          style={{ borderColor: result.error ? "var(--red,#ef4444)" : result.match !== undefined ? (result.match ? "var(--green,#22c55e)" : "var(--red,#ef4444)") : "var(--border)" }}>
          {result.error ? (
            <p className="text-sm text-[var(--red,#ef4444)]">{result.error}</p>
          ) : result.hash ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--text2)]">Bcrypt Hash</span>
                <CopyButton text={result.hash} />
              </div>
              <p className="font-mono text-xs text-[var(--text)] break-all">{result.hash}</p>
            </>
          ) : (
            <p className="font-semibold" style={{ color: result.match ? "var(--green,#22c55e)" : "var(--red,#ef4444)" }}>
              {result.match ? "✓ Password matches the hash" : "✗ Password does not match"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
