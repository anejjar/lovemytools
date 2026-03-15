import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: true });

export function renderMarkdown(input: string): { html: string; error: string | null } {
  if (!input.trim()) return { html: "", error: null };
  try {
    const html = marked.parse(input) as string;
    return { html, error: null };
  } catch (e) {
    return { html: "", error: (e as Error).message };
  }
}

export function countElements(markdown: string): { headings: number; links: number; images: number; codeBlocks: number } {
  const headings = (markdown.match(/^#{1,6}\s/gm) ?? []).length;
  const links = (markdown.match(/\[.+?\]\(.+?\)/g) ?? []).length;
  const images = (markdown.match(/!\[.+?\]\(.+?\)/g) ?? []).length;
  const codeBlocks = (markdown.match(/```/g) ?? []).length / 2;
  return { headings, links, images, codeBlocks: Math.floor(codeBlocks) };
}
