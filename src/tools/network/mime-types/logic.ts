export interface MimeEntry {
  mimeType: string;
  extensions: string[];
  description: string;
  category: string;
}

export const MIME_DB: MimeEntry[] = [
  // Text
  { mimeType: "text/plain", extensions: ["txt", "text"], description: "Plain text", category: "Text" },
  { mimeType: "text/html", extensions: ["html", "htm"], description: "HTML document", category: "Text" },
  { mimeType: "text/css", extensions: ["css"], description: "Cascading Style Sheet", category: "Text" },
  { mimeType: "text/javascript", extensions: ["js", "mjs"], description: "JavaScript", category: "Text" },
  { mimeType: "text/csv", extensions: ["csv"], description: "Comma-separated values", category: "Text" },
  { mimeType: "text/markdown", extensions: ["md", "markdown"], description: "Markdown document", category: "Text" },
  { mimeType: "text/xml", extensions: ["xml"], description: "XML document", category: "Text" },
  // Application
  { mimeType: "application/json", extensions: ["json"], description: "JSON data", category: "Application" },
  { mimeType: "application/xml", extensions: ["xml"], description: "XML (application)", category: "Application" },
  { mimeType: "application/pdf", extensions: ["pdf"], description: "PDF document", category: "Application" },
  { mimeType: "application/zip", extensions: ["zip"], description: "ZIP archive", category: "Application" },
  { mimeType: "application/gzip", extensions: ["gz", "gzip"], description: "GZIP archive", category: "Application" },
  { mimeType: "application/x-tar", extensions: ["tar"], description: "TAR archive", category: "Application" },
  { mimeType: "application/octet-stream", extensions: ["bin", "exe", "dll"], description: "Binary data", category: "Application" },
  { mimeType: "application/wasm", extensions: ["wasm"], description: "WebAssembly binary", category: "Application" },
  { mimeType: "application/x-www-form-urlencoded", extensions: [], description: "Form URL-encoded data", category: "Application" },
  { mimeType: "multipart/form-data", extensions: [], description: "Multipart form data", category: "Application" },
  { mimeType: "application/graphql", extensions: ["graphql", "gql"], description: "GraphQL query", category: "Application" },
  { mimeType: "application/ld+json", extensions: ["jsonld"], description: "JSON-LD linked data", category: "Application" },
  { mimeType: "application/x-ndjson", extensions: ["ndjson"], description: "Newline-delimited JSON", category: "Application" },
  { mimeType: "application/vnd.ms-excel", extensions: ["xls"], description: "Microsoft Excel (legacy)", category: "Application" },
  { mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", extensions: ["xlsx"], description: "Microsoft Excel (OOXML)", category: "Application" },
  { mimeType: "application/vnd.ms-powerpoint", extensions: ["ppt"], description: "Microsoft PowerPoint (legacy)", category: "Application" },
  { mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation", extensions: ["pptx"], description: "Microsoft PowerPoint (OOXML)", category: "Application" },
  { mimeType: "application/msword", extensions: ["doc"], description: "Microsoft Word (legacy)", category: "Application" },
  { mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", extensions: ["docx"], description: "Microsoft Word (OOXML)", category: "Application" },
  // Image
  { mimeType: "image/jpeg", extensions: ["jpg", "jpeg"], description: "JPEG image", category: "Image" },
  { mimeType: "image/png", extensions: ["png"], description: "PNG image", category: "Image" },
  { mimeType: "image/gif", extensions: ["gif"], description: "GIF image", category: "Image" },
  { mimeType: "image/webp", extensions: ["webp"], description: "WebP image", category: "Image" },
  { mimeType: "image/svg+xml", extensions: ["svg"], description: "SVG vector image", category: "Image" },
  { mimeType: "image/avif", extensions: ["avif"], description: "AVIF image", category: "Image" },
  { mimeType: "image/ico", extensions: ["ico"], description: "Icon file", category: "Image" },
  { mimeType: "image/tiff", extensions: ["tif", "tiff"], description: "TIFF image", category: "Image" },
  { mimeType: "image/bmp", extensions: ["bmp"], description: "Bitmap image", category: "Image" },
  // Audio
  { mimeType: "audio/mpeg", extensions: ["mp3"], description: "MP3 audio", category: "Audio" },
  { mimeType: "audio/wav", extensions: ["wav"], description: "WAV audio", category: "Audio" },
  { mimeType: "audio/ogg", extensions: ["ogg", "oga"], description: "OGG audio", category: "Audio" },
  { mimeType: "audio/webm", extensions: ["weba"], description: "WebM audio", category: "Audio" },
  { mimeType: "audio/aac", extensions: ["aac"], description: "AAC audio", category: "Audio" },
  { mimeType: "audio/flac", extensions: ["flac"], description: "FLAC lossless audio", category: "Audio" },
  // Video
  { mimeType: "video/mp4", extensions: ["mp4", "m4v"], description: "MP4 video", category: "Video" },
  { mimeType: "video/webm", extensions: ["webm"], description: "WebM video", category: "Video" },
  { mimeType: "video/ogg", extensions: ["ogv"], description: "OGG video", category: "Video" },
  { mimeType: "video/quicktime", extensions: ["mov"], description: "QuickTime video", category: "Video" },
  { mimeType: "video/x-msvideo", extensions: ["avi"], description: "AVI video", category: "Video" },
  // Font
  { mimeType: "font/woff", extensions: ["woff"], description: "Web Open Font Format", category: "Font" },
  { mimeType: "font/woff2", extensions: ["woff2"], description: "Web Open Font Format 2", category: "Font" },
  { mimeType: "font/ttf", extensions: ["ttf"], description: "TrueType font", category: "Font" },
  { mimeType: "font/otf", extensions: ["otf"], description: "OpenType font", category: "Font" },
];

export function searchMime(query: string): MimeEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return MIME_DB;
  return MIME_DB.filter(
    (e) =>
      e.mimeType.toLowerCase().includes(q) ||
      e.extensions.some((ext) => ext.toLowerCase().includes(q)) ||
      e.description.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q)
  );
}

export function lookupByExtension(ext: string): MimeEntry | null {
  const clean = ext.toLowerCase().replace(/^\./, "");
  return MIME_DB.find((e) => e.extensions.includes(clean)) ?? null;
}

export function lookupByMimeType(mime: string): MimeEntry | null {
  return MIME_DB.find((e) => e.mimeType.toLowerCase() === mime.toLowerCase().trim()) ?? null;
}
