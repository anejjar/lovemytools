import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "byte-converter",
  name: "Byte Converter",
  tagline: "Convert between bytes, KB, MB, GB, TB, and binary units",
  description:
    "Free online byte converter. Convert file sizes between bytes, kilobytes, megabytes, gigabytes, terabytes, and binary units (KiB, MiB, GiB). Supports SI and IEC standards.",
  category: "numbers",
  keywords: ["byte converter", "kb to mb", "gb to tb", "file size converter", "megabyte converter", "binary byte converter", "storage unit converter"],
  faqs: [
    { question: "What is the difference between KB and KiB?", answer: "KB (kilobyte) is 1,000 bytes in the SI standard used by hard drive manufacturers. KiB (kibibyte) is 1,024 bytes in the IEC binary standard used by operating systems. This is why a '1TB' hard drive shows less space in Windows." },
    { question: "Which standard should I use?", answer: "Use SI units (KB, MB, GB) when working with network speeds or storage marketing. Use binary units (KiB, MiB, GiB) when working with OS memory, RAM, and file system sizes." },
    { question: "How many bytes in a gigabyte?", answer: "1 GB = 1,000,000,000 bytes (SI). 1 GiB = 1,073,741,824 bytes (binary). The difference explains why a 500GB hard drive shows as ~465 GiB in Windows." },
    { question: "Can I convert network speeds?", answer: "Yes. Network speeds are typically in bits not bytes (Mbps = megabits per second). To convert, divide by 8: 100 Mbps = 12.5 MB/s." },
    { question: "What is a petabyte?", answer: "A petabyte (PB) is 1,000 terabytes or 1,000,000 gigabytes. Large cloud providers and data centers measure storage in petabytes." },
  ],
  relatedTools: ["number-base-converter", "roman-numeral", "unix-timestamp", "hash-generator"],
  howToSteps: [
    "Enter the file size value",
    "Select the unit (B, KB, MB, GB, etc.)",
    "All conversions appear instantly",
    "Copy any result with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
