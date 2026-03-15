"use client";

import { useState } from "react";
import { lookupIp, isValidIp } from "./logic";
import type { IpInfo } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";

export default function IpLookupTool() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IpInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lookup = async () => {
    if (input.trim() && !isValidIp(input.trim())) {
      setError("Please enter a valid IPv4 or IPv6 address, or leave blank for your own IP.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    const result = await lookupIp(input);
    setLoading(false);
    if (result.error) setError(result.error);
    else setData(result.data);
  };

  const rows = data
    ? [
        ["IP Address", data.ip],
        ["City", data.city],
        ["Region", data.region],
        ["Country", data.country],
        ["Location", data.loc],
        ["Organization", data.org],
        ["Timezone", data.timezone],
        ["Postal Code", data.postal],
        ["Hostname", data.hostname],
      ].filter(([, v]) => v)
    : [];

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && lookup()}
          placeholder="Enter IP address, or leave blank for your own IP"
          className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <button
          onClick={lookup}
          disabled={loading}
          className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? "Looking up…" : "Lookup"}
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>}

      {data && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <div className="bg-[var(--surface2)] px-4 py-3 text-sm font-semibold text-[var(--text2)]">
            Results for {data.ip}
          </div>
          <table className="w-full text-sm">
            <tbody>
              {rows.map(([label, value], i) => (
                <tr key={label} className={`border-t border-[var(--border)] ${i % 2 === 0 ? "" : "bg-[var(--surface2)]/40"}`}>
                  <td className="px-4 py-2.5 font-medium text-[var(--text2)] w-36">{label}</td>
                  <td className="px-4 py-2.5 font-mono text-[var(--text)]">{value}</td>
                  <td className="px-4 py-2.5 text-right"><CopyButton text={value!} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
