"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackWidgetProps {
  slug: string;
}

type State = "idle" | "comment" | "submitting" | "done";

export function FeedbackWidget({ slug }: FeedbackWidgetProps) {
  const [state, setState] = useState<State>("idle");
  const [rating, setRating] = useState<1 | 5 | null>(null);
  const [comment, setComment] = useState("");

  async function submit(selectedRating: 1 | 5, optionalComment?: string) {
    setState("submitting");
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, rating: selectedRating, comment: optionalComment }),
      });
    } catch {
      // Non-critical
    }
    setState("done");
  }

  function handleVote(vote: 1 | 5) {
    setRating(vote);
    setState("comment");
  }

  function handleSubmitComment() {
    if (rating) submit(rating, comment || undefined);
  }

  function handleSkipComment() {
    if (rating) submit(rating);
  }

  if (state === "done") {
    return (
      <div className="flex items-center gap-2 text-sm text-[var(--text3)]">
        <span className="text-base">🙏</span>
        <span>Thanks for your feedback!</span>
      </div>
    );
  }

  if (state === "comment" || state === "submitting") {
    return (
      <div className="space-y-3">
        <p className="text-sm text-[var(--text2)]">
          {rating === 5 ? "Glad it helped! " : "Sorry to hear that. "}
          Any comments? <span className="text-[var(--text3)]">(optional)</span>
        </p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What could be improved?"
          rows={2}
          maxLength={1000}
          className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--primary)] transition-colors"
          disabled={state === "submitting"}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSubmitComment}
            disabled={state === "submitting"}
            className="rounded-lg bg-[var(--primary)] px-3 py-1.5 text-sm font-medium text-white transition-opacity disabled:opacity-50"
          >
            {state === "submitting" ? "Sending…" : "Send"}
          </button>
          <button
            onClick={handleSkipComment}
            disabled={state === "submitting"}
            className="rounded-lg px-3 py-1.5 text-sm text-[var(--text3)] hover:text-[var(--text2)] transition-colors disabled:opacity-50"
          >
            Skip
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[var(--text3)]">Was this helpful?</span>
      <button
        onClick={() => handleVote(5)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm transition-all",
          "border-[var(--border)] text-[var(--text3)] hover:text-[var(--green)] hover:border-[var(--green)]"
        )}
        aria-label="Yes, helpful"
      >
        <ThumbsUp className="h-3.5 w-3.5" />
        Yes
      </button>
      <button
        onClick={() => handleVote(1)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm transition-all",
          "border-[var(--border)] text-[var(--text3)] hover:text-[var(--red,#ef4444)] hover:border-[var(--red,#ef4444)]"
        )}
        aria-label="No, not helpful"
      >
        <ThumbsDown className="h-3.5 w-3.5" />
        No
      </button>
    </div>
  );
}
