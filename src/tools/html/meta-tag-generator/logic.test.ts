import { describe, it, expect } from "vitest";
import { generateMetaTags, descriptionLength, defaultOptions } from "./logic";

describe("generateMetaTags", () => {
  it("includes title tag", () => {
    const out = generateMetaTags({ ...defaultOptions(), title: "My Site" });
    expect(out).toContain("<title>My Site</title>");
  });

  it("includes description meta", () => {
    const out = generateMetaTags({ ...defaultOptions(), description: "A great site" });
    expect(out).toContain('<meta name="description" content="A great site">');
  });

  it("includes og:title", () => {
    const out = generateMetaTags({ ...defaultOptions(), ogTitle: "OG Title" });
    expect(out).toContain('property="og:title"');
    expect(out).toContain("OG Title");
  });

  it("includes canonical link", () => {
    const out = generateMetaTags({ ...defaultOptions(), canonical: "https://example.com/page" });
    expect(out).toContain('<link rel="canonical" href="https://example.com/page">');
  });

  it("includes twitter card", () => {
    const out = generateMetaTags({ ...defaultOptions(), twitterCard: "summary_large_image" });
    expect(out).toContain('name="twitter:card"');
  });

  it("includes robots", () => {
    const out = generateMetaTags({ ...defaultOptions(), robots: "noindex, nofollow" });
    expect(out).toContain('content="noindex, nofollow"');
  });

  it("omits empty fields", () => {
    const out = generateMetaTags({ ...defaultOptions() });
    expect(out).not.toContain('name="description"');
    expect(out).not.toContain('name="author"');
  });

  it("includes theme-color", () => {
    const out = generateMetaTags({ ...defaultOptions(), themeColor: "#6366f1" });
    expect(out).toContain('name="theme-color"');
  });
});

describe("descriptionLength", () => {
  it("empty is short", () => expect(descriptionLength("").status).toBe("short"));
  it("< 120 chars is short", () => expect(descriptionLength("Hello").status).toBe("short"));
  it("120-160 chars is good", () => {
    const desc = "a".repeat(140);
    expect(descriptionLength(desc).status).toBe("good");
  });
  it("> 160 chars is long", () => {
    const desc = "a".repeat(161);
    expect(descriptionLength(desc).status).toBe("long");
  });
  it("returns correct length", () => {
    expect(descriptionLength("hello").length).toBe(5);
  });
});
