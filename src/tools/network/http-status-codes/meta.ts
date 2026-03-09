import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "http-status-codes",
  name: "HTTP Status Codes Reference",
  tagline: "Complete guide to every HTTP status code with examples",
  description:
    "Complete HTTP status codes reference. Look up any HTTP status code — 1xx informational, 2xx success, 3xx redirect, 4xx client error, 5xx server error — with descriptions and use cases.",
  category: "network",
  keywords: [
    "http status codes",
    "http status code list",
    "http error codes",
    "rest api status codes",
    "404 not found",
    "http response codes",
  ],
  faqs: [
    {
      question: "What are HTTP status codes?",
      answer:
        "HTTP status codes are 3-digit numbers returned by a web server in response to a client's request. They indicate whether the request was successful, redirected, or encountered an error. The first digit indicates the response class (1-5).",
    },
    {
      question: "What do the different HTTP status code ranges mean?",
      answer:
        "1xx: Informational — request received. 2xx: Success — request successfully received, understood, and accepted. 3xx: Redirection — further action needed. 4xx: Client Error — bad request syntax or cannot be fulfilled. 5xx: Server Error — server failed to fulfill a valid request.",
    },
    {
      question: "What is the difference between 401 and 403?",
      answer:
        "401 Unauthorized means the client must authenticate first (credentials are missing or invalid). 403 Forbidden means the server understood the request but refuses to authorize it — the client is authenticated but lacks permission.",
    },
    {
      question: "When should I use 200 vs 201?",
      answer:
        "200 OK is for successful GET, PUT, PATCH, or DELETE requests. 201 Created is specifically for successful POST requests that result in a new resource being created. Include the new resource URL in the Location header.",
    },
    {
      question: "What is the difference between 301 and 302 redirects?",
      answer:
        "301 Moved Permanently tells search engines and browsers to update their records — this redirect is cached. 302 Found is a temporary redirect and shouldn't affect SEO. For permanent redirects that should preserve the HTTP method, use 308 instead of 301.",
    },
  ],
  relatedTools: ["base64", "jwt-decoder", "json-formatter", "uuid-generator"],
  howToSteps: [
    "Search for any HTTP status code or keyword",
    "Filter by category: 1xx, 2xx, 3xx, 4xx, or 5xx",
    "Click on any status code to see its full description",
    "View use cases and when to use each code",
  ],
  lastUpdated: "2025-01-01",
};
