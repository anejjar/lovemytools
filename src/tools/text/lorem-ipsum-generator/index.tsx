"use client";

import { useState } from "react";
import { generateLoremIpsum } from "./logic";
import { CopyButton } from "@/components/shared/CopyButton";

type Unit = "words" | "sentences" | "paragraphs";

export default function LoremIpsumTool() {
  const [unit, setUnit] = useState<Unit>("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState(() => generateLoremIpsum("paragraphs", 3, true));

  const generate = () => {
    setOutput(generateLoremIpsum(unit, count, startWithLorem));
  };

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex flex-wrap items-end gap-4">
        {/* Type selector */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--text3)] uppercase tracking-wider">Type</label>
          <div className="flex overflow-hidden rounded-lg border border-[var(--border)]">
            {(["words", "sentences", "paragraphs"] as Unit[]).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className="px-4 py-2 text-sm capitalize transition-colors"
                style={{
                  background: unit === u ? "var(--primary)" : "var(--surface)",
                  color: unit === u ? "white" : "var(--text2)",
                }}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--text3)] uppercase tracking-wider">Count</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
            className="w-20 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
          />
        </div>

        {/* Start with Lorem */}
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2">
          <input
            type="checkbox"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
            className="accent-[#6366f1]"
          />
          <span className="text-sm text-[var(--text2)]">Start with "Lorem ipsum..."</span>
        </label>

        <button
          onClick={generate}
          className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition-colors"
          style={{ background: "var(--primary)" }}
        >
          Generate
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-[var(--text3)]">
            {output.split(/\s+/).filter(Boolean).length} words · {output.length} characters
          </span>
          <CopyButton text={output} />
        </div>
        <textarea
          readOnly
          value={output}
          rows={12}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm leading-relaxed text-[var(--text)] resize-y focus:outline-none"
          onClick={(e) => (e.target as HTMLTextAreaElement).select()}
        />
      </div>
    </div>
  );
}
