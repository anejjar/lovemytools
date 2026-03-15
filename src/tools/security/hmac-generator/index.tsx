"use client";

import { useState } from "react";
import { generateHmac, HMAC_ALGORITHMS, type HmacAlgorithm } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { useDebounce } from "@/hooks/use-debounce";

export default function HmacGeneratorTool() {
  const [message, setMessage] = useState("");
  const [secret, setSecret] = useState("");
  const [algorithm, setAlgorithm] = useState<HmacAlgorithm>("SHA256");

  const dMessage = useDebounce(message, 200);
  const dSecret = useDebounce(secret, 200);
  const result = generateHmac(dMessage, dSecret, algorithm);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter message to sign..." rows={6}
            className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--primary)] transition-colors" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text2)]">Secret Key</label>
          <textarea value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="Enter your secret key..." rows={6}
            className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--primary)] transition-colors" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {HMAC_ALGORITHMS.map((alg) => (
          <button key={alg} onClick={() => setAlgorithm(alg)}
            className="rounded-lg border px-3 py-1.5 text-sm font-mono font-medium transition-all"
            style={{ borderColor: algorithm === alg ? "var(--primary)" : "var(--border)", background: algorithm === alg ? "var(--primary-dim,#e0e7ff)" : "var(--surface)", color: algorithm === alg ? "var(--primary)" : "var(--text2)" }}>
            HMAC-{alg}
          </button>
        ))}
      </div>

      {result.hash ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">HMAC-{algorithm} Signature</label>
            <CopyButton text={result.hash} />
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm text-[var(--text)] break-all">{result.hash}</div>
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center text-sm text-[var(--text3)]">
          Enter both a message and secret key to generate an HMAC
        </div>
      )}
    </div>
  );
}
