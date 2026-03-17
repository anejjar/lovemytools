"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

interface ToolTrackerProps {
  slug: string;
}

export function ToolTracker({ slug }: ToolTrackerProps) {
  useEffect(() => {
    // Generate or retrieve a session ID
    let sessionId = sessionStorage.getItem("devtools_session");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("devtools_session", sessionId);
    }

    fetch(`/api/tools/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).catch(() => {
      // Non-critical
    });

    posthog.capture("tool_used", { tool: slug });
  }, [slug]);

  return null;
}
