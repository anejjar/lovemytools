import type { ToolMeta } from "@/types";

// Original 10 tools
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

// JSON tools
import { meta as jsonMinifier } from "./json/json-minifier/meta";
import { meta as jsonToCsv } from "./json/json-to-csv/meta";
import { meta as jsonDiff } from "./json/json-diff/meta";
import { meta as jsonToYaml } from "./json/json-to-yaml/meta";

// Encoding tools
import { meta as urlEncoder } from "./encoding/url-encoder/meta";
import { meta as htmlEntity } from "./encoding/html-entity/meta";
import { meta as unicodeConverter } from "./encoding/unicode-converter/meta";

// Text tools
import { meta as wordCounter } from "./text/word-counter/meta";
import { meta as caseConverter } from "./text/case-converter/meta";
import { meta as slugGenerator } from "./text/slug-generator/meta";
import { meta as regexTester } from "./text/regex-tester/meta";
import { meta as textDiffChecker } from "./text/text-diff-checker/meta";
import { meta as markdownPreviewer } from "./text/markdown-previewer/meta";

// Security tools
import { meta as hashGenerator } from "./security/hash-generator/meta";
import { meta as hmacGenerator } from "./security/hmac-generator/meta";
import { meta as bcryptGenerator } from "./security/bcrypt-generator/meta";

// Numbers tools
import { meta as numberBaseConverter } from "./numbers/number-base-converter/meta";
import { meta as byteConverter } from "./numbers/byte-converter/meta";
import { meta as romanNumeral } from "./numbers/roman-numeral/meta";

// CSS tools
import { meta as cssMinifier } from "./css/css-minifier/meta";
import { meta as cssFormatter } from "./css/css-formatter/meta";
import { meta as cssUnitConverter } from "./css/css-unit-converter/meta";
import { meta as cssGradientGenerator } from "./css/css-gradient-generator/meta";
import { meta as boxShadowGenerator } from "./css/box-shadow-generator/meta";
import { meta as borderRadiusGenerator } from "./css/border-radius-generator/meta";
import { meta as flexboxGenerator } from "./css/flexbox-generator/meta";

// Color tools
import { meta as colorPaletteGenerator } from "./color/color-palette-generator/meta";
import { meta as contrastChecker } from "./color/contrast-checker/meta";
import { meta as colorGradientGenerator } from "./color/color-gradient-generator/meta";

// JavaScript tools
import { meta as jsMinifier } from "./javascript/js-minifier/meta";
import { meta as jsFormatter } from "./javascript/js-formatter/meta";
import { meta as jsToJson } from "./javascript/js-to-json/meta";

// HTML tools
import { meta as htmlFormatter } from "./html/html-formatter/meta";
import { meta as htmlMinifier } from "./html/html-minifier/meta";
import { meta as htmlToMarkdown } from "./html/html-to-markdown/meta";
import { meta as metaTagGenerator } from "./html/meta-tag-generator/meta";

// Network tools
import { meta as mimeTypes } from "./network/mime-types/meta";
import { meta as ipLookup } from "./network/ip-lookup/meta";
import { meta as urlParser } from "./network/url-parser/meta";
import { meta as cronGenerator } from "./network/cron-generator/meta";

// Ordered by estimated monthly traffic
export const toolRegistry: ToolMeta[] = [
  // High-traffic originals
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
  // JSON
  jsonMinifier,
  jsonToCsv,
  jsonDiff,
  jsonToYaml,
  // Encoding
  urlEncoder,
  htmlEntity,
  unicodeConverter,
  // Text
  wordCounter,
  caseConverter,
  slugGenerator,
  regexTester,
  textDiffChecker,
  markdownPreviewer,
  // Security
  hashGenerator,
  hmacGenerator,
  bcryptGenerator,
  // Numbers
  numberBaseConverter,
  byteConverter,
  romanNumeral,
  // CSS
  cssMinifier,
  cssFormatter,
  cssUnitConverter,
  cssGradientGenerator,
  boxShadowGenerator,
  borderRadiusGenerator,
  flexboxGenerator,
  // Color
  colorPaletteGenerator,
  contrastChecker,
  colorGradientGenerator,
  // JavaScript
  jsMinifier,
  jsFormatter,
  jsToJson,
  // HTML
  htmlFormatter,
  htmlMinifier,
  htmlToMarkdown,
  metaTagGenerator,
  // Network
  mimeTypes,
  ipLookup,
  urlParser,
  cronGenerator,
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
