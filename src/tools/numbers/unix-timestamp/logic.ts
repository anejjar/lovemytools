export interface TimestampResult {
  timestamp: number;
  timestampMs: number;
  utc: string;
  local: string;
  iso: string;
  relative: string;
}

export function isMilliseconds(ts: number): boolean {
  return ts > 9_999_999_999;
}

export function timestampToDate(ts: number): TimestampResult {
  const ms = isMilliseconds(ts) ? ts : ts * 1000;
  const date = new Date(ms);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diffMs = Date.now() - ms;
  const diffSec = diffMs / 1000;
  const diffMin = diffSec / 60;
  const diffHr = diffMin / 60;
  const diffDay = diffHr / 24;

  let relative: string;
  if (Math.abs(diffSec) < 60) relative = rtf.format(-Math.round(diffSec), "second");
  else if (Math.abs(diffMin) < 60) relative = rtf.format(-Math.round(diffMin), "minute");
  else if (Math.abs(diffHr) < 24) relative = rtf.format(-Math.round(diffHr), "hour");
  else relative = rtf.format(-Math.round(diffDay), "day");

  return {
    timestamp: Math.floor(ms / 1000),
    timestampMs: ms,
    utc: date.toUTCString(),
    local: date.toLocaleString(),
    iso: date.toISOString(),
    relative,
  };
}

export function dateToTimestamp(dateStr: string): { seconds: number; ms: number } | null {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;
  return { seconds: Math.floor(date.getTime() / 1000), ms: date.getTime() };
}

export function getCurrentTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

export function formatDate(date: Date, timezone?: string): string {
  return date.toLocaleString("en-US", {
    timeZone: timezone,
    dateStyle: "full",
    timeStyle: "long",
  });
}
