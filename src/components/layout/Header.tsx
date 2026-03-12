"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Zap, Menu, X } from "lucide-react";

const categories = [
  { name: "JSON", href: "/tools?category=json" },
  { name: "Encoding", href: "/tools?category=encoding" },
  { name: "Color", href: "/tools?category=color" },
  { name: "Text", href: "/tools?category=text" },
  { name: "Security", href: "/tools?category=security" },
  { name: "Numbers", href: "/tools?category=numbers" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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

        <div className="flex items-center gap-3">
          <Link
            href="/tools"
            className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--text2)] shadow-sm hover:text-[var(--text)] hover:shadow-md transition-all"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search tools</span>
          </Link>
          <button
            className="md:hidden text-[var(--text2)]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

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
        </div>
      )}
    </header>
  );
}
