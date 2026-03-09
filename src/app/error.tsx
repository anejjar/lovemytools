"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-2xl text-3xl"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        ⚠️
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-[var(--text)]">Something went wrong</h2>
        <p className="text-[var(--text2)]">An unexpected error occurred. Try again or go back home.</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
          style={{ background: "var(--primary)" }}
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text2)] hover:text-[var(--text)] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
