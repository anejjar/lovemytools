export const siteConfig = {
  name: "DevTools",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://devtools.example.com",
  description:
    "Free, fast developer tools that run entirely in your browser. No sign-up required.",
  ogImage: "/og-default.png",
  links: {
    github: "https://github.com",
    extension: process.env.NEXT_PUBLIC_CHROME_EXTENSION_URL || "#",
  },
};
