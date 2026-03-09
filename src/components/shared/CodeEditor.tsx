"use client";

import { cn } from "@/lib/utils";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  rows?: number;
}

export function CodeEditor({
  value,
  onChange,
  placeholder,
  readOnly = false,
  className,
  rows = 16,
}: CodeEditorProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      rows={rows}
      spellCheck={false}
      className={cn(
        "w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] p-4",
        "font-mono text-sm text-[var(--text)] placeholder:text-[var(--text3)]",
        "resize-y focus:outline-none focus:border-[var(--primary)]",
        "transition-colors",
        readOnly && "cursor-default",
        className
      )}
    />
  );
}
