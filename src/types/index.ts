export type ToolCategory =
  | "json"
  | "encoding"
  | "css"
  | "color"
  | "text"
  | "security"
  | "numbers"
  | "javascript"
  | "html"
  | "network";

export interface FAQ {
  question: string;
  answer: string;
}

export interface ToolMeta {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  keywords: string[];
  faqs: FAQ[];
  relatedTools: string[];
  howToSteps: string[];
  lastUpdated: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
