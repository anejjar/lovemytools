import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "ip-lookup",
  name: "IP Address Lookup",
  tagline: "Look up geolocation, ISP, and timezone for any IP address",
  description:
    "Free IP address lookup tool. Enter any IPv4 or IPv6 address to get its approximate geolocation, ISP/organization, timezone, and more. Also shows your own IP.",
  category: "network",
  keywords: ["ip lookup", "ip address lookup", "ip geolocation", "find ip location", "ip info", "my ip address"],
  faqs: [
    { question: "What information does IP lookup show?", answer: "City, region, country, approximate coordinates, ISP/organization, timezone, postal code, and hostname (if available)." },
    { question: "How accurate is IP geolocation?", answer: "City-level accuracy is typically 50–75%. Country-level accuracy is over 95%. It's an approximation based on registration data, not GPS." },
    { question: "Can I look up my own IP?", answer: "Yes. Leave the input empty and click 'Lookup' to see information about your current public IP address." },
    { question: "Does this work for private IP addresses?", answer: "No. Private/reserved addresses (192.168.x.x, 10.x.x.x, 127.x.x.x) are not routable and have no geolocation data." },
    { question: "What API does this use?", answer: "This tool uses the ipinfo.io API for IP geolocation data." },
  ],
  relatedTools: ["url-parser", "mime-types", "http-status-codes"],
  howToSteps: [
    "Enter an IPv4 or IPv6 address, or leave blank to look up your own IP",
    "Click the Lookup button",
    "View geolocation, ISP, timezone, and other details",
    "Copy any field value with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
