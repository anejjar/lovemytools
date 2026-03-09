"use client";

import { useState } from "react";
import { decodeJwt } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { AlertTriangle, CheckCircle2, XCircle, Clock } from "lucide-react";

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtDecoderTool() {
  const [token, setToken] = useState("");

  const { parts, status, error } = token.trim()
    ? decodeJwt(token)
    : { parts: null, status: null, error: null };

  return (
    <div className="max-w-2xl space-y-4">
      {/* Security warning */}
      <div
        className="flex items-start gap-2 rounded-xl px-4 py-3 text-sm"
        style={{ background: "var(--amber-dim)", color: "var(--amber)" }}
      >
        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
        ⚠️ Decoded client-side only. Never paste production secrets or sensitive tokens into any online tool.
      </div>

      {/* Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-[var(--text2)]">JWT Token</label>
          <button
            onClick={() => setToken(SAMPLE_JWT)}
            className="text-xs text-[var(--primary)] hover:underline"
          >
            Try sample JWT
          </button>
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT here..."
          rows={4}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm text-[var(--text)] placeholder:text-[var(--text3)] resize-none focus:border-[var(--primary)] focus:outline-none"
        />
      </div>

      {error && (
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm"
          style={{ background: "var(--red-dim)", color: "var(--red)" }}
        >
          <XCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {parts && status && (
        <div className="space-y-4">
          {/* Status badge */}
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium"
            style={
              status.expired
                ? { background: "var(--red-dim)", color: "var(--red)" }
                : { background: "var(--green-dim)", color: "var(--green)" }
            }
          >
            {status.expired ? (
              <XCircle className="h-4 w-4 shrink-0" />
            ) : (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            )}
            {status.expired
              ? `Token expired on ${status.expiresAt?.toLocaleString()}`
              : status.expiresAt
              ? `Valid · Expires in ${status.expiresIn} (${status.expiresAt.toLocaleString()})`
              : "No expiration set"}
          </div>

          {/* Header */}
          <JwtSection
            title="Header"
            color="#06b6d4"
            data={parts.header}
            extra={
              <span className="text-xs text-[var(--text3)]">
                alg: {String(parts.header.alg)} · typ: {String(parts.header.typ)}
              </span>
            }
          />

          {/* Payload */}
          <JwtSection
            title="Payload"
            color="#6366f1"
            data={parts.payload}
            extra={
              <div className="flex flex-wrap gap-3 text-xs text-[var(--text3)]">
                {status.issuedAt && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    iat: {status.issuedAt.toLocaleString()}
                  </span>
                )}
                {status.expiresAt && (
                  <span>exp: {status.expiresAt.toLocaleString()}</span>
                )}
              </div>
            }
          />

          {/* Signature */}
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <div
              className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)]"
              style={{ background: "var(--surface2)" }}
            >
              <span className="text-sm font-semibold" style={{ color: "#22c55e" }}>
                Signature
              </span>
              <span className="text-xs text-[var(--text3)]">Not verified (requires secret key)</span>
            </div>
            <div className="p-4">
              <code className="text-xs text-[var(--text2)] break-all">{parts.signatureB64}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function JwtSection({
  title,
  color,
  data,
  extra,
}: {
  title: string;
  color: string;
  data: Record<string, unknown>;
  extra?: React.ReactNode;
}) {
  const json = JSON.stringify(data, null, 2);

  return (
    <div className="rounded-xl border border-[var(--border)] overflow-hidden">
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)]"
        style={{ background: "var(--surface2)" }}
      >
        <span className="text-sm font-semibold" style={{ color }}>
          {title}
        </span>
        <CopyButton text={json} label="Copy" />
      </div>
      <div className="p-4 space-y-2">
        {extra}
        <pre className="overflow-x-auto text-xs text-[var(--text)]">{json}</pre>
      </div>
    </div>
  );
}
