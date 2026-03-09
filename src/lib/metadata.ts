import type { Metadata } from "next";
import type { ToolMeta } from "@/types";
import { siteConfig } from "@/config/site";

export function generateToolMetadata(meta: ToolMeta): Metadata {
  const title = `${meta.name} — Free Online Tool`;
  const canonical = `${siteConfig.url}/tools/${meta.slug}`;
  const ogImage = `${siteConfig.url}/api/og?slug=${meta.slug}`;

  return {
    title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description: meta.description,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: meta.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: meta.description,
      images: [ogImage],
    },
  };
}

export function generateStructuredData(meta: ToolMeta): object[] {
  const toolUrl = `${siteConfig.url}/tools/${meta.slug}`;

  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: meta.name,
    description: meta.description,
    url: toolUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: meta.howToSteps,
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: meta.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${siteConfig.url}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: meta.name,
        item: toolUrl,
      },
    ],
  };

  return [webApp, faqPage, breadcrumb];
}
