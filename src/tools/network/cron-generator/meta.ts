import type { ToolMeta } from "@/types";

export const meta: ToolMeta = {
  slug: "cron-generator",
  name: "Cron Expression Generator",
  tagline: "Build, validate, and understand cron expressions with next run times",
  description:
    "Free cron expression generator. Build and validate cron schedules, get a human-readable description, and see the next 5 run times. Includes common presets.",
  category: "network",
  keywords: ["cron generator", "cron expression", "cron schedule", "cron job", "cron syntax", "cron parser"],
  faqs: [
    { question: "What is a cron expression?", answer: "A cron expression is a string of 5 fields (minute, hour, day, month, weekday) that defines a recurring schedule for automated tasks." },
    { question: "What does * mean in cron?", answer: "An asterisk (*) means 'every'. For example, * in the minute field means 'every minute'." },
    { question: "What does */ mean in cron?", answer: "*/n means 'every n units'. For example, */15 in the minute field runs every 15 minutes." },
    { question: "How do I run a job every weekday at 9am?", answer: "Use: 0 9 * * 1-5. The 1-5 in the weekday field means Monday through Friday." },
    { question: "What is the difference between day-of-month and day-of-week?", answer: "Day-of-month (field 3) selects specific calendar dates (1–31). Day-of-week (field 5) selects specific days of the week (0=Sunday, 6=Saturday)." },
  ],
  relatedTools: ["url-parser", "ip-lookup", "mime-types"],
  howToSteps: [
    "Enter a cron expression or choose a preset",
    "Read the human-readable description",
    "Check the next 5 scheduled run times",
    "Copy the expression with the Copy button",
  ],
  lastUpdated: "2025-01-01",
};
