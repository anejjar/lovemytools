export default function ToolLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <div className="h-4 w-10 rounded bg-[var(--surface2)] animate-pulse" />
        <div className="h-4 w-2 rounded bg-[var(--surface2)] animate-pulse" />
        <div className="h-4 w-12 rounded bg-[var(--surface2)] animate-pulse" />
        <div className="h-4 w-2 rounded bg-[var(--surface2)] animate-pulse" />
        <div className="h-4 w-32 rounded bg-[var(--surface2)] animate-pulse" />
      </div>

      {/* Hero */}
      <div className="space-y-4">
        <div className="h-6 w-20 rounded-lg bg-[var(--surface2)] animate-pulse" />
        <div className="h-10 w-3/4 rounded-lg bg-[var(--surface2)] animate-pulse" />
        <div className="h-6 w-1/2 rounded bg-[var(--surface2)] animate-pulse" />
      </div>

      {/* Tool workspace */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 h-64 animate-pulse" />
    </div>
  );
}
