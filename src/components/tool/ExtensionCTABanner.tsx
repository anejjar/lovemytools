import Link from "next/link";
import { Zap } from "lucide-react";
import { siteConfig } from "@/config/site";

export function ExtensionCTABanner() {
  const href = siteConfig.links.extension;

  // Don't render if no extension URL configured
  if (href === "#") return null;

  return (
    <section className="rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-6 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-[var(--text)]">
              Get all tools in your browser
            </p>
            <p className="mt-0.5 text-sm text-[var(--text2)]">
              Install the Chrome extension for one-click access to every tool — no tab switching needed.
            </p>
          </div>
        </div>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Add to Chrome — Free
        </Link>
      </div>
    </section>
  );
}
