export interface MetaTagOptions {
  title: string;
  description: string;
  keywords: string;
  author: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: "website" | "article" | "product";
  twitterCard: "summary" | "summary_large_image" | "app" | "player";
  twitterSite: string;
  twitterCreator: string;
  canonical: string;
  robots: string;
  themeColor: string;
  viewport: string;
}

export function defaultOptions(): MetaTagOptions {
  return {
    title: "",
    description: "",
    keywords: "",
    author: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    ogUrl: "",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterSite: "",
    twitterCreator: "",
    canonical: "",
    robots: "index, follow",
    themeColor: "",
    viewport: "width=device-width, initial-scale=1",
  };
}

export function generateMetaTags(opts: MetaTagOptions): string {
  const lines: string[] = [];

  const add = (tag: string) => lines.push(tag);

  if (opts.viewport) add(`<meta name="viewport" content="${opts.viewport}">`);
  if (opts.title) add(`<title>${opts.title}</title>`);
  if (opts.description) add(`<meta name="description" content="${opts.description}">`);
  if (opts.keywords) add(`<meta name="keywords" content="${opts.keywords}">`);
  if (opts.author) add(`<meta name="author" content="${opts.author}">`);
  if (opts.robots) add(`<meta name="robots" content="${opts.robots}">`);
  if (opts.canonical) add(`<link rel="canonical" href="${opts.canonical}">`);
  if (opts.themeColor) add(`<meta name="theme-color" content="${opts.themeColor}">`);

  if (opts.ogTitle || opts.ogDescription || opts.ogImage || opts.ogUrl) {
    add("");
    add(`<!-- Open Graph -->`);
    if (opts.ogTitle) add(`<meta property="og:title" content="${opts.ogTitle}">`);
    if (opts.ogDescription) add(`<meta property="og:description" content="${opts.ogDescription}">`);
    if (opts.ogImage) add(`<meta property="og:image" content="${opts.ogImage}">`);
    if (opts.ogUrl) add(`<meta property="og:url" content="${opts.ogUrl}">`);
    if (opts.ogType) add(`<meta property="og:type" content="${opts.ogType}">`);
  }

  if (opts.twitterCard || opts.twitterSite || opts.twitterCreator) {
    add("");
    add(`<!-- Twitter Card -->`);
    if (opts.twitterCard) add(`<meta name="twitter:card" content="${opts.twitterCard}">`);
    if (opts.twitterSite) add(`<meta name="twitter:site" content="${opts.twitterSite}">`);
    if (opts.twitterCreator) add(`<meta name="twitter:creator" content="${opts.twitterCreator}">`);
    if (opts.ogTitle) add(`<meta name="twitter:title" content="${opts.ogTitle}">`);
    if (opts.ogDescription) add(`<meta name="twitter:description" content="${opts.ogDescription}">`);
    if (opts.ogImage) add(`<meta name="twitter:image" content="${opts.ogImage}">`);
  }

  return lines.join("\n");
}

export function descriptionLength(desc: string): { length: number; status: "good" | "short" | "long" } {
  const len = desc.length;
  if (len === 0) return { length: 0, status: "short" };
  if (len < 120) return { length: len, status: "short" };
  if (len > 160) return { length: len, status: "long" };
  return { length: len, status: "good" };
}
