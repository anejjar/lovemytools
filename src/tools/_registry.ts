import type { ToolMeta } from "@/types";
import { meta as colorPicker } from "./color/color-picker/meta";
import { meta as passwordGenerator } from "./security/password-generator/meta";
import { meta as loremIpsum } from "./text/lorem-ipsum-generator/meta";
import { meta as jsonFormatter } from "./json/json-formatter/meta";
import { meta as httpStatusCodes } from "./network/http-status-codes/meta";
import { meta as colorConverter } from "./color/color-converter/meta";
import { meta as uuidGenerator } from "./numbers/uuid-generator/meta";
import { meta as unixTimestamp } from "./numbers/unix-timestamp/meta";
import { meta as base64 } from "./encoding/base64/meta";
import { meta as jwtDecoder } from "./security/jwt-decoder/meta";

// Ordered by estimated monthly traffic
export const toolRegistry: ToolMeta[] = [
  colorPicker,
  passwordGenerator,
  loremIpsum,
  jsonFormatter,
  httpStatusCodes,
  colorConverter,
  uuidGenerator,
  unixTimestamp,
  base64,
  jwtDecoder,
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return toolRegistry.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolMeta[] {
  return toolRegistry.filter((t) => t.category === category);
}

export function getAllSlugs(): string[] {
  return toolRegistry.map((t) => t.slug);
}

export function getRelatedTools(slug: string): ToolMeta[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tool.relatedTools
    .map((s) => getToolBySlug(s))
    .filter(Boolean) as ToolMeta[];
}

export function searchTools(query: string): ToolMeta[] {
  const q = query.toLowerCase().trim();
  if (!q) return toolRegistry;
  return toolRegistry.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.includes(q)) ||
      t.category.includes(q)
  );
}
