"use client";

import { useState } from "react";
import { HTTP_STATUS_CODES, searchStatusCodes, getCategoryColor } from "./logic";
import type { HttpStatus } from "./logic";
import { Search } from "lucide-react";

const CATEGORIES = ["all", "1xx", "2xx", "3xx", "4xx", "5xx"];

export default function HttpStatusCodesTool() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = searchStatusCodes(query).filter(
    (s) => category === "all" || s.category === category
  );

  return (
    <div className="max-w-3xl space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text3)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by code, name, or description..."
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-4 text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:border-[var(--primary)] focus:outline-none"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className="rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors"
            style={{
              borderColor: category === cat
                ? cat === "all" ? "var(--primary)" : getCategoryColor(cat)
                : "var(--border)",
              background: category === cat
                ? cat === "all" ? "var(--primary-dim)" : `${getCategoryColor(cat)}22`
                : "var(--surface)",
              color: category === cat
                ? cat === "all" ? "var(--primary)" : getCategoryColor(cat)
                : "var(--text2)",
            }}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {/* Status codes list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-[var(--text3)]">No status codes found.</p>
        )}
        {filtered.map((status) => (
          <StatusCard
            key={status.code}
            status={status}
            expanded={expanded === status.code}
            onToggle={() => setExpanded(expanded === status.code ? null : status.code)}
          />
        ))}
      </div>

      <p className="text-xs text-[var(--text3)]">
        {HTTP_STATUS_CODES.length} status codes total · Showing {filtered.length}
      </p>
    </div>
  );
}

function StatusCard({
  status,
  expanded,
  onToggle,
}: {
  status: HttpStatus;
  expanded: boolean;
  onToggle: () => void;
}) {
  const color = getCategoryColor(status.category);

  return (
    <div
      className="rounded-xl border overflow-hidden transition-colors cursor-pointer"
      style={{ borderColor: expanded ? color : "var(--border)", background: "var(--surface)" }}
      onClick={onToggle}
    >
      <div className="flex items-center gap-3 p-4">
        <span
          className="rounded-lg px-2.5 py-0.5 text-sm font-bold font-mono"
          style={{ background: `${color}22`, color }}
        >
          {status.code}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[var(--text)]">{status.name}</p>
          {!expanded && (
            <p className="text-sm text-[var(--text2)] truncate">{status.description}</p>
          )}
        </div>
        <span
          className="shrink-0 rounded-md px-2 py-0.5 text-xs"
          style={{ background: `${color}22`, color }}
        >
          {status.category}
        </span>
      </div>
      {expanded && (
        <div className="border-t px-4 pb-4 pt-3 space-y-2" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm text-[var(--text2)]">{status.description}</p>
          <div className="rounded-lg p-3 text-sm" style={{ background: "var(--bg2)" }}>
            <span className="font-medium text-[var(--text)]">Use case: </span>
            <span className="text-[var(--text2)]">{status.useCase}</span>
          </div>
        </div>
      )}
    </div>
  );
}
