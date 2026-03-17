import { toolRegistry } from "@/tools/_registry";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolsClient } from "./ToolsClient";

export const metadata: Metadata = {
  title: "All Developer Tools",
  description:
    "Browse 50+ free online developer tools. JSON formatters, encoders, color tools, security utilities, and more. No sign-up required.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-[var(--text)]">Developer Tools</h1>
        <p className="text-[var(--text2)]">
          {toolRegistry.length} free tools. No sign-up required.
        </p>
      </div>
      <Suspense>
        <ToolsClient tools={toolRegistry} />
      </Suspense>
    </div>
  );
}
