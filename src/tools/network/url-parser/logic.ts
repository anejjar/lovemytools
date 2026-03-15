export interface ParsedUrl {
  protocol: string;
  username: string;
  password: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
  host: string;
  queryParams: Record<string, string[]>;
}

export interface ParseResult {
  parsed: ParsedUrl | null;
  error: string | null;
}

export function parseUrl(input: string): ParseResult {
  if (!input.trim()) return { parsed: null, error: null };
  try {
    const url = new URL(input.trim());
    const queryParams: Record<string, string[]> = {};
    url.searchParams.forEach((value, key) => {
      if (!queryParams[key]) queryParams[key] = [];
      queryParams[key].push(value);
    });
    return {
      parsed: {
        protocol: url.protocol,
        username: url.username,
        password: url.password,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        origin: url.origin,
        host: url.host,
        queryParams,
      },
      error: null,
    };
  } catch {
    return { parsed: null, error: "Invalid URL. Make sure it includes the protocol (e.g. https://)" };
  }
}

export function buildUrl(base: string, params: Record<string, string>): string {
  try {
    const url = new URL(base);
    Object.entries(params).forEach(([k, v]) => {
      if (k && v) url.searchParams.set(k, v);
    });
    return url.toString();
  } catch {
    return "";
  }
}
