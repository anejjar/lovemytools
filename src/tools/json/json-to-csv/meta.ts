import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "json-to-csv",
  name: "JSON to CSV Converter",
  tagline: "Convert JSON arrays to CSV and back instantly",
  description:
    "Free online JSON to CSV converter. Transform JSON arrays of objects to CSV spreadsheet format or convert CSV back to JSON. Supports custom delimiters.",
  category: "json",
  keywords: ["json to csv", "csv to json", "convert json csv", "json converter", "json export csv", "json spreadsheet"],
  faqs: [
    { question: "What JSON formats are supported?", answer: "The tool supports arrays of objects (most common) and single objects. Each key becomes a column header and each array item becomes a row." },
    { question: "Can I use a delimiter other than a comma?", answer: "Yes. You can choose comma, semicolon, or tab as the delimiter. Tab-separated values (TSV) are useful for pasting directly into spreadsheets." },
    { question: "What happens if a value contains a comma?", answer: "Values containing the delimiter are automatically wrapped in double quotes per the CSV spec, so your data stays intact." },
    { question: "Can I convert CSV back to JSON?", answer: "Yes. Switch to the CSV → JSON tab, paste your CSV data, and the tool will parse it into a JSON array of objects using the header row as keys." },
    { question: "Is my data private?", answer: "Completely. All conversion happens in your browser. Your data is never uploaded to any server." },
  ],
  relatedTools: ["json-formatter", "json-minifier", "json-to-yaml", "json-diff"],
  howToSteps: [
    "Paste your JSON array into the input box",
    "Select your preferred delimiter (comma, semicolon, or tab)",
    "The CSV output appears automatically",
    "Copy the result or switch to CSV → JSON mode to convert back",
  ],
  lastUpdated: "2025-01-01",
};
