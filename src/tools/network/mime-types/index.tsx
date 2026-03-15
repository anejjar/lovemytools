"use client";

import { useState } from "react";
import { searchMime } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";

export default function MimeTypesTool() {
  const [query, setQuery] = useState("");
  const results = searchMime(query);

  const categories = [...new Set(results.map((r) => r.category))].sort();

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by extension (png), MIME type (application/json), or description..."
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
      />

      <p className="text-xs text-[var(--text3)]">{results.length} result{results.length !== 1 ? "s" : ""}</p>

      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text3)]">{cat}</h3>
            <div className="rounded-xl border border-[var(--border)] overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[var(--surface2)]">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-[var(--text2)]">MIME Type</th>
                    <th className="px-4 py-2 text-left font-medium text-[var(--text2)]">Extensions</th>
                    <th className="px-4 py-2 text-left font-medium text-[var(--text2)] hidden md:table-cell">Description</th>
                    <th className="px-4 py-2 w-12" />
                  </tr>
                </thead>
                <tbody>
                  {results
                    .filter((r) => r.category === cat)
                    .map((entry, i) => (
                      <tr key={entry.mimeType} className={`border-t border-[var(--border)] ${i % 2 === 0 ? "" : "bg-[var(--surface2)]/40"}`}>
                        <td className="px-4 py-2.5 font-mono text-xs text-[var(--primary)] break-all">{entry.mimeType}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-[var(--text2)]">
                          {entry.extensions.length > 0 ? entry.extensions.map((e) => `.${e}`).join(", ") : "—"}
                        </td>
                        <td className="px-4 py-2.5 text-[var(--text2)] hidden md:table-cell">{entry.description}</td>
                        <td className="px-4 py-2.5 text-right"><CopyButton text={entry.mimeType} /></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
