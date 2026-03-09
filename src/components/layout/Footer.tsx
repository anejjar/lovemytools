import Link from "next/link";
import { Zap } from "lucide-react";

const toolLinks = [
  { name: "JSON Formatter", href: "/tools/json-formatter" },
  { name: "Password Generator", href: "/tools/password-generator" },
  { name: "Lorem Ipsum", href: "/tools/lorem-ipsum-generator" },
  { name: "Base64 Encoder", href: "/tools/base64" },
  { name: "UUID Generator", href: "/tools/uuid-generator" },
  { name: "JWT Decoder", href: "/tools/jwt-decoder" },
  { name: "Color Picker", href: "/tools/color-picker" },
  { name: "Color Converter", href: "/tools/color-converter" },
  { name: "Unix Timestamp", href: "/tools/unix-timestamp" },
  { name: "HTTP Status Codes", href: "/tools/http-status-codes" },
];

export function Footer() {
  return (
    <footer
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg2)" }}
      className="mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-[var(--text)]">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "var(--primary)" }}>
                <Zap className="h-3.5 w-3.5 text-white" />
              </span>
              DevTools
            </Link>
            <p className="mt-3 text-sm text-[var(--text2)]">
              Free, fast developer tools that run entirely in your browser. No sign-up required.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--text)]">Popular Tools</h3>
            <ul className="grid grid-cols-2 gap-1">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--text2)] hover:text-[var(--text)] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--text)]">Categories</h3>
            <ul className="space-y-1">
              {["JSON", "Encoding", "Color", "Text", "Security", "Numbers", "Network"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/tools?category=${cat.toLowerCase()}`}
                    className="text-sm text-[var(--text2)] hover:text-[var(--text)] transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-[var(--border)] pt-6">
          <p className="text-xs text-[var(--text3)]">
            © {new Date().getFullYear()} DevTools. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text3)]">
            All tools run client-side. Your data never leaves your browser.
          </p>
        </div>
      </div>
    </footer>
  );
}
