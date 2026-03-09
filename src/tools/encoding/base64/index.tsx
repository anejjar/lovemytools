"use client";

import { useState } from "react";
import { encodeBase64, decodeBase64 } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";
import { FileDropZone } from "@/components/shared/FileDropZone";
import { AlertCircle, AlertTriangle } from "lucide-react";

type Mode = "encode" | "decode";

export default function Base64Tool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const result =
    mode === "encode" ? encodeBase64(input, urlSafe) : decodeBase64(input, urlSafe);

  const handleFile = (content: string, fileName: string) => {
    setInput(content);
    if (fileName.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i)) {
      setImagePreview(`data:image/${fileName.split(".").pop()};base64,${content.split(",")[1] || content}`);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="max-w-2xl space-y-4">
      {/* Warning */}
      <div
        className="flex items-start gap-2 rounded-xl px-4 py-3 text-sm"
        style={{ background: "var(--amber-dim)", color: "var(--amber)" }}
      >
        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
        Base64 is encoding, not encryption. Do not use it to secure sensitive data.
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex overflow-hidden rounded-lg border border-[var(--border)]">
          {(["encode", "decode"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-5 py-2 text-sm font-medium capitalize transition-colors"
              style={{
                background: mode === m ? "var(--primary)" : "var(--surface)",
                color: mode === m ? "white" : "var(--text2)",
              }}
            >
              {m}
            </button>
          ))}
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2">
          <input
            type="checkbox"
            checked={urlSafe}
            onChange={(e) => setUrlSafe(e.target.checked)}
            className="accent-[#6366f1]"
          />
          <span className="text-sm text-[var(--text2)]">URL-safe</span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text2)]">
          {mode === "encode" ? "Text or file to encode" : "Base64 string to decode"}
        </label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setImagePreview(null); }}
          placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string to decode..."}
          rows={6}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm text-[var(--text)] placeholder:text-[var(--text3)] resize-y focus:border-[var(--primary)] focus:outline-none"
        />
        {mode === "encode" && (
          <FileDropZone onFile={handleFile} label="Drop a file to encode it to Base64" />
        )}
      </div>

      {/* Output */}
      {result.error ? (
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm"
          style={{ background: "var(--red-dim)", color: "var(--red)" }}
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {result.error}
        </div>
      ) : result.output ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text2)]">Output</label>
            <CopyButton text={result.output} />
          </div>
          <textarea
            readOnly
            value={result.output}
            rows={6}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg2)] p-4 font-mono text-sm text-[var(--text)] resize-y focus:outline-none cursor-default"
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
          {imagePreview && (
            <div className="rounded-xl border border-[var(--border)] p-3">
              <p className="mb-2 text-xs text-[var(--text3)]">Image preview</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="preview" className="max-h-40 rounded-lg object-contain" />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
