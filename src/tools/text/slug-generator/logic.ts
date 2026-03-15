export interface SlugOptions {
  separator?: "-" | "_";
  lowercase?: boolean;
  maxLength?: number;
}

export function generateSlug(input: string, options: SlugOptions = {}): string {
  const { separator = "-", lowercase = true, maxLength } = options;
  if (!input) return "";

  let slug = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/[^a-zA-Z0-9\s\-_]/g, "") // remove special chars
    .trim()
    .replace(/\s+/g, separator)
    .replace(/[-_]+/g, separator); // collapse multiple separators

  if (lowercase) slug = slug.toLowerCase();
  if (maxLength) slug = slug.slice(0, maxLength).replace(new RegExp(`[${separator}]$`), "");

  return slug;
}

export function slugToTitle(slug: string): string {
  return slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
