"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropZoneProps {
  onFile: (content: string, fileName: string) => void;
  accept?: string;
  className?: string;
  label?: string;
}

export function FileDropZone({
  onFile,
  accept = ".txt,.json,.csv",
  className,
  label = "Drop a file or click to upload",
}: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFile(content, file.name);
    };
    reader.readAsText(file);
  };

  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors",
        dragging
          ? "border-[var(--primary)] bg-[var(--primary-dim)]"
          : "border-[var(--border2)] hover:border-[var(--primary)]",
        className
      )}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) readFile(file);
      }}
    >
      <Upload className="h-5 w-5 text-[var(--text3)]" />
      <p className="text-sm text-[var(--text2)]">{label}</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) readFile(file);
        }}
      />
    </div>
  );
}
