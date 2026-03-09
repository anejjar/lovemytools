export interface HttpStatus {
  code: number;
  name: string;
  description: string;
  category: "1xx" | "2xx" | "3xx" | "4xx" | "5xx";
  useCase: string;
}

export const HTTP_STATUS_CODES: HttpStatus[] = [
  // 1xx
  { code: 100, name: "Continue", category: "1xx", description: "The server has received the request headers and the client should proceed to send the request body.", useCase: "Used when a client wants to send a large request body and checks if the server will accept it first." },
  { code: 101, name: "Switching Protocols", category: "1xx", description: "The requester has asked the server to switch protocols and the server has agreed to do so.", useCase: "Used when upgrading from HTTP to WebSocket." },
  { code: 102, name: "Processing", category: "1xx", description: "The server has received and is processing the request, but no response is available yet.", useCase: "WebDAV: prevents the client from timing out." },
  // 2xx
  { code: 200, name: "OK", category: "2xx", description: "The request has succeeded. The meaning depends on the HTTP method: GET returns the resource, POST returns the result.", useCase: "Standard successful response for GET, PUT, PATCH, and DELETE requests." },
  { code: 201, name: "Created", category: "2xx", description: "The request has been fulfilled and a new resource has been created. The new resource URL is in the Location header.", useCase: "Returned after a successful POST request that creates a new resource." },
  { code: 202, name: "Accepted", category: "2xx", description: "The request has been accepted for processing, but processing has not been completed yet.", useCase: "Asynchronous operations where the server queues the request for background processing." },
  { code: 204, name: "No Content", category: "2xx", description: "The request has succeeded but returns no message body.", useCase: "Successful DELETE requests, or PUT requests that don't return the updated resource." },
  { code: 206, name: "Partial Content", category: "2xx", description: "The server is delivering only part of the resource due to a Range header in the request.", useCase: "Video streaming and resumable downloads." },
  // 3xx
  { code: 301, name: "Moved Permanently", category: "3xx", description: "The resource has been permanently moved to a new URL. Future requests should use the new URL.", useCase: "Permanent URL changes. Search engines update their index to the new URL." },
  { code: 302, name: "Found", category: "3xx", description: "The resource temporarily resides under a different URL. The client should continue using the original URL.", useCase: "Temporary redirects. Does not affect SEO rankings." },
  { code: 304, name: "Not Modified", category: "3xx", description: "The resource has not been modified since the version specified in the request headers.", useCase: "Caching: client has a cached copy that is still valid." },
  { code: 307, name: "Temporary Redirect", category: "3xx", description: "Temporary redirect that preserves the HTTP method. Unlike 302, the method must not change.", useCase: "Temporary redirect where the POST method must be preserved." },
  { code: 308, name: "Permanent Redirect", category: "3xx", description: "Permanent redirect that preserves the HTTP method. Unlike 301, the method must not change.", useCase: "Permanent redirect where the POST method must be preserved." },
  // 4xx
  { code: 400, name: "Bad Request", category: "4xx", description: "The server cannot process the request due to a client error, such as malformed request syntax.", useCase: "Invalid JSON body, missing required fields, or invalid query parameters." },
  { code: 401, name: "Unauthorized", category: "4xx", description: "Authentication is required and has failed or has not yet been provided.", useCase: "Missing or invalid authentication token. The client should authenticate and retry." },
  { code: 403, name: "Forbidden", category: "4xx", description: "The server understood the request but refuses to authorize it. Re-authenticating will make no difference.", useCase: "Authenticated user doesn't have permission to access the resource." },
  { code: 404, name: "Not Found", category: "4xx", description: "The server cannot find the requested resource. The URL may be wrong or the resource deleted.", useCase: "Non-existent pages, deleted resources, or invalid IDs." },
  { code: 405, name: "Method Not Allowed", category: "4xx", description: "The HTTP method is known but is not supported for the requested resource.", useCase: "Using POST on a read-only endpoint or DELETE on a non-deletable resource." },
  { code: 409, name: "Conflict", category: "4xx", description: "The request could not be completed due to a conflict with the current state of the target resource.", useCase: "Trying to create a resource that already exists (duplicate email, username)." },
  { code: 410, name: "Gone", category: "4xx", description: "The resource has been permanently deleted and will not be available again.", useCase: "Permanently deleted resources. Stronger signal to search engines than 404." },
  { code: 422, name: "Unprocessable Entity", category: "4xx", description: "The request is well-formed but contains semantic errors. The server understands the content type but cannot process it.", useCase: "Validation errors: valid JSON with invalid field values." },
  { code: 429, name: "Too Many Requests", category: "4xx", description: "The client has sent too many requests in a given time period (rate limiting).", useCase: "API rate limiting. Include Retry-After header to tell clients when to retry." },
  // 5xx
  { code: 500, name: "Internal Server Error", category: "5xx", description: "The server encountered an unexpected condition that prevented it from fulfilling the request.", useCase: "Unhandled exceptions, database errors, or server misconfigurations." },
  { code: 501, name: "Not Implemented", category: "5xx", description: "The server does not support the functionality required to fulfill the request.", useCase: "The server doesn't recognize the request method." },
  { code: 502, name: "Bad Gateway", category: "5xx", description: "The server received an invalid response from an upstream server.", useCase: "Reverse proxy received an invalid response from the backend service." },
  { code: 503, name: "Service Unavailable", category: "5xx", description: "The server is currently unable to handle the request due to temporary overload or maintenance.", useCase: "Planned maintenance, server overload. Include Retry-After header." },
  { code: 504, name: "Gateway Timeout", category: "5xx", description: "The server acting as a gateway did not receive a timely response from an upstream server.", useCase: "Backend timeout during long-running operations." },
];

export function searchStatusCodes(query: string): HttpStatus[] {
  const q = query.toLowerCase().trim();
  if (!q) return HTTP_STATUS_CODES;
  return HTTP_STATUS_CODES.filter(
    (s) =>
      s.code.toString().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
  );
}

export function filterByCategory(category: string): HttpStatus[] {
  if (category === "all") return HTTP_STATUS_CODES;
  return HTTP_STATUS_CODES.filter((s) => s.category === category);
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "1xx": "#6366f1",
    "2xx": "#22c55e",
    "3xx": "#06b6d4",
    "4xx": "#f59e0b",
    "5xx": "#ef4444",
  };
  return colors[category] || "#9090b0";
}
