import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "mime-types",
  name: "MIME Type Reference",
  tagline: "Look up MIME types by file extension or content type",
  description:
    "Free MIME type reference. Search by file extension or MIME type to find the correct content type for your HTTP responses, file uploads, and APIs.",
  category: "network",
  keywords: ["mime type", "content type", "mime types list", "file extension mime type", "http content type"],
  faqs: [
    { question: "What is a MIME type?", answer: "A MIME type (Multipurpose Internet Mail Extensions) identifies the format of a file. HTTP uses it in the Content-Type header to tell clients what kind of data they're receiving." },
    { question: "What MIME type should I use for JSON APIs?", answer: "Use application/json. For JSON-LD, use application/ld+json. For JSON streams, application/x-ndjson." },
    { question: "What is the MIME type for JavaScript?", answer: "The correct MIME type is text/javascript. The older application/javascript is deprecated but still widely supported." },
    { question: "What MIME type should I use for file downloads?", answer: "Use application/octet-stream to force a download for unknown binary files, or the specific type (e.g. application/pdf for PDFs)." },
    { question: "Does the file extension determine the MIME type?", answer: "The extension is a hint, but the server ultimately sets the MIME type via the Content-Type header. Always set it explicitly in your server configuration." },
  ],
  relatedTools: ["url-parser", "url-encoder", "http-status-codes"],
  howToSteps: [
    "Type a file extension (e.g. png) or MIME type (e.g. application/json) in the search box",
    "Results filter instantly as you type",
    "Click a row to copy the MIME type",
  ],
  lastUpdated: "2025-01-01",
};
