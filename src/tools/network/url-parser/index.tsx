"use client";

import { useState } from "react";
import { parseUrl } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";

export default function UrlParserTool() {
  const [input, setInput] = useState("");
  const { parsed, error } = parseUrl(input);

  const rows = parsed
    ? [
        ["Protocol", parsed.protocol],
        ["Host", parsed.host],
        ["Hostname", parsed.hostname],
        ["Port", parsed.port || "(default)"],
        ["Origin", parsed.origin],
        ["Pathname", parsed.pathname],
        ["Search", parsed.search || "(none)"],
        ["Hash", parsed.hash || "(none)"],
        ["Username", parsed.username || "(none)"],
        ["Password", parsed.password ? "••••••" : "(none)"],
      ]
    : [];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text2)]">URL to parse</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://user:pass@example.com:8080/path?q=hello&lang=en#section"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm font-mono text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>

      {error && <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>}

      {parsed && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--surface2)]">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-[var(--text2)] w-36">Component</th>
                  <th className="px-4 py-2 text-left font-medium text-[var(--text2)]">Value</th>
                  <th className="px-4 py-2 w-16" />
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, value], i) => (
                  <tr key={label} className={`border-t border-[var(--border)] ${i % 2 === 0 ? "" : "bg-[var(--surface2)]/40"}`}>
                    <td className="px-4 py-2.5 font-medium text-[var(--text2)]">{label}</td>
                    <td className="px-4 py-2.5 font-mono text-[var(--text)] break-all">{value}</td>
                    <td className="px-4 py-2.5 text-right">{value && !["(none)", "(default)", "••••••"].includes(value) && <CopyButton text={value} />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {Object.keys(parsed.queryParams).length > 0 && (
            <div className="rounded-xl border border-[var(--border)] overflow-hidden">
              <div className="bg-[var(--surface2)] px-4 py-2 text-sm font-semibold text-[var(--text2)]">Query Parameters</div>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(parsed.queryParams).map(([key, values], i) => (
                    <tr key={key} className={`border-t border-[var(--border)] ${i % 2 === 0 ? "" : "bg-[var(--surface2)]/40"}`}>
                      <td className="px-4 py-2.5 font-mono font-semibold text-[var(--primary)] w-40">{key}</td>
                      <td className="px-4 py-2.5 font-mono text-[var(--text)]">{values.join(", ")}</td>
                      <td className="px-4 py-2.5 text-right"><CopyButton text={values.join(", ")} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
