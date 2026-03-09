import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const toolComponents: Record<string, ComponentType> = {
  "color-picker": dynamic(() => import("./color/color-picker")),
  "password-generator": dynamic(() => import("./security/password-generator")),
  "lorem-ipsum-generator": dynamic(() => import("./text/lorem-ipsum-generator")),
  "json-formatter": dynamic(() => import("./json/json-formatter")),
  "http-status-codes": dynamic(() => import("./network/http-status-codes")),
  "color-converter": dynamic(() => import("./color/color-converter")),
  "uuid-generator": dynamic(() => import("./numbers/uuid-generator")),
  "unix-timestamp": dynamic(() => import("./numbers/unix-timestamp")),
  base64: dynamic(() => import("./encoding/base64")),
  "jwt-decoder": dynamic(() => import("./security/jwt-decoder")),
};

export function getToolComponent(slug: string): ComponentType | null {
  return toolComponents[slug] ?? null;
}
