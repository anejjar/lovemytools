export interface IpInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  countryName?: string;
  loc?: string; // "lat,lng"
  org?: string;
  timezone?: string;
  postal?: string;
  hostname?: string;
}

export interface IpLookupResult {
  data: IpInfo | null;
  error: string | null;
}

export async function lookupIp(ip: string = ""): Promise<IpLookupResult> {
  try {
    const endpoint = ip.trim() ? `https://ipinfo.io/${ip.trim()}/json` : "https://ipinfo.io/json";
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: IpInfo = await res.json();
    if ("bogon" in data) return { data: null, error: "This is a private/reserved IP address (bogon)." };
    return { data, error: null };
  } catch (e) {
    return { data: null, error: `Lookup failed: ${e instanceof Error ? e.message : String(e)}` };
  }
}

export function isValidIp(ip: string): boolean {
  if (!ip) return false;
  // IPv4: each octet must be 0-255
  const ipv4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const m = ip.match(ipv4);
  if (m) return [m[1], m[2], m[3], m[4]].every((o) => parseInt(o) <= 255);
  // IPv6 basic check
  const ipv6 = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
  return ipv6.test(ip);
}

export function parseLatLng(loc: string): { lat: number; lng: number } | null {
  const parts = loc.split(",");
  if (parts.length !== 2) return null;
  const lat = parseFloat(parts[0]);
  const lng = parseFloat(parts[1]);
  if (isNaN(lat) || isNaN(lng)) return null;
  return { lat, lng };
}
