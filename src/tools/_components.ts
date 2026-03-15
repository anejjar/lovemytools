import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const toolComponents: Record<string, ComponentType> = {
  // Original 10
  "color-picker": dynamic(() => import("./color/color-picker")),
  "password-generator": dynamic(() => import("./security/password-generator")),
  "lorem-ipsum-generator": dynamic(() => import("./text/lorem-ipsum-generator")),
  "json-formatter": dynamic(() => import("./json/json-formatter")),
  "http-status-codes": dynamic(() => import("./network/http-status-codes")),
  "color-converter": dynamic(() => import("./color/color-converter")),
  "uuid-generator": dynamic(() => import("./numbers/uuid-generator")),
  "unix-timestamp": dynamic(() => import("./numbers/unix-timestamp")),
  "base64": dynamic(() => import("./encoding/base64")),
  "jwt-decoder": dynamic(() => import("./security/jwt-decoder")),

  // JSON
  "json-minifier": dynamic(() => import("./json/json-minifier")),
  "json-to-csv": dynamic(() => import("./json/json-to-csv")),
  "json-diff": dynamic(() => import("./json/json-diff")),
  "json-to-yaml": dynamic(() => import("./json/json-to-yaml")),

  // Encoding
  "url-encoder": dynamic(() => import("./encoding/url-encoder")),
  "html-entity": dynamic(() => import("./encoding/html-entity")),
  "unicode-converter": dynamic(() => import("./encoding/unicode-converter")),

  // Text
  "word-counter": dynamic(() => import("./text/word-counter")),
  "case-converter": dynamic(() => import("./text/case-converter")),
  "slug-generator": dynamic(() => import("./text/slug-generator")),
  "regex-tester": dynamic(() => import("./text/regex-tester")),
  "text-diff-checker": dynamic(() => import("./text/text-diff-checker")),
  "markdown-previewer": dynamic(() => import("./text/markdown-previewer")),

  // Security
  "hash-generator": dynamic(() => import("./security/hash-generator")),
  "hmac-generator": dynamic(() => import("./security/hmac-generator")),
  "bcrypt-generator": dynamic(() => import("./security/bcrypt-generator")),

  // Numbers
  "number-base-converter": dynamic(() => import("./numbers/number-base-converter")),
  "byte-converter": dynamic(() => import("./numbers/byte-converter")),
  "roman-numeral": dynamic(() => import("./numbers/roman-numeral")),

  // CSS
  "css-minifier": dynamic(() => import("./css/css-minifier")),
  "css-formatter": dynamic(() => import("./css/css-formatter")),
  "css-unit-converter": dynamic(() => import("./css/css-unit-converter")),
  "css-gradient-generator": dynamic(() => import("./css/css-gradient-generator")),
  "box-shadow-generator": dynamic(() => import("./css/box-shadow-generator")),
  "border-radius-generator": dynamic(() => import("./css/border-radius-generator")),
  "flexbox-generator": dynamic(() => import("./css/flexbox-generator")),

  // Color
  "color-palette-generator": dynamic(() => import("./color/color-palette-generator")),
  "contrast-checker": dynamic(() => import("./color/contrast-checker")),
  "color-gradient-generator": dynamic(() => import("./color/color-gradient-generator")),

  // JavaScript
  "js-minifier": dynamic(() => import("./javascript/js-minifier")),
  "js-formatter": dynamic(() => import("./javascript/js-formatter")),
  "js-to-json": dynamic(() => import("./javascript/js-to-json")),

  // HTML
  "html-formatter": dynamic(() => import("./html/html-formatter")),
  "html-minifier": dynamic(() => import("./html/html-minifier")),
  "html-to-markdown": dynamic(() => import("./html/html-to-markdown")),
  "meta-tag-generator": dynamic(() => import("./html/meta-tag-generator")),

  // Network
  "mime-types": dynamic(() => import("./network/mime-types")),
  "ip-lookup": dynamic(() => import("./network/ip-lookup")),
  "url-parser": dynamic(() => import("./network/url-parser")),
  "cron-generator": dynamic(() => import("./network/cron-generator")),
};

export function getToolComponent(slug: string): ComponentType | null {
  return toolComponents[slug] ?? null;
}
