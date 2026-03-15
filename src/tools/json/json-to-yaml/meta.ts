import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "json-to-yaml",
  name: "JSON to YAML Converter",
  tagline: "Convert JSON to YAML and YAML to JSON instantly",
  description:
    "Free online JSON to YAML converter. Transform JSON configuration files to YAML format or convert YAML back to JSON. Supports nested objects and arrays.",
  category: "json",
  keywords: ["json to yaml", "yaml to json", "convert json yaml", "json yaml converter", "yaml converter online", "json configuration"],
  faqs: [
    { question: "What is YAML?", answer: "YAML (YAML Ain't Markup Language) is a human-friendly data serialization format commonly used for configuration files in tools like Docker, Kubernetes, GitHub Actions, and Ansible." },
    { question: "What is the difference between JSON and YAML?", answer: "YAML is a superset of JSON and uses indentation instead of brackets and braces. It's more readable for humans but slightly harder to parse programmatically. JSON is stricter and faster to parse." },
    { question: "Can I convert YAML back to JSON?", answer: "Yes. Switch to the YAML → JSON tab and paste your YAML. The tool converts it to properly formatted JSON." },
    { question: "Is my data private?", answer: "Yes. All conversion happens in your browser using the js-yaml library. No data is sent to any server." },
    { question: "Does it handle nested objects and arrays?", answer: "Yes. The converter fully handles nested objects, arrays, strings, numbers, booleans, and null values in both directions." },
  ],
  relatedTools: ["json-formatter", "json-minifier", "json-to-csv", "json-diff"],
  howToSteps: [
    "Select JSON → YAML or YAML → JSON mode",
    "Paste your input into the editor",
    "The converted output appears instantly",
    "Copy the result with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
