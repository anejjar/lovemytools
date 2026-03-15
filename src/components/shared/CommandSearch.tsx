"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toolRegistry } from "@/tools/_registry";
import type { ToolMeta } from "@/types";

// ─── Category config ────────────────────────────────────────────────────────
const CAT_CONFIG: Record<string, { color: string; icon: string }> = {
  json:       { color: "#f59e0b", icon: "{ }" },
  encoding:   { color: "#06b6d4", icon: "⇄"  },
  css:        { color: "#3b82f6", icon: "#"   },
  color:      { color: "#a855f7", icon: "◉"   },
  text:       { color: "#10b981", icon: "Aa"  },
  security:   { color: "#ef4444", icon: "🔒"  },
  numbers:    { color: "#f97316", icon: "01"  },
  javascript: { color: "#eab308", icon: "JS"  },
  html:       { color: "#e11d48", icon: "<>"  },
  network:    { color: "#8b5cf6", icon: "⚡"  },
};

// Top 8 default suggestions (most useful tools)
const DEFAULTS = [
  "json-formatter",
  "url-encoder",
  "color-picker",
  "markdown-previewer",
  "hash-generator",
  "regex-tester",
  "css-gradient-generator",
  "contrast-checker",
];

const defaultTools = DEFAULTS
  .map((slug) => toolRegistry.find((t) => t.slug === slug))
  .filter(Boolean) as ToolMeta[];

function search(query: string): ToolMeta[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return toolRegistry
    .filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.includes(q)) ||
        t.category.includes(q)
    )
    .slice(0, 9);
}

// ─── Result row ──────────────────────────────────────────────────────────────
function ResultRow({
  tool,
  active,
  onSelect,
  onHover,
  index,
}: {
  tool: ToolMeta;
  active: boolean;
  onSelect: () => void;
  onHover: () => void;
  index: number;
}) {
  const cat = CAT_CONFIG[tool.category] ?? { color: "#6366f1", icon: "•" };
  return (
    <button
      onMouseMove={onHover}
      onClick={onSelect}
      data-index={index}
      className="group w-full flex items-center gap-3 px-4 py-3 text-left transition-none outline-none"
      style={{
        background: active ? "var(--surface2)" : "transparent",
        borderLeft: active ? `2px solid ${cat.color}` : "2px solid transparent",
      }}
    >
      {/* Category icon */}
      <span
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold leading-none"
        style={{ background: cat.color + "18", color: cat.color }}
      >
        {cat.icon}
      </span>

      {/* Name + tagline */}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-[var(--text)]">
          {tool.name}
        </span>
        <span className="block truncate text-xs text-[var(--text3)]">
          {tool.tagline}
        </span>
      </span>

      {/* Category badge */}
      <span
        className="hidden flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide sm:block"
        style={{ background: cat.color + "18", color: cat.color }}
      >
        {tool.category}
      </span>

      {/* Arrow hint when active */}
      {active && (
        <span className="flex-shrink-0 text-[var(--text3)]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  );
}

// ─── Main modal ──────────────────────────────────────────────────────────────
export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = query.trim() ? search(query) : [];
  const displayed = query.trim() ? results : defaultTools;
  const isDefault = !query.trim();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIdx(0);
  }, []);

  const openModal = useCallback(() => {
    setOpen(true);
    setActiveIdx(0);
    setTimeout(() => inputRef.current?.focus(), 30);
  }, []);

  const navigate = useCallback(
    (tool: ToolMeta) => {
      close();
      router.push(`/tools/${tool.slug}`);
    },
    [close, router]
  );

  // Global Ctrl+K / Cmd+K and custom event from header button
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        open ? close() : openModal();
      }
      if (e.key === "Escape" && open) close();
    };
    const eventHandler = () => openModal();
    window.addEventListener("keydown", keyHandler);
    window.addEventListener("open-command-search", eventHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("open-command-search", eventHandler);
    };
  }, [open, close, openModal]);

  // Arrow key + enter navigation inside modal
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, displayed.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const tool = displayed[activeIdx];
        if (tool) navigate(tool);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, displayed, activeIdx, navigate]);

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector(`[data-index="${activeIdx}"]`) as HTMLElement | null;
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  // Reset active when results change
  useEffect(() => { setActiveIdx(0); }, [query]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        className="fixed inset-0 z-[999]"
        style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      />

      {/* Modal */}
      <div
        className="fixed left-1/2 top-[15%] z-[1000] w-full max-w-[620px] -translate-x-1/2"
        style={{ animation: "cmdSlideIn 0.15s cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div
          className="overflow-hidden rounded-2xl shadow-2xl"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px var(--border)",
          }}
        >
          {/* Search input row */}
          <div
            className="flex items-center gap-3 px-4"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <svg className="h-4 w-4 flex-shrink-0 text-[var(--text3)]" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools…"
              className="flex-1 bg-transparent py-4 text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none"
              spellCheck={false}
              autoComplete="off"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="flex-shrink-0 text-[var(--text3)] hover:text-[var(--text)] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
            <kbd
              className="hidden flex-shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-medium sm:block"
              style={{ borderColor: "var(--border2)", color: "var(--text3)", background: "var(--surface2)" }}
            >
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className="max-h-[420px] overflow-y-auto">
            {/* Section label */}
            <div
              className="px-4 py-2 text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--text3)" }}
            >
              {isDefault ? "Popular tools" : results.length > 0 ? `${results.length} result${results.length !== 1 ? "s" : ""}` : "No results"}
            </div>

            {displayed.length > 0 ? (
              displayed.map((tool, i) => (
                <ResultRow
                  key={tool.slug}
                  tool={tool}
                  index={i}
                  active={i === activeIdx}
                  onHover={() => setActiveIdx(i)}
                  onSelect={() => navigate(tool)}
                />
              ))
            ) : (
              <div className="px-4 py-10 text-center">
                <p className="text-sm text-[var(--text3)]">No tools match &ldquo;{query}&rdquo;</p>
                <p className="mt-1 text-xs text-[var(--text3)] opacity-60">Try a different keyword or category</p>
              </div>
            )}
          </div>

          {/* Footer hints */}
          <div
            className="flex items-center gap-4 px-4 py-2.5"
            style={{ borderTop: "1px solid var(--border)", background: "var(--surface2)" }}
          >
            {[
              ["↑↓", "navigate"],
              ["↩", "open"],
              ["esc", "close"],
            ].map(([key, label]) => (
              <span key={key} className="flex items-center gap-1.5 text-[10px] text-[var(--text3)]">
                <kbd
                  className="rounded border px-1.5 py-0.5 font-mono text-[10px]"
                  style={{ borderColor: "var(--border2)", background: "var(--surface)", color: "var(--text2)" }}
                >
                  {key}
                </kbd>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cmdSlideIn {
          from { opacity: 0; transform: translate(-50%, -8px) scale(0.97); }
          to   { opacity: 1; transform: translate(-50%, 0)    scale(1);    }
        }
      `}</style>
    </>
  );
}
