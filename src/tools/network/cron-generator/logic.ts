export interface CronParts {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export interface ParseResult {
  parts: CronParts | null;
  description: string;
  error: string | null;
  nextRuns: Date[];
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function describeField(val: string, unit: string, names?: string[]): string {
  if (val === "*") return `every ${unit}`;
  if (val.startsWith("*/")) return `every ${val.slice(2)} ${unit}s`;
  if (val.includes(",")) {
    const parts = val.split(",").map((v) => names ? names[parseInt(v)] ?? v : v);
    return parts.join(", ");
  }
  if (val.includes("-")) {
    const [from, to] = val.split("-");
    const f = names ? names[parseInt(from)] ?? from : from;
    const t = names ? names[parseInt(to)] ?? to : to;
    return `${f} through ${t}`;
  }
  return names ? names[parseInt(val)] ?? val : val;
}

export function parseCron(expr: string): ParseResult {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) {
    return { parts: null, description: "", error: "Cron expression must have exactly 5 fields: minute hour day month weekday", nextRuns: [] };
  }

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  const cronParts: CronParts = { minute, hour, dayOfMonth, month, dayOfWeek };

  const validate = (v: string, min: number, max: number): boolean => {
    if (v === "*") return true;
    if (v.startsWith("*/")) return !isNaN(parseInt(v.slice(2)));
    return v.split(/[,\-]/).every((p) => { const n = parseInt(p); return !isNaN(n) && n >= min && n <= max; });
  };

  if (!validate(minute, 0, 59)) return { parts: null, description: "", error: `Invalid minute: "${minute}"`, nextRuns: [] };
  if (!validate(hour, 0, 23)) return { parts: null, description: "", error: `Invalid hour: "${hour}"`, nextRuns: [] };
  if (!validate(dayOfMonth, 1, 31)) return { parts: null, description: "", error: `Invalid day of month: "${dayOfMonth}"`, nextRuns: [] };
  if (!validate(month, 1, 12)) return { parts: null, description: "", error: `Invalid month: "${month}"`, nextRuns: [] };
  if (!validate(dayOfWeek, 0, 7)) return { parts: null, description: "", error: `Invalid day of week: "${dayOfWeek}"`, nextRuns: [] };

  const minuteDesc = describeField(minute, "minute");
  const hourDesc = describeField(hour, "hour");
  const domDesc = describeField(dayOfMonth, "day");
  const monthDesc = describeField(month, "month", MONTHS);
  const dowDesc = describeField(dayOfWeek, "weekday", DAYS);

  let description = "Runs ";
  if (minute === "0" && hour !== "*") description += `at ${hour.padStart(2, "0")}:00 `;
  else description += `at ${minuteDesc} past ${hourDesc} `;
  if (dayOfMonth !== "*") description += `on day ${domDesc} `;
  if (month !== "*") description += `in ${monthDesc} `;
  if (dayOfWeek !== "*") description += `on ${dowDesc}`;
  description = description.trim();

  const nextRuns = computeNextRuns(cronParts, 5);

  return { parts: cronParts, description, error: null, nextRuns };
}

function computeNextRuns(parts: CronParts, count: number): Date[] {
  const runs: Date[] = [];
  const now = new Date();
  let dt = new Date(now);
  dt.setSeconds(0, 0);
  dt.setMinutes(dt.getMinutes() + 1);

  const matchField = (val: string, cur: number): boolean => {
    if (val === "*") return true;
    if (val.startsWith("*/")) {
      const step = parseInt(val.slice(2));
      return cur % step === 0;
    }
    return val.split(",").some((part) => {
      if (part.includes("-")) {
        const [a, b] = part.split("-").map(Number);
        return cur >= a && cur <= b;
      }
      return parseInt(part) === cur;
    });
  };

  let iterations = 0;
  while (runs.length < count && iterations < 100000) {
    iterations++;
    const min = dt.getMinutes();
    const hr = dt.getHours();
    const dom = dt.getDate();
    const mon = dt.getMonth() + 1;
    const dow = dt.getDay();

    if (matchField(parts.month, mon) && matchField(parts.dayOfMonth, dom) && matchField(parts.dayOfWeek, dow) && matchField(parts.hour, hr) && matchField(parts.minute, min)) {
      runs.push(new Date(dt));
    }
    dt.setMinutes(dt.getMinutes() + 1);
  }

  return runs;
}

export const PRESETS: { label: string; expr: string; description: string }[] = [
  { label: "Every minute", expr: "* * * * *", description: "Runs every minute" },
  { label: "Every hour", expr: "0 * * * *", description: "Runs at the start of every hour" },
  { label: "Every day at midnight", expr: "0 0 * * *", description: "Runs at 00:00 every day" },
  { label: "Every day at noon", expr: "0 12 * * *", description: "Runs at 12:00 every day" },
  { label: "Every Monday", expr: "0 9 * * 1", description: "Runs at 09:00 every Monday" },
  { label: "Every weekday", expr: "0 9 * * 1-5", description: "Runs at 09:00 Monday–Friday" },
  { label: "Every weekend", expr: "0 10 * * 6,0", description: "Runs at 10:00 Saturday and Sunday" },
  { label: "First of month", expr: "0 0 1 * *", description: "Runs at midnight on the 1st of each month" },
  { label: "Every 15 minutes", expr: "*/15 * * * *", description: "Runs every 15 minutes" },
  { label: "Every 6 hours", expr: "0 */6 * * *", description: "Runs every 6 hours" },
];
