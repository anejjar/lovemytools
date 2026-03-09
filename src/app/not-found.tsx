import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-2xl text-4xl"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        404
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[var(--text)]">Page Not Found</h1>
        <p className="text-[var(--text2)]">
          The tool or page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          href="/tools"
          className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
          style={{ background: "var(--primary)" }}
        >
          Browse All Tools
        </Link>
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
