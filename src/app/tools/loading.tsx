export default function ToolsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-8">
      <div className="space-y-2">
        <div className="h-10 w-64 rounded-lg bg-[var(--surface2)] animate-pulse" />
        <div className="h-5 w-48 rounded bg-[var(--surface2)] animate-pulse" />
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-8 w-20 rounded-lg bg-[var(--surface2)] animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-3">
            <div className="h-5 w-16 rounded bg-[var(--surface2)] animate-pulse" />
            <div className="space-y-2">
              <div className="h-5 w-3/4 rounded bg-[var(--surface2)] animate-pulse" />
              <div className="h-4 w-full rounded bg-[var(--surface2)] animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
