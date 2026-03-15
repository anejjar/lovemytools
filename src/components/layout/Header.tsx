"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Zap, Menu, X } from "lucide-react";
import { CommandSearch } from "@/components/shared/CommandSearch";

const categories = [
  { name: "JSON",       href: "/tools?category=json"       },
  { name: "Encoding",   href: "/tools?category=encoding"   },
  { name: "Color",      href: "/tools?category=color"       },
  { name: "Text",       href: "/tools?category=text"        },
  { name: "Security",   href: "/tools?category=security"    },
  { name: "Numbers",    href: "/tools?category=numbers"     },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Opens the command search modal via a CustomEvent (CommandSearch listens for this)
  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("open-command-search"));
  };

  // Show Ctrl+K or ⌘K depending on OS
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-[var(--text)]"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-xl shadow-sm"
              style={{ background: "var(--primary)" }}
            >
              <Zap className="h-4 w-4 text-white" />
            </span>
            DevTools
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {categories.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="relative text-sm text-[var(--text2)] transition-colors hover:text-[var(--text)] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--primary)] after:transition-all hover:after:w-full"
              >
                {c.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Search trigger */}
            <button
              onClick={openSearch}
              className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--text2)] shadow-sm hover:border-[var(--border2)] hover:shadow-md transition-all group"
            >
              <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">Search tools</span>
              <kbd
                className="hidden rounded border px-1 py-0.5 font-mono text-[10px] leading-none sm:flex sm:items-center"
                style={{
                  borderColor: "var(--border2)",
                  color: "var(--text3)",
                  background: "var(--surface2)",
                }}
              >
                {isMac ? "⌘K" : "Ctrl K"}
              </kbd>
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-[var(--text2)]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3 md:hidden">
            {categories.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="block py-2 text-sm text-[var(--text2)] hover:text-[var(--text)]"
                onClick={() => setMenuOpen(false)}
              >
                {c.name}
              </Link>
            ))}
            <button
              onClick={() => { setMenuOpen(false); openSearch(); }}
              className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface2)] py-2 text-sm text-[var(--text2)] hover:text-[var(--text)] transition-colors"
            >
              Search tools…
            </button>
          </div>
        )}
      </header>

      {/* Command search modal — lives outside header stacking context */}
      <CommandSearch />
    </>
  );
}
