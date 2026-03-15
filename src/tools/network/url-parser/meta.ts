import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "url-parser",
  name: "URL Parser & Inspector",
  tagline: "Break down any URL into its components instantly",
  description:
    "Free URL parser. Paste any URL and instantly see protocol, hostname, port, path, query parameters, and fragment. Inspect and decode every URL part.",
  category: "network",
  keywords: ["url parser", "url inspector", "parse url", "url components", "query string parser", "url decoder"],
  faqs: [
    { question: "What parts of a URL does this tool parse?", answer: "Protocol, username, password, hostname, port, pathname, query string, individual query parameters (including repeated keys), hash fragment, origin, and host." },
    { question: "What is the difference between host and hostname?", answer: "hostname is just the domain (e.g. example.com). host includes the port if non-standard (e.g. example.com:8080)." },
    { question: "Can I parse URLs with repeated query parameters?", answer: "Yes. For example, ?color=red&color=blue is parsed as color: ['red', 'blue']." },
    { question: "What is the URL fragment (#)?", answer: "The fragment (hash) identifies a section within the page. It is not sent to the server — it's processed entirely by the browser." },
    { question: "Can I build a URL with this tool?", answer: "The parser shows all components. For URL encoding/decoding, use the URL Encoder tool." },
  ],
  relatedTools: ["url-encoder", "ip-lookup", "mime-types", "cron-generator"],
  howToSteps: [
    "Paste any URL into the input field",
    "View each component in the breakdown table",
    "Inspect individual query parameters and their values",
    "Copy any component value with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
